import * as React from 'react';
import * as R from 'ramda';

import {
  StringNumberT,
  UNDEF,
} from '../../definitions.interface';
import {
  calc,
  DelayedTask,
  ifNotNilThanValue,
  isFilterUsed,
  isFn,
  isHeightRestricted,
  isHighlightOdd,
  isMulti,
  isRemoteFilterApplied,
  joinClassName,
  orNull,
  queryFilter,
  subArray,
} from '../../util';
import { BaseComponent } from '../base/base.component';
import { BasicList } from '../list/basic/basic-list.component';
import { Dialog } from '../dialog/dialog.component';
import { ListItem } from '../list/item/list-item.component';
import {
  DialogClassesEnum,
  EventsEnum,
  IMenu,
  IMenuItemEntity,
  IMenuProps,
  IMenuState,
  SyntheticEmitterEventsEnum,
} from '../../definition';
import { TextField } from '../field/text-field';
import { PerfectScrollPlugin } from '../plugin/perfect-scroll.plugin';

export class Menu extends BaseComponent<IMenuProps, IMenuState>
    implements IMenu {

  public static readonly defaultProps: IMenuProps = {
    delayTimeout: 1000,
    filter: (query, entity) => queryFilter(query, entity.label || entity.value),
  };

  private readonly dialogRef = React.createRef<Dialog>();
  private readonly listRef = React.createRef<BasicList>();
  private readonly fieldRef = React.createRef<TextField>();
  private filterQueryTask: DelayedTask;
  private scrollEventUnsubscriber: () => void;
  private resizeUnsubscriber: () => void;

  /**
   * @stable [24.01.2020]
   * @param {IMenuProps} props
   */
  constructor(props: IMenuProps) {
    super(props);

    this.hide = this.hide.bind(this);
    this.onDialogActivate = this.onDialogActivate.bind(this);
    this.onDialogAfterDestroy = this.onDialogAfterDestroy.bind(this);
    this.onDialogAfterRender = this.onDialogAfterRender.bind(this);
    this.onDialogDeactivate = this.onDialogDeactivate.bind(this);
    this.onFilterValueChange = this.onFilterValueChange.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.scrollEventCallbackCondition = this.scrollEventCallbackCondition.bind(this);

    this.state = {opened: false};

    if (this.isFilterUsed) {
      this.filterQueryTask = new DelayedTask(this.notifyFilterChange.bind(this), props.delayTimeout);
    }
  }

  /**
   * @stable [24.01.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      orNull(
        this.state.opened,
        () => (
          <Dialog
            ref={this.dialogRef}
            closable={false}
            acceptable={false}
            default={false}
            scrollable={false}
            inline={props.inline}
            width={props.width}
            positionConfiguration={props.positionConfiguration}
            anchorElement={props.anchorElement}
            className={
              joinClassName(
                DialogClassesEnum.MENU_DIALOG,
                calc(props.className),
                isHeightRestricted(props) && 'rac-menu-height-restricted-dialog'
              )
            }
            onActivate={this.onDialogActivate}
            onDeactivate={this.onDialogDeactivate}
          >
            {!this.isAnchored && (
              <React.Fragment>
                {this.closeActionElement}
                {this.isFilterUsed && this.filterElement}
              </React.Fragment>
            )}
            {this.listElement}
          </Dialog>
        )
      )
    );
  }

  /**
   * @stable [18.06.2019]
   */
  public componentWillUnmount() {
    this.clearAll();
    super.componentWillUnmount();

    this.filterQueryTask = null;
  }

  /**
   * @stable [31.01.2020]
   * @param {() => void} callback
   */
  public show(callback?: () => void): void {
    this.setState({filter: UNDEF, opened: true}, () => {
      if (isFn(callback)) {
        callback();
      }
      this.onDialogAfterRender();
    });
  }

  /**
   * @stable [18.06.2019]
   */
  public hide(): void {
    this.clearAll();

    this.setState({opened: false}, this.onDialogAfterDestroy);
  }

  /**
   * @stable [29.11.2018]
   * @returns {boolean}
   */
  public isOpen(): boolean {
    return this.state.opened;
  }

  /**
   * @stable [23.11.2019]
   */
  private notifyFilterChange(): void {
    const props = this.props;
    if (isFn(props.onFilterChange)) {
      props.onFilterChange(this.state.filter);
    }
  }

  /**
   * @stable [24.01.2020]
   * @param {string} filter
   */
  private onFilterValueChange(filter: string): void {
    this.setState(
      {filter}, () => ifNotNilThanValue(this.filterQueryTask, (task) => task.start())
    );
  }

  /**
   * @stable [23.11.2019]
   * @param {IMenuItemEntity} option
   */
  private onSelect(option: IMenuItemEntity): void {
    const props = this.props;
    if (isFn(props.onSelect)) {
      props.onSelect(option);
    }

    if (isMulti(props) && this.items.length > 1) {
      // Because a "Flux Cycle", to prevent empty list after updating
      return;
    }
    this.hide();
  }

  /**
   * @stable [06.01.2020]
   */
  private onDialogDeactivate(): void {
    this.setState({opened: false});
  }

  /**
   * @stable [25.01.2020]
   */
  private onDialogActivate(): void {
    ifNotNilThanValue(this.field, (field) => field.setFocus());
  }

  /**
   * @stable [25.01.2020]
   */
  private onDialogAfterRender(): void {
    ifNotNilThanValue(this.dialog, (dialog) => dialog.activate());

    if (this.isAnchored) {
      this.clearAll();

      this.scrollEventUnsubscriber = this.eventEmitter.subscribe({
        autoUnsubscribing: true,
        callback: this.hide,
        condition: this.scrollEventCallbackCondition,
        eventName: SyntheticEmitterEventsEnum.SCROLL,
      });
      this.resizeUnsubscriber = this.domAccessor.captureEvent({
        autoUnsubscribing: true,
        callback: this.hide,
        eventName: EventsEnum.RESIZE,
      });
    }
  }

  /**
   * @stable [25.01.2020]
   */
  private onDialogAfterDestroy(): void {
    const props = this.props;
    if (isFn(props.onClose)) {
      props.onClose();
    }
  }

  /**
   * @stable [24.01.2020]
   * @returns {JSX.Element}
   */
  private get listElement(): JSX.Element {
    const items = subArray(this.items, this.props.maxCount);
    return (
      <BasicList
        ref={this.listRef}
        default={false}
        plugins={[PerfectScrollPlugin]}
      >
        {items.map((option: IMenuItemEntity, index: number) => this.asItemElement(option, index, items.length))}
        {!items.length && <div className='rac-menu__empty-message'>{this.settings.messages.NO_DATA}</div>}
      </BasicList>
    );
  }

  /**
   * @stable [29.01.2020]
   * @param {IMenuItemEntity} option
   * @param {number} index
   * @param {number} length
   * @returns {JSX.Element}
   */
  private asItemElement(option: IMenuItemEntity, index: number, length: number): JSX.Element {
    const props = this.props;
    return (
      <ListItem
        key={`menu-item-key-${option.value}`}
        disabled={option.disabled}
        icon={option.icon}
        iconLeftAligned={option.iconLeftAligned}
        rawData={option}
        hovered={true}
        odd={isHighlightOdd(props, index)}
        last={index === length - 1}
        renderer={props.renderer}
        tpl={props.tpl}
        onClick={this.onSelect}
      >
        {this.optionValueFn(option)}
      </ListItem>
    );
  }

  /**
   * @stable [17.01.2020]
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
        placeholder={props.filterPlaceholder || this.settings.messages.FILTER_PLACEHOLDER}
        errorMessageRendered={false}
        onChange={this.onFilterValueChange}/>
    );
  }

  /**
   * @stable [06.07.2019]
   * @returns {JSX.Element}
   */
  private get closeActionElement(): JSX.Element {
    return (
      this.uiFactory.makeIcon({
        key: 'menu-close-action-key',
        type: 'close',
        className: 'rac-menu-dialog__icon-close',
        onClick: this.hide,
      })
    );
  }

  /**
   * @stable [17.01.2020]
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  private scrollEventCallbackCondition(element: HTMLElement): boolean {
    const list = this.listRef.current;
    return R.isNil(list) || element !== list.getSelf();
  }

  /**
   * @stable [24.01.2020]
   */
  private clearAll(): void {
    this.unsubscribeAllEvents();

    ifNotNilThanValue(this.filterQueryTask, (task) => task.stop());
  }

  /**
   * @stable [23.11.2019]
   */
  private unsubscribeAllEvents(): void {
    if (isFn(this.scrollEventUnsubscriber)) {
      this.scrollEventUnsubscriber();
      this.scrollEventUnsubscriber = null;
    }
    if (isFn(this.resizeUnsubscriber)) {
      this.resizeUnsubscriber();
      this.resizeUnsubscriber = null;
    }
  }

  /**
   * @stable [24.01.2020]
   * @returns {boolean}
   */
  private get isAnchored(): boolean {
    return !R.isNil(this.props.anchorElement);
  }

  /**
   * @stable [23.11.2019]
   * @returns {boolean}
   */
  private get isFilterUsed(): boolean {
    return isFilterUsed(this.props);
  }

  /**
   * @stable [23.11.2019]
   * @returns {IMenuItemEntity[]}
   */
  private get items(): IMenuItemEntity[] {
    const props = this.props;

    return !this.isFilterUsed || isRemoteFilterApplied(props)
      ? props.options
      : props.options.filter((option) => props.filter(this.state.filter, option));
  }

  /**
   * @stable [07.06.2018]
   * @returns {TextField}
   */
  private get field(): TextField {
    return this.fieldRef.current;
  }

  /**
   * @stable [17.06.2019]
   * @returns {Dialog}
   */
  private get dialog(): Dialog {
    return this.dialogRef.current;
  }

  /**
   * @stable [17.06.2019]
   * @param {IMenuItemEntity} itm
   * @returns {StringNumberT}
   */
  private readonly optionValueFn =
    (itm: IMenuItemEntity): StringNumberT => (itm.label ? this.t(itm.label) : itm.value)
}
