import * as React from 'react';
import * as ramda from 'ramda';
import { MDCSimpleMenu } from '@material/menu';

import { uuid } from 'core/util';
import { MaterialComponent } from 'core/component/material';

import {
  IMenuInternalState,
  IMenuInternalProps,
  IMenu,
  INativeMaterialMenuComponent
} from './menu.interface';

export class Menu extends MaterialComponent<Menu,
                                            IMenuInternalProps,
                                            IMenuInternalState,
                                            INativeMaterialMenuComponent>
    implements IMenu {

  constructor(props: IMenuInternalProps) {
    super(props, MDCSimpleMenu);
    this.onSelect = this.onSelect.bind(this);
  }

  public componentDidMount(): void {
    super.componentDidMount();
    this.nativeMdcInstance.listen('MDCSimpleMenu:selected', this.onSelect);
  }

  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.nativeMdcInstance.unlisten('MDCSimpleMenu:selected', this.onSelect);
  }

  public render(): JSX.Element {
    const menuItemsTpl = this.props.options.map(option => (
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
            <ul className='mdc-simple-menu__items mdc-list'
                role="menu">
              {menuItemsTpl}
            </ul>
          </div>
        </div>
    );
  }

  public show(): void {
    this.nativeMdcInstance.open = true;
  }

  public hide(): void {
    this.nativeMdcInstance.open = false;
  }

  public activate(index: number): void {
    // TODO
  }

  public get opened(): boolean {
    return this.nativeMdcInstance.open;
  }

  private onSelect(event: { detail: { index: number, item: Element }}): void {
    if (this.props.onSelect) {
      const value = event.detail.item.getAttribute('value');
      this.props.onSelect(
          ramda.find(option => option.value == value, this.props.options)
      );
    }
  }
}
