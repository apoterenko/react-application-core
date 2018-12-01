import * as React from 'react';
import * as R from 'ramda';

import { UNDEF} from '../../definitions.interface';
import { IMenuItemEntity } from '../../entities-definitions.interface';
import {
  orNull,
  toClassName,
  isDef,
  orDefault,
  queryFilter,
  setAbsoluteOffsetByCoordinates,
  calc,
  cancelEvent,
} from '../../util';
import { IField, TextField } from '../field';
import { SimpleList } from '../list';
import { IMenuState, IMenuProps, IMenu } from './menu.interface';
import { BaseComponent } from '../base';
import { FlexLayout } from '../layout';
import { IBasicEvent } from '../../react-definitions.interface';
import { Overlay } from '../overlay';

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

    this.state = {opened: false};
  }

  /**
   * @stable [07.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const state = this.state;

    return (
      <div ref={this.menuAnchorRef}
           className={this.uiFactory.menuAnchor}>
        <div ref={this.getSelfRef()}
             style={{width: calc(props.width)}}
             className={toClassName(
                          'rac-menu',
                          props.className,
                          this.uiFactory.menu,
                          this.uiFactory.menuSurface,
                          props.renderToCenterOfBody && 'rac-absolute-center-position rac-menu-centered')}>
          {
            orNull<JSX.Element>(
              props.renderToCenterOfBody && this.isOpen(),
              () => <Overlay onClick={this.hide}/>
            )
          }
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
          {this.listElement}
        </div>
      </div>
    );
  }

  /**
   * @stable [04.10.2018]
   */
  public show(): void {
    const props = this.props;
    this.setState({filter: UNDEF, opened: true}, () => props.useFilter && this.field.setFocus());

    if (!R.isNil(props.renderToX) || !R.isNil(props.renderToY)) {
      setAbsoluteOffsetByCoordinates(this.menuAnchorRef.current, props.renderToX, props.renderToY);
    }
  }

  /**
   * @stable [29.11.2018]
   */
  public hide(): void {
    this.setState({opened: false});
  }

  /**
   * @stable [29.11.2018]
   * @returns {boolean}
   */
  public isOpen(): boolean {
    return this.state.opened;
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

  private get listElement(): JSX.Element {
    const props = this.props;
    const optionValueFn = (option: IMenuItemEntity): string | number => (option.label ? this.t(option.label) : option.value);

    return (
      <SimpleList className={this.uiFactory.list}>
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
    );
  }
}
