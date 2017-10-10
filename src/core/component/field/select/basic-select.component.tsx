import * as React from 'react';
import * as ramda from 'ramda';

import { BasicTextField, IBasicTextFieldAction } from '../../../component/field';
import { Menu, IMenu } from '../../../component/menu';
import {
  AnyT,
  BasicEventT,
  ChangeEventT,
  EMPTY_ID,
  IKeyValue,
  KeyboardEventT,
} from '../../../definition.interface';
import {
  INativeMaterialSelectComponent,
  IBasicSelectInternalProps,
  IBasicSelectInternalState,
  ISelectOption,
} from './basic-select.interface';

export class BasicSelect<TComponent extends BasicSelect<TComponent, TInternalProps, TInternalState>,
                         TInternalProps extends IBasicSelectInternalProps,
                         TInternalState extends IBasicSelectInternalState>
    extends BasicTextField<TComponent,
                           TInternalProps,
                           TInternalState,
                           INativeMaterialSelectComponent> {

  constructor(props: TInternalProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: AnyT): void {
    super.componentWillReceiveProps(nextProps, nextContext);

    if (this.state.needOpenMenu
        && !ramda.isNil(nextProps.options)) {
      this.setState({ needOpenMenu: false });

      if (this.isInputFocused) {
        this.showMenu();
      }
    }
  }

  public onChange(event: ChangeEventT): void {
    this.cleanNativeInputForSupportHTML5Validation();
    this.onChangeValue(undefined);
  }

  public onKeyEnter(event: KeyboardEventT): void {
    super.onKeyEnter(event);
    this.openMenu(event);
  }

  public onKeyEscape(event: KeyboardEventT): void {
    super.onKeyEscape(event);

    if (this.menu.opened) {
      this.stopEvent(event);
      this.hideMenu();
    }
  }

  protected onClick(event: BasicEventT): void {
    super.onClick(event);
    this.openMenu(event);
  }

  protected getComponent(): JSX.Element {
    return (
        <div className='app-textfield-input-wrapper'>
          {super.getComponent()}
          <Menu ref='menu'
                useFilter={this.props.useFilter}
                options={this.getFilteredOptions()}
                onSelect={this.onSelect}>
          </Menu>
        </div>
    );
  }

  protected getFilteredOptions(): ISelectOption[] {
    return this.options;
  }

  protected getComponentProps(): IKeyValue {
    return {
      ...super.getComponentProps(),

      placeholder: this.isWaitingForOptions
          ? this.t(this.props.progressMessage || 'Loading...')
          : this.props.placeholder,

      value: this.toDisplayValue(),
    };
  }

  protected getEmptyValue(): AnyT {
    return EMPTY_ID;
  }

  protected get options(): ISelectOption[] {
    return this.props.options || [];
  }

  protected onSelect(option: ISelectOption): void {
    this.onChangeValue(option.value, null);

    if (this.props.onSelect) {
      this.props.onSelect(option);
    }
  }

  protected toDisplayValue(): string {
    const value = this.value;
    const selectedItem = this.getSelectedOption(value);
    return selectedItem
        ? (selectedItem.label ? this.t(selectedItem.label) : selectedItem.value)
        : (value === EMPTY_ID ? '' : value);
  }

  protected getActions(): IBasicTextFieldAction[] {
    return (this.props.actions || []).concat(
        {
          type: 'arrow_drop_down',
          actionHandler: (event: BasicEventT) => {
            this.input.focus();
            this.openMenu(event);
          },
        }
    );
  }

  private getSelectedOption(value: AnyT): ISelectOption {
    return ramda.find((option) => option.value === value, this.options);
  }

  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }

  private openMenu(event: BasicEventT): void {
    if (this.isWaitingForOptions || this.menu.opened) {
      return;
    }
    this.stopEvent(event);

    const props = this.props;
    if (ramda.isNil(props.options)) {
      if (props.onEmptyOptions) {
        this.setState({ needOpenMenu: true });
        props.onEmptyOptions();
      }
    } else {
      this.showMenu();
    }
  }

  private showMenu(): void {
    this.menu.show();
  }

  private hideMenu(): void {
    this.menu.hide();
  }

  private get isWaitingForOptions(): boolean {
    return ramda.isNil(this.props.options) && this.state.needOpenMenu;
  }
}
