import * as React from 'react';
import * as ramda from 'ramda';

import { BasicTextField } from 'core/component/field';
import { Menu, IMenu } from 'core/component/menu';
import { AnyT, BasicEventT, ChangeEventT, IKeyValue, KeyboardEventT } from 'core/definition.interface';

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

  private static EMPTY_VALUE = -1;

  constructor(props: TInternalProps) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
  }

  public componentWillReceiveProps(nextProps: Readonly<TInternalProps>, nextContext: AnyT): void {
    super.componentWillReceiveProps(nextProps, nextContext);

    if (this.state.needOpenMenu) {
      this.setState({ needOpenMenu: false });
      this.showMenu();
    }
  }

  public onChange(event: ChangeEventT): void {
    this.input.value = '';  // We should reset the field manually before HTML5 validation will be called
    this.onChangeValue(undefined);
  }

  public onKeyEnter(event: KeyboardEventT): void {
    super.onKeyEnter(event);

    if (!this.menu.opened) {
      this.stopEvent(event);
      this.openMenu();
    }
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

    if (!this.menu.opened) {
      this.openMenu();
    }
  }

  protected getComponent(): JSX.Element {
    return (
        <div className='app-textfield-input-wrapper'>
          {super.getComponent()}
          <Menu ref='menu'
                options={this.options}
                onSelect={this.onSelect}>
          </Menu>
        </div>
    );
  }

  protected getComponentProps(): IKeyValue {
    return {
      ...super.getComponentProps(),
      value: this.toDisplayValue(),
    };
  }

  protected getEmptyValue(): AnyT {
    return BasicSelect.EMPTY_VALUE;
  }

  protected get options(): ISelectOption[] {
    return this.props.options || [];
  }

  protected onSelect(option: ISelectOption): void {
    this.onChangeValue(option.value, null);
  }

  protected toDisplayValue(): string {
    const value = this.value;
    const selectedItem = this.getSelectedOption(value);
    return selectedItem
        ? (selectedItem.label ? this.t(selectedItem.label) : selectedItem.value)
        : (value === BasicSelect.EMPTY_VALUE ? '' : value);
  }

  private getSelectedOption(value: AnyT): ISelectOption {
    return ramda.find((option) => option.value === value, this.options);
  }

  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }

  private openMenu(): void {
    if (ramda.isNil(this.props.options)) {
      if (this.props.onEmptyOptions) {
        this.setState({ needOpenMenu: true });
        this.props.onEmptyOptions();
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
}
