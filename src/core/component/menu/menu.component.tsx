import * as React from 'react';
import * as R from 'ramda';

import { BasicEventT, KeyboardEventT, UNDEF, IBasicEvent } from '../../definitions.interface';
import { IMenuItemEntity } from '../../entities-definitions.interface';
import {
  orNull,
  toClassName,
  isDef,
  setAbsoluteOffset,
  orDefault,
  addClassNameToBody,
  addClassNameToElement,
  removeClassNameFromBody,
  addChild,
  adjustWidth,
  queryFilter,
  setAbsoluteOffsetByCoordinates,
  removeChild,
} from '../../util';
import { IField, TextField } from '../field';
import { SimpleList } from '../list';
import {
  IMenuState,
  IMenuProps,
  IMenu,
} from './menu.interface';
import { BaseComponent } from '../base';

export class Menu extends BaseComponent<Menu, IMenuProps, IMenuState>
    implements IMenu {

  public static defaultProps: IMenuProps = {
    filter: (query, entity) => queryFilter(query, entity.label || entity.value),
  };

  private menuParent: Element;

  /**
   * @stable [31.07.2018]
   * @param {IMenuProps} props
   */
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

  /**
   * @stable [31.07.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    const props = this.props;
    if (this.isRenderToBody) {
      this.menuParent = this.self.parentElement;
      addChild(this.self);
    }
    if (props.useFilter) {
      // We must handle the events through native DOM Api because MDC
      this.eventManager.add(this.field.input, 'click', this.onFilterClick);
    }
    if (props.renderToCenterOfBody) {
      addClassNameToElement(this.self as HTMLElement, 'rac-absolute-center-position');
    }
  }

  /**
   * @stable [31.07.2018]
   */
  public componentWillUnmount(): void {
    const props = this.props;

    if (this.isRenderToBody) {
      delete this.menuParent;
      removeChild(this.self);
    }
    if (props.useFilter) {
      // We must handle the events through native DOM Api because MDC
      this.eventManager.remove(this.field.input, 'click', this.onFilterClick);
    }
    super.componentWillUnmount();
  }

  /**
   * @stable [07.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const state = this.state;
    const optionValueFn = (option: IMenuItemEntity): string | number => (option.label ? this.t(option.label) : option.value);

    return (
      <div ref='selfWrapper'
           className={this.uiFactory.menuAnchor}>
        <div ref='self'
             className={toClassName('rac-menu', props.className, this.uiFactory.menu)}>
          {
            orNull<JSX.Element>(
              props.renderToCenterOfBody,
              () => (
                <div className='rac-menu-close-action rac-flex rac-flex-end'>
                  {this.uiFactory.makeIcon('close')}
                </div>
              )
            )
          }
          {orNull<JSX.Element>(
            props.useFilter,
            () => (
              <TextField ref='field'
                         value={state.filter}
                         placeholder={props.filterPlaceholder || this.settings.messages.filterPlaceholderMessage}
                         onChange={this.onInputChange}
                         onFocus={this.onInputFocus}
                         onBlur={this.onInputBlur}
                         onKeyEscape={this.onInputKeyEscape}/>
            )
          )}
          <SimpleList useTwoLine={false}
                      nonInteractive={false}
                      className={this.uiFactory.menuItems}>
            {
              this.menuItems
                .map((option): JSX.Element => (
                  <li role='option'
                      key={`menu-item-${option.value}`}
                      className={toClassName(this.uiFactory.listItem, 'rac-simple-list-item')}
                      aria-disabled={option.disabled === true}>
                    <div className='rac-menu-item rac-flex'
                         onClick={(event) => this.onSelect(event, option)}>
                      {
                        orDefault<React.ReactNode, React.ReactNode>(
                          isDef(props.renderer),
                          (): React.ReactNode => props.renderer.call(this, option),
                          (): React.ReactNode => (
                            orDefault<React.ReactNode, React.ReactNode>(
                              R.isNil(option.icon),
                              (): React.ReactNode => (
                                orDefault<React.ReactNode, React.ReactNode>(
                                  isDef(props.tpl),
                                  () => props.tpl.call(this, option),
                                  () => optionValueFn(option)
                                )
                              ),
                              (): React.ReactNode => (
                                <div>
                                  {this.uiFactory.makeIcon({type: option.icon, className: 'rac-menu-item-icon'})}
                                  {optionValueFn(option)}
                                </div>
                              )
                            )
                          )
                        )
                      }
                    </div>
                  </li>
                ))
            }
          </SimpleList>
        </div>
      </div>
    );
  }

  /**
   * @stable [31.07.2018]
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
      const menuEl = this.self as HTMLElement;

      setAbsoluteOffset(menuEl, this.menuParent);
      if (props.adjustWidth) {
        adjustWidth(menuEl, this.menuParent);
      }
    } else if (props.renderToX || props.renderToY) {
      setAbsoluteOffsetByCoordinates(this.refs.selfWrapper as HTMLElement, props.renderToX, props.renderToY);
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

  /**
   * @stable [06.08.2018]
   * @returns {IMenuItemEntity[]}
   */
  private get menuItems(): IMenuItemEntity[] {
    const props = this.props;
    const state = this.state;
    const query = state.filter;

    return props.useFilter
      ? props.options.filter((option) => props.filter(query, option))
      : props.options;
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

  /**
   * @stable [07.06.2018]
   * @returns {IField}
   */
  private get field(): IField {
    return this.refs.field as IField;
  }

  /**
   * @stable [14.06.2018]
   * @returns {boolean}
   */
  private get isRenderToBody(): boolean {
    const props = this.props;
    return props.renderToBody || props.renderToCenterOfBody;
  }

  /**
   * @stable [06.08.2018]
   * @param {IBasicEvent<HTMLElement>} event
   * @param {IMenuItemEntity} option
   */
  private onSelect(event: IBasicEvent<HTMLElement>, option: IMenuItemEntity): void {
    this.stopEvent(event);

    const props = this.props;
    if (props.onSelect) {
      props.onSelect(option);
    }

    if (!props.multi
      || this.menuItems.length === 1 // Because a "Flux Cycle", to prevent empty list after updating
    ) {
      this.hide();
    }
  }
}
