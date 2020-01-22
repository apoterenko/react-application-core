import * as React from 'react';
import * as R from 'ramda';
import {
  LoggerFactory,
  ILogger,
} from 'ts-smart-logger';

import {
  DelayedTask,
  ifNotEmptyThanValue,
  isDef,
  isExpandActionRendered,
  isFn,
  isMenuOpened,
  isWaitingForData,
  joinClassName,
  nvl,
  orNull,
} from '../../../util';
import { BaseTextField } from '../../field/textfield';
import { Menu } from '../../menu';
import {
  AnyT,
} from '../../../definitions.interface';
import {
  IBaseSelect,
  IBaseSelectProps,
  IBaseSelectState,
} from './base-select.interface';
import {
  FIELD_VALUE_TO_RESET,
  FieldActionTypesEnum,
  IBaseEvent,
  IMenu,
  IMenuProps,
  ISelectOptionEntity,
} from '../../../definition';

export class BaseSelect<TProps extends IBaseSelectProps,
                        TState extends IBaseSelectState>
  extends BaseTextField<TProps, TState>
  implements IBaseSelect {

  protected static readonly logger = LoggerFactory.makeLogger('BaseSelect');

  private readonly menuRef = React.createRef<Menu>();
  private readonly quickFilterQueryTask: DelayedTask;

  /**
   * @stable [30.11.2019]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.onClose = this.onClose.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.onDropDownClick = this.onDropDownClick.bind(this);

    if (this.isExpandActionRendered) {
      this.defaultActions = [
        {type: props.icon || FieldActionTypesEnum.DROP_DOWN, onClick: this.onDropDownClick},
        ...this.defaultActions
      ];
    }
    if (this.isQuickSelectionModeEnabled) {
      this.quickFilterQueryTask = new DelayedTask(this.notifyFilterChange.bind(this), this.delayTimeout);
    }
  }

  /**
   * @stable [11.01.2020]
   * @param {IBaseEvent} event
   */
  public onChange(event: IBaseEvent): void {
    super.onChange(event);
    this.startQuickSearchIfApplicable();
  }

  /**
   * @stable [11.01.2020]
   * @param {Readonly<TProps extends IBaseSelectProps>} prevProps
   * @param {Readonly<TState extends IBaseSelectState>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    super.componentDidUpdate(prevProps, prevState);
    const props = this.props;

    if (this.isWaitingForData
      && R.isNil(prevProps.options)
      && !R.equals(props.options, prevProps.options)) {

      this.setState({waitingForData: false}, () => {
        this.renderAndShowMenu();

        if (isFn(props.onLoadDictionary)) {
          props.onLoadDictionary(this.filteredOptions);
        }
      });
    }

    // TODO Remove later
    const newValue = props.value;
    if (R.isNil(newValue) && !R.equals(newValue, prevProps.value)) {
      const $$cachedValue = this.state.$$cachedValue;

      if (!R.isNil($$cachedValue) && !R.equals($$cachedValue.value, newValue)) {
        // Need to reset the previous cached display value if the value has been cleared or replaced
        this.setState({$$cachedValue: null});
      }
    }
  }

  /**
   * @stable [11.01.2020]
   * @param {IBaseEvent} event
   */
  public onKeyEscape(event: IBaseEvent): void {
    super.onKeyEscape(event);
    this.hideMenu();
  }

  /**
   * @stable [30.11.2019]
   */
  public clearValue(): void {
    super.clearValue();
    this.setState({$$cachedValue: null});
  }

  /**
   * @stable [11.01.2020]
   */
  public openMenu(): void {
    if (this.inProgress || this.isMenuAlreadyRenderedAndOpened) {
      return;
    }
    const {
      bindDictionary,
      forceReload,
      onEmptyDictionary,
      options,
    } = this.props;

    const areOptionsUnavailable = R.isNil(options);
    if (forceReload || areOptionsUnavailable) {
      if (isFn(onEmptyDictionary)) {
        this.setState({waitingForData: true}, () => onEmptyDictionary(bindDictionary));
      } else {
        // Try open empty dialog menu to remote search
        this.renderAndShowMenu(!this.isQuickSelectionModeEnabled);
      }
    } else {
      this.renderAndShowMenu();
    }
  }

  /**
   * @stable [16.01.2020]
   * @param {IBaseEvent} event
   */
  public onKeyEnter(event: IBaseEvent): void {
    if (this.startQuickSearchIfApplicable(true)) {
      this.domAccessor.cancelEvent(event);
    }
    super.onKeyEnter(event);
  }

  /**
   * @stable [15.01.2020]
   * @returns {boolean}
   */
  protected isFieldBusy(): boolean {
    return super.isFieldBusy() || this.isWaitingForData;
  }

  /**
   * @stable [11.01.2020]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    super.onClick(event);
    this.openMenu();
  }

  /**
   * @stable [22.01.2020]
   * @returns {JSX.Element}
   */
  protected get inputAttachmentElement(): JSX.Element {
    return orNull(
      this.isMenuOpened,
      () => ( // To improve a performance
        <Menu
          ref={this.menuRef}
          width={this.menuWidth}
          progress={!this.areOptionsDefined}
          options={this.filteredOptions}
          onSelect={this.onSelect}
          onFilterChange={this.onFilterChange}
          onClose={this.onClose}
          {...this.getMenuProps()}/>
      )
    );
  }

  /**
   * @stable [09.01.2020]
   * @returns {IMenuProps}
   */
  protected getMenuProps(): IMenuProps {
    return this.props.menuConfiguration;
  }

  /**
   * @stable [30.11.2019]
   * @returns {ISelectOptionEntity[]}
   */
  protected get filteredOptions(): ISelectOptionEntity[] {
    return this.options;
  }

  /**
   * @stable [11.01.2020]
   * @returns {boolean}
   */
  protected get isMenuAlreadyRenderedAndOpened(): boolean {
    const menu = this.menu;
    return !R.isNil(menu) && menu.isOpen();
  }

  /**
   * @stable [11.01.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-base-select');
  }

  /**
   * @stable [21.12.2019]
   * @returns {AnyT}
   */
  protected get originalEmptyValue(): AnyT {
    return FIELD_VALUE_TO_RESET;
  }

  /**
   * @stable [30.11.2019]
   * @param {ISelectOptionEntity} option
   */
  protected onSelect(option: ISelectOptionEntity): void {
    this.setState({
      $$cachedValue: {
        value: option.value,
        label: String(option.label || option.value),
      },
    }, () => {
      this.onChangeManually(option.value);
      this.notifySelectOption(option);
    });
  }

  /**
   * @stable [11.01.2020]
   * @param {ISelectOptionEntity} option
   */
  protected notifySelectOption(option: ISelectOptionEntity): void {
    if (!isDef(option)) {
      return;
    }
    const onSelect = this.props.onSelect;
    if (!isFn(onSelect)) {
      return;
    }
    onSelect(option);
  }

  /**
   * @stable [10.09.2019]
   */
  protected onClose(): void {
    const props = this.props;

    if (isFn(props.onClose)) {
      props.onClose();
    }
  }

  /**
   * @stable [12.02.2019]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected getDecoratedValue(value: AnyT): AnyT {
    const $$cachedValue = this.state.$$cachedValue;
    if (!R.isNil($$cachedValue)) {
      return super.getDecoratedValue($$cachedValue.label, false);
    }

    const selectedItem = R.find<ISelectOptionEntity>((option) => option.value === value, this.options);
    return R.isNil(selectedItem)
      ? super.getDecoratedValue(value)
      : (
        super.getDecoratedValue(
          R.isNil(selectedItem.label)
            ? selectedItem.value
            : this.t(selectedItem.label),
          false
        )
      );
  }

  /**
   * @stable [11.01.2020]
   * @returns {ISelectOptionEntity[]}
   */
  protected get options(): ISelectOptionEntity[] {
    return nvl(this.props.options, []);
  }

  /**
   * @stable [11.01.2020]
   * @returns {boolean}
   */
  protected get isExpandActionRendered(): boolean {
    return isExpandActionRendered(this.props);
  }

  /**
   * @stable [11.01.2020]
   */
  private notifyFilterChange(): void {
    ifNotEmptyThanValue(
      this.value,
      (value) => this.setState({waitingForData: true}, () => this.onFilterChange(value))
    );
  }

  /**
   * @stable [11.01.2020]
   * @param {IBaseEvent} event
   */
  private onDropDownClick(event: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);
    this.openMenu();
  }

  private onFilterChange(query: string): void {
    const props = this.props;
    const onFilterChange = props.onFilterChange;
    const onDictionaryFilterChange = props.onDictionaryFilterChange;

    if (isFn(onFilterChange)) {
      onFilterChange(query);
    }
    if (isFn(onDictionaryFilterChange)) {
      onDictionaryFilterChange(props.bindDictionary, {payload: {query}});
    }
  }

  /**
   * @stable [11.01.2020]
   */
  private hideMenu(): void {
    if (this.isMenuAlreadyRenderedAndOpened) {
      this.setState({menuRendered: false});
    }
  }

  /**
   * @stable [12.01.2020]
   * @param {boolean} force
   */
  private renderAndShowMenu(force = false): void {
    if (!R.isEmpty(this.filteredOptions) || force) {
      this.setState({menuRendered: true}, () => this.menu.show());
    } else {
      BaseSelect.logger.debug('[$BaseSelect][renderAndShowMenu] The options are empty. The menu does not show.');
    }
  }

  /**
   * @stable [16.01.2020]
   */
  private startQuickSearchIfApplicable(noDelay = false): boolean {
    if (!this.isQuickSelectionModeEnabled) {
      return false;
    }

    this.hideMenu();

    if (noDelay) {
      this.quickFilterQueryTask.stop();
      this.notifyFilterChange();
    } else {
      this.quickFilterQueryTask.start();
    }
    return true;
  }

  /**
   * @stable [11.01.2020]
   * @returns {boolean}
   */
  private get isQuickSelectionModeEnabled(): boolean {
    return !this.isFocusPrevented;
  }

  /**
   * @stable [12.01.2020]
   * @returns {boolean}
   */
  private get isWaitingForData(): boolean {
    return isWaitingForData(this.state);
  }

  /**
   * @stable [17.01.2020]
   * @returns {() => number}
   */
  private get menuWidth(): () => number {
    return () => this.domAccessor.getWidth(this.getSelf());
  }

  /**
   * @stable [11.01.2020]
   * @returns {number}
   */
  private get delayTimeout(): number {
    return nvl(this.props.delayTimeout, 1000);
  }

  /**
   * @stable [15.01.2020]
   * @returns {boolean}
   */
  private get areOptionsDefined(): boolean {
    return !R.isNil(this.props.options);
  }

  /**
   * @stable [22.01.2020]
   * @returns {boolean}
   */
  private get isMenuOpened(): boolean {
    return isMenuOpened(this.state);
  }

  /**
   * @stable [30.11.2019]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.menuRef.current;
  }
}
