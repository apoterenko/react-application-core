import * as React from 'react';
import * as ramda from 'ramda';
import { MDCMenu } from '@material/menu';

import { BasicEventT, UNDEF } from '../../definition.interface';
import { MaterialComponent } from '../material';
import { orNull, toClassName, uuid, setAbsoluteOffset, orDefault } from '../../util';
import { lazyInject, DI_TYPES } from '../../di';
import { IEventManager } from '../../event';
import { FieldT, TextField } from '../field';
import { SimpleList } from '../list';
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

  private menuParent: HTMLElement;
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

    if (this.props.renderToBody) {
      this.menuParent = this.self.parentElement;
      document.body.appendChild(this.self);
    }
  }

  public componentWillUnmount(): void {
    if (this.props.renderToBody) {
      delete this.menuParent;
      document.body.removeChild(this.self);
    }

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
    const optionValueFn = (option) => (option.label ? this.t(option.label) : option.value);

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
            orDefault(
              !!props.renderer,
              () => React.cloneElement(props.renderer(option), props0),
              () => (
                <li {...(!!option.icon ? {key: uuid()} : props0)}>
                  {
                    orDefault(
                      !!props.tpl,
                      () => props.tpl(option),
                      () => (
                        orDefault<JSX.Element, JSX.Element>(
                          !!option.icon,
                          () => (
                            <div {...props0}>
                              {this.uiFactory.makeIcon(option.icon)}
                              {optionValueFn(option)}
                            </div>
                          ),
                          () => optionValueFn(option)
                        )
                      )
                    )
                  }
                </li>
              ),
            )
          );
        });

    return (
        <div className={this.uiFactory.menuAnchor}>
          <div ref='self'
               className={toClassName('rac-menu', props.className, this.uiFactory.menu)}>
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
    const props = this.props;
    this.setState({ filter: UNDEF });
    this.nativeMdcInstance.open = true;

    if (props.useFilter) {
      setTimeout(() => this.field.setFocus());
    }

    if (props.renderToBody) {
      setAbsoluteOffset(this.self, props.getAnchor ? props.getAnchor() : this.menuParent);
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
