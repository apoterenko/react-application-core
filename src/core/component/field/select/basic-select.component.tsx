import * as React from 'react';
import * as R from 'ramda';
import { LoggerFactory, ILogger } from 'ts-smart-logger';

import { cancelEvent, joinClassName, isDef, getWidth, isFn, calc, inProgress } from '../../../util';
import { BaseTextField } from '../../field/textfield';
import { Menu } from '../../menu';
import { AnyT, IKeyboardEvent } from '../../../definitions.interface';
import { IBaseSelectProps, IBasicSelectState } from './basic-select.interface';
import {
  FieldActionTypesEnum,
  IBaseEvent,
  IMenu,
  ISelectOptionEntity,
} from '../../../definition';

export class BaseSelect<TProps extends IBaseSelectProps,
                        TState extends IBasicSelectState>
    extends BaseTextField<TProps, TState> {

  protected static logger = LoggerFactory.makeLogger('BaseSelect');

  /**
   * @stable [15.09.2018]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.onClose = this.onClose.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);

    if (props.expandActionRendered !== false) {
      this.defaultActions = [
        {type: props.icon || FieldActionTypesEnum.DROP_DOWN, onClick: this.openMenu},
        ...this.defaultActions
      ];
    }
  }

  /**
   * @stable [20.08.2018]
   * @param {Readonly<TProps extends IBaseSelectProps>} prevProps
   * @param {Readonly<TState extends IBasicSelectState>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    super.componentDidUpdate(prevProps, prevState);

    const props = this.props;
    if (this.state.needToOpenMenu && !R.isNil(props.options)) {
      this.showMenu();
      this.setState({needToOpenMenu: false});

      if (props.onLoadDictionary) {
        props.onLoadDictionary(this.toFilteredOptions());
      }
    }

    /**
     * Need to reset the previous cached display value if the value has been cleared manually
     */
    if (!R.isNil(this.state.displayValue) && R.isNil(props.value)) {
      this.setState({displayValue: null});
    }
  }

  public onKeyDown(event: IKeyboardEvent): void {
    super.onKeyDown(event);
    cancelEvent(event);
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
   * @stable [06.10.2018]
   */
  public clearValue(): void {
    super.clearValue();
    this.setState({displayValue: null});
  }

  /**
   * @stable [25.02.2019]
   * @param {IBaseEvent} event
   */
  public openMenu(event?: IBaseEvent): void {
    if (this.menu.isOpen() || this.state.needToOpenMenu) {
      return;
    }
    cancelEvent(event);

    const props = this.props;
    const areOptionsEmpty = R.isNil(props.options);

    if (props.forceReload || areOptionsEmpty) {
      if (isFn(props.onEmptyDictionary)) {
        this.setState({needToOpenMenu: true});
        props.onEmptyDictionary();
      } else if (!areOptionsEmpty) {
        this.showMenu();
      }
    } else {
      this.showMenu();
    }
  }

  /**
   * @stable [18.06.2018]
   * @returns {boolean}
   */
  public get inProgress(): boolean {
    return inProgress(this.props) || !!this.state.needToOpenMenu;
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
        ref='menu'
        width={() => getWidth(this.getSelf())}
        options={this.toFilteredOptions()}
        onSelect={this.onSelect}
        onFilterChange={this.onFilterChange}
        onClose={this.onClose}
        {...props.menuConfiguration}/>
    );
  }

  /**
   * @stable [20.08.2018]
   * @returns {ISelectOptionEntity[]}
   */
  protected toFilteredOptions(): ISelectOptionEntity[] {
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
    return isDef(props.emptyValue) ? props.emptyValue : this.settings.entityEmptyId;
  }

  /**
   * @stable [20.08.2018]
   * @param {ISelectOptionEntity} option
   */
  protected onSelect(option: ISelectOptionEntity): void {
    this.onChangeManually(option.value);

    /**
     * We need to save a label because dictionary data may be refreshed
     * TODO Need to save an internal state in storage
     */
    this.setState({displayValue: option.label || option.value});

    if (this.props.onSelect) {
      this.props.onSelect(option);
    }
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
    const statedDisplayValue = this.state.displayValue;
    if (!R.isNil(statedDisplayValue)) {
      return super.getDecoratedValue(statedDisplayValue, false);
    }
    const selectedItem = R.find<ISelectOptionEntity>((option) => option.value === value, this.options);
    return R.isNil(selectedItem)
      ? super.getDecoratedValue(value)
      : super.getDecoratedValue(
        R.isNil(selectedItem.label)
          ? selectedItem.value
          : this.t(selectedItem.label),
        false
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
   * @stable [20.08.2018]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }

  /**
   * @stable [20.08.2018]
   */
  private showMenu(): void {
    const filteredOptions = this.toFilteredOptions();
    if (filteredOptions.length) {
      this.menu.show();
    } else {
      BaseSelect.logger.debug('[$BasicSelect][showMenu] The options are empty. The menu does not show.');
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
}
