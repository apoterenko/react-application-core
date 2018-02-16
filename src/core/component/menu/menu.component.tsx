import * as React from 'react';
import * as R from 'ramda';
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
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);

    this.state = {};
  }

  public componentDidMount(): void {
    super.componentDidMount();

    if (this.props.useFilter) {
      // We must handle the events through native DOM Api because MDC
      this.eventManager.add(this.field.input, 'click', this.onFilterClick);
    }
    if (this.props.renderToBody) {
      this.menuParent = this.self.parentElement;
      document.body.appendChild(this.self);
    }
  }

  public componentWillUnmount(): void {
    const props = this.props;
    if (props.renderToBody) {
      delete this.menuParent;
      document.body.removeChild(this.self);
    }
    if (props.useFilter) {
      // We must handle the events through native DOM Api because MDC
      this.eventManager.remove(this.field.input, 'click', this.onFilterClick);
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
            className: toClassName(this.uiFactory.listItem, 'rac-simple-list-item'),
            ['aria-disabled']: option.disabled === true,
            onClick: this.onSelect,
          };
          return (
            orDefault(
              !!props.renderer,
              () => React.cloneElement(props.renderer(option), props0),
              () => (
                <li {...props0}>
                  {
                    orDefault(
                      !!props.tpl,
                      () => props.tpl(option),
                      () => (
                        orDefault(
                          !!option.icon,
                          () => (
                            <div>
                              {this.uiFactory.makeIcon({ type: option.icon, className: 'rac-menu-item-icon' })}
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

  private onFilterClick(event: BasicEventT): void {
    this.stopEvent(event);
  }

  public get opened(): boolean {
    return this.nativeMdcInstance.open;
  }

  private get field(): FieldT {
    return this.refs.field as FieldT;
  }

  private onSelect(event: React.SyntheticEvent<HTMLElement>): void {
    this.stopEvent(event);

    const props = this.props;
    if (props.onSelect) {
      const optionAsText = event.currentTarget.getAttribute('value');
      props.onSelect(R.find((option) => String(option.value) === optionAsText, props.options));
    }

    this.hide();  // MDC the internal elements event handling issue
  }
}
