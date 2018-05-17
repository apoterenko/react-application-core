import * as React from 'react';
import * as R from 'ramda';

import { BasicEventT, KeyboardEventT, UNDEF } from '../../definitions.interface';
import {
  orNull,
  toClassName,
  uuid,
  setAbsoluteOffset,
  orDefault,
  addClassNameToBody,
  addClassNameToElement,
  removeClassNameFromBody,
  addChildToBody,
} from '../../util';
import { IField, TextField } from '../field';
import { SimpleList } from '../list';
import {
  IMenuInternalState,
  IMenuProps,
  IMenu,
} from './menu.interface';
import { BaseComponent } from '../base';

export class Menu extends BaseComponent<Menu, IMenuProps, IMenuInternalState>
    implements IMenu {

  public static defaultProps: IMenuProps = {
    filter: (valueToFilter, option) => String(option.label || option.value).toUpperCase().includes(valueToFilter),
  };

  private menuParent: HTMLElement;

  constructor(props: IMenuProps) {
    super(props);

    this.onSelect = this.onSelect.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputFocus = this.onInputFocus.bind(this);
    this.onInputBlur = this.onInputBlur.bind(this);
    this.onInputKeyEscape = this.onInputKeyEscape.bind(this);

    this.state = {};
  }

  public componentDidMount(): void {
    const props = this.props;
    super.componentDidMount();

    if (props.useFilter) {
      // We must handle the events through native DOM Api because MDC
      this.eventManager.add(this.field.input, 'click', this.onFilterClick);
    }
    if (this.isRenderToBody) {
      this.menuParent = this.self.parentElement;
      addChildToBody(this.self);
    }
    if (props.renderToCenterOfBody) {
      addClassNameToElement(this.self as HTMLElement, 'rac-absolute-center-position');
    }
  }

  public componentWillUnmount(): void {
    const props = this.props;

    if (this.isRenderToBody) {
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
    const state = this.state;
    const valueToFilter = state.filter && state.filter.toUpperCase();
    const optionValueFn = (option) => (option.label ? this.t(option.label) : option.value);

    const menuItemsTpl = props.options
      .filter((option) => !valueToFilter || props.filter(valueToFilter, option))
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
                         value={state.filter}
                         placeholder={props.filterPlaceholder || 'Filter'}
                         onChange={this.onInputChange}
                         onFocus={this.onInputFocus}
                         onBlur={this.onInputBlur}
                         onKeyEscape={this.onInputKeyEscape}/>
            )
          )}
          <SimpleList useTwoLine={false}
                      nonInteractive={false}
                      className={this.uiFactory.menuItems}>
            {menuItemsTpl}
          </SimpleList>
        </div>
      </div>
    );
  }

  /**
   * @stable [17.05.2018]
   */
  public show(): void {
    this.setState({ filter: UNDEF });

    const props = this.props;
    if (props.useFilter) {
      setTimeout(() => this.field.setFocus());
    }
    if (props.renderToCenterOfBody) {
      addClassNameToBody('rac-disabled');
    } else if (props.renderToBody) {
      setAbsoluteOffset(this.self, props.getAnchor ? props.getAnchor() : this.menuParent);
    }
  }

  /**
   * @stable [17.05.2018]
   */
  public hide(): void {
    if (!this.props.renderToCenterOfBody) {
      return;
    }
    removeClassNameFromBody('rac-disabled');
  }

  /**
   * Each plugin may implement this method
   * @stable [17.05.2018]
   */
  public onInputFocus(): void {
    // Nothing to do
  }

  /**
   * Each plugin may implement this method
   * @stable [17.05.2018]
   */
  public onInputBlur(): void {
    // Nothing to do
  }

  /**
   * Each plugin should implement this method
   * @stable [17.05.2018]
   * @returns {boolean}
   */
  public isOpen(): boolean {
    return false;
  }

  private onInputChange(filter: string): void {
    this.setState({ filter });
  }

  private onInputKeyEscape(event: KeyboardEventT): void {
    this.stopEvent(event);
    this.hide();
  }

  private onFilterClick(event: BasicEventT): void {
    this.stopEvent(event);
  }

  private get field(): IField {
    return this.refs.field as IField;
  }

  private get isRenderToBody(): boolean {
    const props = this.props;
    return props.renderToBody || props.renderToCenterOfBody;
  }

  private onSelect(event: React.SyntheticEvent<HTMLElement>): void {
    this.stopEvent(event);

    const props = this.props;
    if (props.onSelect) {
      const optionAsText = event.currentTarget.getAttribute('value');
      props.onSelect(R.find((option) => String(option.value) === optionAsText, props.options));
    }

    this.hide();
  }
}
