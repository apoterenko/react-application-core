import * as React from 'react';
import * as ramda from 'ramda';
import { MDCMenu } from '@material/menu';

import { BasicEventT, UNDEF } from '../../definition.interface';
import { MaterialComponent } from '../../component/material';
import { orNull, toClassName, uuid } from '../../util';
import { lazyInject, DI_TYPES } from '../../di';
import { IEventManager } from '../../event';
import { FieldT, TextField } from '../../component/field';
import { SimpleList } from '../../component/list';
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
    super(props, MDCMenu);

    this.onSelect = this.onSelect.bind(this);
    this.onInputClick = this.onInputClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {};
  }

  public componentDidMount(): void {
    super.componentDidMount();
    this.nativeMdcInstance.listen('MDCMenu:selected', this.onSelect);
    if (this.props.useFilter) {
      // We must handle events through native DOM Api because Material Foundation implementation
      this.eventManager.add(this.field.input, 'click', this.onInputClick);
    }
  }

  public componentWillUnmount(): void {
    this.nativeMdcInstance.unlisten('MDCMenu:selected', this.onSelect);
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
            (option) => !filter || String(option.label || option.value).toUpperCase().includes(filter)
        )
        .map((option): JSX.Element => {
          const props0 = {
            role: 'option',
            key: uuid(),
            value: option.value,
            className: this.uiFactory.listItem,
            ['aria-disabled']: option.disabled === true,
          };
          return (
              props.renderer
                  ? React.cloneElement(props.renderer(option), props0)
                  : (
                      <li {...props0}>
                        {
                          props.tpl
                              ? props.tpl(option)
                              : (option.label ? this.t(option.label) : option.value)
                        }
                      </li>
                  )
          );
        });

    return (
        <div className={this.uiFactory.menuAnchor}>
          <div ref='self'
               className={toClassName('rac-menu', this.uiFactory.menu)}>
            {orNull(
                props.useFilter,
                () => (
                    <TextField ref='field'
                               value={this.state.filter}
                               placeholder={props.filterPlaceholder || 'Filter'}
                               onChange={this.onInputChange}/>
                )
            )}
            <SimpleList twoLine={false}
                        nonInteractive={false}
                        className={this.uiFactory.menuItems}>
              {menuItemsTpl}
            </SimpleList>
          </div>
        </div>
    );
  }

  public show(): void {
    this.setState({ filter: UNDEF });
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
