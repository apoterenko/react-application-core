import * as React from 'react';
import * as R from 'ramda';
import {
  LoggerFactory,
  ILogger,
} from 'ts-smart-logger';

import {
  calc,
  DelayedTask,
  inProgress,
  isAllowEmptyFilterValue,
  isAnchored,
  isDef,
  isExpandActionRendered,
  isFn,
  isLocalOptionsUsed,
  isMenuRendered,
  isObjectNotEmpty,
  isPrimitive,
  joinClassName,
  nvl,
  orNull,
  shallowClone,
} from '../../../util';
import { BaseTextField } from '../text-field';
import { Menu } from '../../menu';
import {
  AnyT,
  EntityIdT,
} from '../../../definitions.interface';
import {
  IBaseSelect,
  IBaseSelectProps,
  IBaseSelectState,
} from './base-select.interface';
import {
  FIELD_VALUE_TO_RESET,
  FieldActionTypesEnum,
  FieldConverterTypesEnum,
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

    this.getMenuAnchorElement = this.getMenuAnchorElement.bind(this);
    this.getMenuWidth = this.getMenuWidth.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onDropDownClick = this.onDropDownClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onOptionsLoadDone = this.onOptionsLoadDone.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.openMenu = this.openMenu.bind(this);

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
   * @stable [29.01.2020]
   * @param {Readonly<TProps extends IBaseSelectProps>} prevProps
   * @param {Readonly<TState extends IBaseSelectState>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    super.componentDidUpdate(prevProps, prevState);
    const props = this.props;

    if (this.state.progress
      && !props.waitingForOptions && prevProps.waitingForOptions) {
      // We can't use progress props because it is reserved
      // The new data have come
      this.setState({progress: false}, this.onOptionsLoadDone);
    }

    this.tryResetCachedValue(props, prevProps);
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
    if (this.isFieldBusy() || this.isMenuAlreadyRenderedAndOpened) {
      return;
    }
    const {
      bindDictionary,
      forceReload,
      onEmptyDictionary,
      options,
    } = this.props;

    if (forceReload || !this.doOptionsExist) {
      if (isFn(onEmptyDictionary)) {
        this.setState({progress: true}, () => onEmptyDictionary(bindDictionary));
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
   * @stable [28.01.2020]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    super.onClick(event);

    if (this.isQuickSelectionModeEnabled) {
      this.notifyFilterChange();
    } else {
      this.openMenu();
    }
  }

  /**
   * @stable [22.01.2020]
   * @returns {JSX.Element}
   */
  protected get inputAttachmentElement(): JSX.Element {
    return orNull(
      this.isMenuRendered,   // To improve a performance
      () => (
        <Menu
          ref={this.menuRef}
          anchorElement={orNull(this.isMenuAnchored, () => this.getMenuAnchorElement)}
          width={orNull(this.isMenuAnchored, () => this.getMenuWidth)}
          progress={this.isFieldBusy()}
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
   * @stable [28.01.2020]
   * @returns {boolean}
   */
  protected isFieldBusy(): boolean {
    return inProgress(this.state);
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
   * @stable [28.01.2020]
   * @param {ISelectOptionEntity} option
   */
  protected onSelect(option: ISelectOptionEntity): void {
    this.setState({$$cachedValue: shallowClone(option)}, this.onSelectDone.bind(this, option));
  }

  /**
   * @stable [11.01.2020]
   * @param {ISelectOptionEntity} option
   */
  protected notifySelectOption(option: ISelectOptionEntity): void {
    const onSelect = this.props.onSelect;
    if (!isDef(option) || !isFn(onSelect)) {
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
   * @stable [28.01.2020]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected getDecoratedDisplayValue(value: AnyT): AnyT {
    const $$cachedValue = this.state.$$cachedValue;
    const hasCachedValue = !R.isNil($$cachedValue);

    if (!hasCachedValue && this.isLocalOptionsUsed) {
      const optionValue = this.selectOptionEntityAsId(value);
      value = nvl(
        R.find<ISelectOptionEntity>((option) => this.selectOptionEntityAsId(option) === optionValue, this.options),
        value
      );
    }
    return super.getDecoratedDisplayValue(hasCachedValue ? $$cachedValue : value, hasCachedValue);
  }

  /**
   * @stable [28.01.2020]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected decorateDisplayValue(value: AnyT): AnyT {
    return this.fieldConverter.convert({
      value,
      from: FieldConverterTypesEnum.SELECT_OPTION_ENTITY,
      to: FieldConverterTypesEnum.DISPLAY_VALUE,
    });
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
   * @stable [28.01.2020]
   * @returns {boolean}
   */
  protected get isAllowEmptyFilterValue(): boolean {
    return isAllowEmptyFilterValue(this.props);
  }

  /**
   * @stable [28.01.2020]
   */
  private notifyFilterChange(): void {
    const value = this.value;

    if (this.isAllowEmptyFilterValue || (isObjectNotEmpty(value) && isPrimitive(value))) {
      this.setState({progress: true}, () => this.onFilterChange(value));
    }
  }

  /**
   * @stable [11.01.2020]
   * @param {IBaseEvent} event
   */
  private onDropDownClick(event: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);
    this.openMenu();
  }

  /**
   * @stable [28.01.2020]
   * @param {ISelectOptionEntity} option
   */
  private onSelectDone(option: ISelectOptionEntity): void {
    this.onChangeManually(this.isPlainValueApplied ? this.selectOptionEntityAsId(option) : option);
    this.notifySelectOption(option);
  }

  /**
   * @stable [28.01.2020]
   * @returns {EntityIdT}
   */
  private selectOptionEntityAsId(value: AnyT): EntityIdT {
    return this.fieldConverter.convert({
      value,
      from: FieldConverterTypesEnum.SELECT_OPTION_ENTITY,
      to: FieldConverterTypesEnum.ID,
    });
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
   * @stable [28.01.2020]
   */
  private onOptionsLoadDone(): void {
    this.renderAndShowMenu();

    const props = this.props;
    if (isFn(props.onLoadDictionary)) {
      props.onLoadDictionary(this.filteredOptions);
    }
  }

  /**
   * @stable [29.01.2020]
   * @param {TProps} props
   * @param {TProps} previousProps
   */
  private tryResetCachedValue(props: TProps, previousProps: TProps): void {
    const newValue = props.value;
    if (!R.equals(newValue, previousProps.value)) {
      // The value has changed

      // TODO Use keyValueCache
      const $$cachedValue = this.state.$$cachedValue;
      if (!R.isNil($$cachedValue) && !R.equals($$cachedValue.value, newValue)) {
        // Need to reset the previous cached display value if the value has been cleared or replaced
        this.setState({$$cachedValue: null});
      }
    }
  }

  /**
   * @stable [11.01.2020]
   * @returns {boolean}
   */
  private get isQuickSelectionModeEnabled(): boolean {
    return !this.isFocusPrevented;
  }

  /**
   * @stable [24.01.2020]
   * @returns {number}
   */
  private getMenuWidth(): number {
    return this.domAccessor.getWidth(this.getSelf());
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
  private get doOptionsExist(): boolean {
    return !R.isNil(this.props.options);
  }

  /**
   * @stable [22.01.2020]
   * @returns {boolean}
   */
  private get isMenuRendered(): boolean {
    return isMenuRendered(this.state);
  }

  /**
   * @stable [28.01.2020]
   * @returns {boolean}
   */
  private get isLocalOptionsUsed(): boolean {
    return isLocalOptionsUsed(this.props);
  }

  /**
   * @stable [24.01.2020]
   * @returns {boolean}
   */
  private get isMenuAnchored(): boolean {
    return isAnchored(this.props);
  }

  /**
   * @stable [11.01.2020]
   * @returns {boolean}
   */
  private get isMenuAlreadyRenderedAndOpened(): boolean {
    const menu = this.menu;
    return !R.isNil(menu) && menu.isOpen();
  }

  /**
   * @stable [24.01.2020]
   * @returns {HTMLElement}
   */
  private getMenuAnchorElement(): HTMLElement {
    return calc<HTMLElement>(this.props.menuAnchorElement) || this.input;
  }

  /**
   * @stable [30.11.2019]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.menuRef.current;
  }
}
