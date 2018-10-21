import * as React from 'react';
import * as R from 'ramda';

import { UNDEF, IBasicEvent } from '../../definitions.interface';
import { IMenuItemEntity } from '../../entities-definitions.interface';
import {
  orNull,
  toClassName,
  isDef,
  orDefault,
  addClassNameToElement,
  queryFilter,
  setAbsoluteOffsetByCoordinates,
  applyStyle,
  calc,
  cancelEvent,
} from '../../util';
import { IField, TextField } from '../field';
import { SimpleList } from '../list';
import { IMenuState, IMenuProps, IMenu } from './menu.interface';
import { BaseComponent } from '../base';
import { FlexLayout } from '../layout';

export class Menu extends BaseComponent<Menu, IMenuProps, IMenuState>
    implements IMenu {

  public static defaultProps: IMenuProps = {
    filter: (query, entity) => queryFilter(query, entity.label || entity.value),
  };

  private fieldRef = React.createRef<TextField>();
  private menuAnchorRef = React.createRef<HTMLDivElement>();

  /**
   * @stable [31.07.2018]
   * @param {IMenuProps} props
   */
  constructor(props: IMenuProps) {
    super(props);

    this.hide = this.hide.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onCloseAction = this.onCloseAction.bind(this);

    this.state = {};
  }

  /**
   * @stable [04.10.2018]
   */
  public componentDidMount(): void {
    if (this.props.renderToCenterOfBody) {
      addClassNameToElement(this.self, 'rac-absolute-center-position');
    }
    super.componentDidMount();
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
      <div ref={this.menuAnchorRef}
           className={this.uiFactory.menuAnchor}>
        <div ref='self'
             className={toClassName(
                          'rac-menu',
                          props.className,
                          this.uiFactory.menu,
                          this.uiFactory.menuSurface,
                          props.renderToCenterOfBody && 'rac-menu-centered')}>
          {
            orNull<JSX.Element>(
              props.renderToCenterOfBody,
              () => this.uiFactory.makeIcon({type: 'close', className: 'rac-menu-close-action', onClick: this.onCloseAction})
            )
          }
          {orNull<JSX.Element>(
            props.useFilter,
            () => (
              <FlexLayout full={false}
                          row={true}
                          className='rac-menu-field-wrapper'>
                <TextField ref={this.fieldRef}
                           value={state.filter}
                           placeholder={props.filterPlaceholder || this.settings.messages.filterPlaceholderMessage}
                           errorMessageRendered={false}
                           onChange={this.onInputChange}/>
              </FlexLayout>
            )
          )}
          <SimpleList>
            {
              this.menuItems.map((option): JSX.Element => (
                  <li role='option'
                      key={`menu-item-key-${option.value}`}
                      className='rac-list-item rac-flex'
                      aria-disabled={option.disabled === true}
                      onClick={(event) => this.onSelect(event, option)}>
                    <FlexLayout justifyContentCenter={true}
                                className='rac-menu-item'>
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
                                <FlexLayout row={true}
                                            alignItemsCenter={true}>
                                  {this.uiFactory.makeIcon({type: option.icon, className: 'rac-menu-item-icon'})}
                                  {optionValueFn(option)}
                                </FlexLayout>
                              )
                            )
                          )
                        )
                      }
                    </FlexLayout>
                  </li>
                ))
            }
          </SimpleList>
        </div>
      </div>
    );
  }

  /**
   * @stable [04.10.2018]
   */
  public show(): void {
    const props = this.props;
    this.setState({filter: UNDEF}, () => props.useFilter && this.field.setFocus());

    if (!R.isNil(props.renderToX) || !R.isNil(props.renderToY)) {
      setAbsoluteOffsetByCoordinates(this.menuAnchorRef.current, props.renderToX, props.renderToY);
    } else if (!R.isNil(props.width)) {
      applyStyle(this.self, 'width', calc(props.width));
    }
  }

  /**
   * Each plugin may implement this method
   * @stable [17.05.2018]
   */
  public hide(): void {
    // Do nothing
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

  /**
   * @stable [17.10.2018]
   * @param {IBasicEvent} event
   */
  private onCloseAction(event: IBasicEvent): void {
    cancelEvent(event);
    this.hide();
  }

  /**
   * @stable [04.10.2018]
   * @param {string} filter
   */
  private onInputChange(filter: string): void {
    this.setState({filter});
  }

  /**
   * @stable [07.06.2018]
   * @returns {IField}
   */
  private get field(): IField {
    return this.fieldRef.current;
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
