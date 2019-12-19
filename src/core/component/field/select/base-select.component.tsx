import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import {
  calc,
  cancelEvent,
  getWidth,
  ifNotNilThanValue,
  inProgress,
  isDef,
  isExpandActionRendered,
  isFn,
  joinClassName,
} from '../../../util';
import { BaseTextField } from '../../field/textfield';
import { Menu } from '../../menu';
import {
  AnyT,
  IKeyboardEvent,
} from '../../../definitions.interface';
import {
  IBaseSelectProps,
  IBaseSelectState,
} from './base-select.interface';
import {
  FieldActionTypesEnum,
  IBaseEvent,
  IMenu,
  ISelectOptionEntity,
} from '../../../definition';

export class BaseSelect<TProps extends IBaseSelectProps,
                        TState extends IBaseSelectState>
    extends BaseTextField<TProps, TState> {

  protected static readonly logger = LoggerFactory.makeLogger('BaseSelect');

  private readonly menuRef = React.createRef<Menu>();

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

    if (isExpandActionRendered(this.props)) {
      this.defaultActions = [
        {type: props.icon || FieldActionTypesEnum.DROP_DOWN, onClick: this.openMenu},
        ...this.defaultActions
      ];
    }
  }

  /**
   * @stable [30.11.2019]
   * @param {Readonly<TProps extends IBaseSelectProps>} prevProps
   * @param {Readonly<TState extends IBaseSelectState>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    super.componentDidUpdate(prevProps, prevState);
    const props = this.props;

    if (this.state.needToBeOpened) {
      ifNotNilThanValue(
        props.options,
        () => {
          this.setState({needToBeOpened: false}, () => {
            this.showMenu();
            if (isFn(props.onLoadDictionary)) {
              props.onLoadDictionary(this.filteredOptions);
            }
          });
        }
      );
    }

    const newValue = props.value;
    if (R.isNil(newValue) && !R.equals(newValue, prevProps.value)) {
      const $$cachedValue = this.state.$$cachedValue;

      if (!R.isNil($$cachedValue) && !R.equals($$cachedValue.value, newValue)) {
        // Need to reset the previous cached display value if the value has been cleared or replaced
        this.setState({$$cachedValue: null});
      }
    }
  }

  public onKeyBackspace(event: IKeyboardEvent): void {
    super.onKeyBackspace(event);
    this.clearValue();
  }

  public onKeyEnter(event: IKeyboardEvent): void {
    super.onKeyEnter(event);
    this.openMenu(event);
  }

  public onKeyEscape(event: IKeyboardEvent): void {
    super.onKeyEscape(event);

    if (this.menu.isOpen()) {
      this.hideMenu();
    }
  }

  /**
   * @stable [30.11.2019]
   */
  public clearValue(): void {
    super.clearValue();
    this.setState({$$cachedValue: null});
  }

  /**
   * @stable [30.11.2019]
   * @param {IBaseEvent} event
   */
  public openMenu(event?: IBaseEvent): void {
    if (this.menu.isOpen() || this.state.needToBeOpened) {
      return;
    }
    cancelEvent(event);

    const {
      onEmptyDictionary,
      bindDictionary,
      options,
      forceReload,
    } = this.props;
    const areOptionsEmpty = R.isNil(options);

    if (forceReload || areOptionsEmpty) {
      if (isFn(onEmptyDictionary)) {
        onEmptyDictionary(bindDictionary);
        this.setState({needToBeOpened: true}); // After callback invoking (!)
      } else if (!areOptionsEmpty) {
        this.showMenu();
      }
    } else {
      this.showMenu();
    }
  }

  /**
   * @stable [30.11.2019]
   * @returns {boolean}
   */
  public get inProgress(): boolean {
    return inProgress(this.props) || this.state.needToBeOpened === true;
  }

  /**
   * @stable [25.02.2019]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    super.onClick(event);
    this.openMenu(event);
  }

  /**
   * @stable [01.06.2018]
   * @returns {JSX.Element}
   */
  protected getInputAttachmentElement(): JSX.Element {
    const props = this.props;
    return (
      <Menu
        ref={this.menuRef}
        width={this.menuWidth}
        options={this.filteredOptions}
        onSelect={this.onSelect}
        onFilterChange={this.onFilterChange}
        onClose={this.onClose}
        {...props.menuConfiguration}/>
    );
  }

  /**
   * @stable [30.11.2019]
   * @returns {ISelectOptionEntity[]}
   */
  protected get filteredOptions(): ISelectOptionEntity[] {
    return this.options;
  }

  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-base-select');
  }

  /**
   * @stable [29.06.2018]
   * @returns {AnyT}
   */
  protected getEmptyValue(): AnyT {
    const props = this.props;
    return isDef(props.emptyValue) ? props.emptyValue : this.settings.entityEmptyId; // TODO Move to universal-field
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

      const onSelect = this.props.onSelect;
      if (isFn(onSelect)) {
        onSelect(option);
      }
    });
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
   * @stable [20.08.2018]
   * @returns {ISelectOptionEntity[]}
   */
  protected get options(): ISelectOptionEntity[] {
    return calc<ISelectOptionEntity[]>(this.props.options) || [];
  }

  /**
   * @stable [30.11.2019]
   */
  private showMenu(): void {
    if (R.isEmpty(this.filteredOptions)) {
      BaseSelect.logger.debug('[$BaseSelect][showMenu] The options are empty. The menu does not show.');
    } else {
      this.menu.show();
    }
  }

  /**
   * @stable [20.08.2018]
   */
  private hideMenu(): void {
    this.menu.hide();
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
   * @stable [23.11.2019]
   * @returns {number}
   */
  private get menuWidth(): number {
    return getWidth(this.getSelf());
  }

  /**
   * @stable [30.11.2019]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.menuRef.current;
  }
}
