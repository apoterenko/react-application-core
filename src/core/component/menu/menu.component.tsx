import * as React from 'react';
import * as ramda from 'ramda';
import { MDCSimpleMenu } from '@material/menu';

import { BasicEventT } from '../../definition.interface';
import { MaterialComponent } from '../../component/material';
import { orNull, uuid } from '../../util';
import { lazyInject, DI_TYPES } from '../../di';
import { IEventManager } from '../../event';
import { FieldT, TextField } from '../../component/field';
import {
  IMenuInternalState,
  IMenuInternalProps,
  IMenu,
  INativeMaterialMenuComponent,
} from './menu.interface';

export class Menu extends MaterialComponent<Menu,
                                            IMenuInternalProps,
                                            IMenuInternalState,
                                            INativeMaterialMenuComponent>
    implements IMenu {

  @lazyInject(DI_TYPES.EventManager) private eventManager: IEventManager;

  constructor(props: IMenuInternalProps) {
    super(props, MDCSimpleMenu);

    this.onSelect = this.onSelect.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {};
  }

  public componentDidMount(): void {
    super.componentDidMount();
    this.nativeMdcInstance.listen('MDCSimpleMenu:selected', this.onSelect);
    if (this.props.useFilter) {
      // We must handle events through native DOM Api because Material Foundation implementation
      this.eventManager.add(this.field.input, 'click', this.onInputClick);
    }
  }

  public componentWillUnmount(): void {
    this.nativeMdcInstance.unlisten('MDCSimpleMenu:selected', this.onSelect);
    if (this.props.useFilter) {
      // We must handle events through native DOM Api because Material Foundation implementation
      this.eventManager.remove(this.field.input, 'click', this.onInputClick);
    }
    super.componentWillUnmount();
  }

  public render(): JSX.Element {
    const props = this.props;
    const filter = this.state.filter && this.state.filter.toUpperCase();

    const menuItemsTpl = props.options
      .filter(
        (option) => !filter ||  String(option.label || option.value).toUpperCase().includes(filter)
      )
      .map((option) => (
        <li className='mdc-list-item'
            role='option'
            key={uuid()}
            value={option.value}
            aria-disabled={option.disabled === true}>
          {option.label ? this.t(option.label) : option.value}
        </li>
    ));

    return (
        <div className='mdc-menu-anchor'>
          <div ref='self'
               className='mdc-simple-menu app-menu'>
            {orNull(
                props.useFilter,
                <TextField ref='field'
                           value={this.state.filter}
                           notErrorMessageRequired={true}
                           placeholder={props.filterPlaceholder || 'Filter'}
                           onChange={this.onInputChange}/>
            )}
            <ul className='mdc-simple-menu__items mdc-list'
                role='menu'>
              {menuItemsTpl}
            </ul>
          </div>
        </div>
    );
  }

  public show(): void {
    this.setState({ filter: undefined });
    this.nativeMdcInstance.open = true;

    if (this.props.useFilter) {
      setTimeout(() => this.field.setFocus());
    }
  }

  public hide(): void {
    this.nativeMdcInstance.open = false;
  }

  public activate(index: number): void {
    // TODO
  }

  private onInputChange(filter: string): void {
    this.setState({ filter });
  }

  private onInputClick(event: BasicEventT): void {
    // We must handle events through native DOM Api because Material Foundation implementation
    this.stopEvent(event);
  }

  public get opened(): boolean {
    return this.nativeMdcInstance.open;
  }

  private get field(): FieldT {
    return this.refs.field as FieldT;
  }

  private onSelect(event: { detail: { index: number, item: Element } }): void {
    if (this.props.onSelect) {
      const value = event.detail.item.getAttribute('value');
      this.props.onSelect(ramda.find((option) => String(option.value) === value, this.props.options));
    }
  }
}
