import * as React from 'react';
import * as R from 'ramda';

import { IMenuItemEntity } from '../../entities-definitions.interface';
import { UNDEF, StringNumberT, AnyT } from '../../definitions.interface';
import {
  calc,
  cancelEvent,
  DelayedTask,
  ifNotTrueThanValue,
  isFn,
  nvl,
  queryFilter,
  setAbsoluteOffsetByCoordinates,
  subArray,
  toClassName,
} from '../../util';
import { BaseComponent } from '../base';
import { Dialog } from '../dialog';
import { FlexLayout } from '../layout';
import { IBasicEvent } from '../../react-definitions.interface';
import { IField, TextField } from '../field';
import { IMenuState, IMenuProps, IMenu } from './menu.interface';
import { SimpleList } from '../list';

export class Menu extends BaseComponent<IMenuProps, IMenuState>
    implements IMenu {

  public static defaultProps: IMenuProps = {
    filter: (query, entity) => queryFilter(query, entity.label || entity.value),
  };

  private readonly dialogRef = React.createRef<Dialog<AnyT>>();
  private readonly fieldRef = React.createRef<TextField>();
  private readonly menuAnchorRef = React.createRef<HTMLDivElement>();
  private readonly filterQueryTask: DelayedTask;

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
    this.onDialogDeactivate = this.onDialogDeactivate.bind(this);

    this.state = {opened: false};

    this.filterQueryTask = new DelayedTask(this.onFilterChange.bind(this), 500);
  }

  /**
   * @stable [18.06.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const filterElement = this.filterElement;

    if (props.centeredMenu) {
      return (
        this.state.opened && (
          <Dialog
            ref={this.dialogRef}
            className='rac-menu-dialog'
            closable={false}
            acceptable={false}
            onDeactivate={this.onDialogDeactivate}
          >
            {this.closeActionElement}
            {filterElement}
            {this.listElement}
          </Dialog>
        )
      );
    }

    return (
      <div
        ref={this.menuAnchorRef}
        className={this.uiFactory.menuAnchor}>
        <div
          ref={this.selfRef}
          style={{...!props.centeredMenu && {width: calc(props.width)}}}
          className={toClassName(
            'rac-menu',
            props.className,
            this.uiFactory.menu,
            this.uiFactory.menuSurface)
          }>
          {filterElement}
          {this.listElement}
        </div>
      </div>
    );
  }

  /**
   * @stable [18.06.2019]
   */
  public componentWillUnmount() {
    super.componentWillUnmount();
    this.filterQueryTask.stop();
  }

  /**
   * @stable [17.06.2019]
   * @returns {boolean}
   */
  public get centeredMenu(): boolean {
    return this.props.centeredMenu;
  }

  /**
   * @stable [04.10.2018]
   */
  public show(): void {
    const props = this.props;
    this.setState({filter: UNDEF, opened: true}, () => {
      if (this.doesDialogExist) {
        this.dialog.activate();
      }
      if (props.useFilter) {
        this.field.setFocus();
      }
    });

    if (!R.isNil(nvl(props.renderToX, props.renderToY))) {
      setAbsoluteOffsetByCoordinates(this.menuAnchorRef.current, props.renderToX, props.renderToY);
    }
  }

  /**
   * @stable [18.06.2019]
   */
  public hide(): void {
    const props = this.props;
    this.setState({opened: false});

    if (isFn(props.onClose)) {
      props.onClose();
    }
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

    return props.useFilter && props.remoteFilter !== true
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
    this.filterQueryTask.start();
  }

  /**
   * @stable [17.06.2019]
   */
  private onFilterChange(): void {
    const props = this.props;
    const state = this.state;

    if (isFn(props.onFilterChange)) {
      props.onFilterChange(state.filter);
    }
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

  /**
   * @stable [17.06.2019]
   */
  private onDialogDeactivate(): void {
    this.setState({opened: false});
  }

  /**
   * @stable [11.12.2018]
   * @returns {JSX.Element}
   */
  private get listElement(): JSX.Element {
    const props = this.props;
    const menuItems = this.menuItems;

    return (
      <SimpleList className={this.uiFactory.list}>
        {
          subArray(menuItems, props.maxCount).map((option): JSX.Element => (
            <li
              key={`menu-item-key-${option.value}`}
              className='rac-list-item rac-flex'
              aria-disabled={option.disabled === true}
              onClick={ifNotTrueThanValue(option.disabled, () => (event) => this.onSelect(event, option))}
            >
              {this.getMenuItemElement(option)}
            </li>
          ))
        }
      </SimpleList>
    );
  }

  /**
   * @stable [17.06.2019]
   * @param {IMenuItemEntity} option
   * @returns {JSX.Element}
   */
  private getMenuItemElement(option: IMenuItemEntity): JSX.Element {
    const props = this.props;

    return (
      <FlexLayout
        justifyContentCenter={true}
        className='rac-menu-item'
      >
        {
          isFn(props.renderer)
            ? props.renderer(option)
            : (
              option.icon
                ? (
                  <FlexLayout
                    row={true}
                    alignItemsCenter={true}
                  >
                    {this.uiFactory.makeIcon({
                      key: `menu-item-icon-key-${option.value}`,
                      type: option.icon,
                      className: 'rac-menu-item-icon',
                    })}
                    {this.optionValueFn(option)}
                  </FlexLayout>
                )
                : isFn(props.tpl) ? props.tpl(option) : this.optionValueFn(option)
            )
        }
      </FlexLayout>
    );
  }

  /**
   * @stable [17.06.2019]
   * @returns {Dialog<AnyT>}
   */
  private get dialog(): Dialog<AnyT> {
    return this.dialogRef.current;
  }

  /**
   * @stable [07.06.2018]
   * @returns {IField}
   */
  private get field(): IField {
    return this.fieldRef.current;
  }

  /**
   * @stable [17.05.2019]
   * @returns {boolean}
   */
  private get doesDialogExist(): boolean {
    return !R.isNil(this.dialog);
  }

  /**
   * @stable [17.06.2019]
   * @returns {JSX.Element}
   */
  private get filterElement(): JSX.Element {
    const props = this.props;
    const state = this.state;
    return (
      <TextField
        ref={this.fieldRef}
        full={false}
        value={state.filter}
        visible={!!props.useFilter}  /* MDC focus trap */
        placeholder={props.filterPlaceholder || this.settings.messages.filterPlaceholderMessage}
        errorMessageRendered={false}
        onChange={this.onInputChange}/>
    );
  }

  /**
   * @stable [06.07.2019]
   * @returns {JSX.Element}
   */
  private get closeActionElement(): JSX.Element {
    return (
      <FlexLayout
        full={false}
        alignItemsEnd={true}
        noShrink={true}>
        {
          this.uiFactory.makeIcon({
            key: 'menu-close-action-key',
            type: 'close',
            className: 'rac-menu-icon-close',
            onClick: this.onCloseAction,
          })
        }
      </FlexLayout>
    );
  }

  /**
   * @stable [17.06.2019]
   * @param {IMenuItemEntity} itm
   * @returns {StringNumberT}
   */
  private readonly optionValueFn =
    (itm: IMenuItemEntity): StringNumberT => (itm.label ? this.t(itm.label) : itm.value)
}
