import * as React from 'react';
import * as R from 'ramda';

import {
  AnyT,
  StringNumberT,
  UNDEF,
} from '../../definitions.interface';
import {
  calc,
  DelayedTask,
  ifNotNilThanValue,
  inProgress,
  isCenteredMenu,
  isFilterUsed,
  isFn,
  isMulti,
  isRemoteFilterApplied,
  joinClassName,
  nvl,
  queryFilter,
  subArray,
} from '../../util';
import { BaseComponent } from '../base/base.component';
import { Dialog } from '../dialog';
import {
  EventsEnum,
  IMenu,
  IMenuItemEntity,
  IMenuProps,
  IMenuState,
  SyntheticEventsEnum,
} from '../../definition';
import {
  IField,
  TextField,
} from '../field';
import {
  ListItem,
  SimpleList,
} from '../list';
import { PerfectScrollPlugin } from '../plugin';

export class Menu extends BaseComponent<IMenuProps, IMenuState>
    implements IMenu {

  public static readonly defaultProps: IMenuProps = {
    filter: (query, entity) => queryFilter(query, entity.label || entity.value),
  };

  private readonly dialogRef = React.createRef<Dialog<AnyT>>();
  private readonly fieldRef = React.createRef<TextField>();
  private readonly menuAnchorRef = React.createRef<HTMLDivElement>();
  private readonly filterQueryTask: DelayedTask;
  private syntheticScrollEventUnsubscriber: () => void;
  private resizeUnsubscriber: () => void;

  /**
   * @stable [31.07.2018]
   * @param {IMenuProps} props
   */
  constructor(props: IMenuProps) {
    super(props);

    if (this.canInitPerfectScrollPlugin) {
      this.registerPlugin(PerfectScrollPlugin);
    }

    this.getItemElement = this.getItemElement.bind(this);
    this.hide = this.hide.bind(this);
    this.onDialogActivate = this.onDialogActivate.bind(this);
    this.onDialogDeactivate = this.onDialogDeactivate.bind(this);
    this.onFilterValueChange = this.onFilterValueChange.bind(this);
    this.onSelect = this.onSelect.bind(this);

    this.state = {opened: false};
    this.filterQueryTask = new DelayedTask(this.onFilterValueDelayedChange.bind(this), 500);
  }

  /**
   * @stable [18.06.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const filterElement = this.filterElement;

    if (this.centeredMenu) {
      return (
        this.state.opened && (
          <Dialog
            ref={this.dialogRef}
            className='rac-menu-dialog'
            closable={false}
            acceptable={false}
            onActivate={this.onDialogActivate}
            onDeactivate={this.onDialogDeactivate}
          >
            {this.closeActionElement}
            {filterElement}
            {this.getListElement(true)}
          </Dialog>
        )
      );
    }

    return (
      <div
        ref={this.menuAnchorRef}
        className={this.uiFactory.menuAnchor}
      >
        <div
          ref={this.selfRef}
          style={{...!this.centeredMenu && {width: calc(props.width)}}}
          className={joinClassName('rac-menu', props.className, this.uiFactory.menu, this.uiFactory.menuSurface)}>
          {filterElement}
          {this.getListElement()}
        </div>
      </div>
    );
  }

  /**
   * @stable [18.06.2019]
   */
  public componentWillUnmount() {
    this.unsubscribeAllCaptureEvents();
    this.filterQueryTask.stop();

    super.componentWillUnmount();
  }

  /**
   * @stable [17.06.2019]
   * @returns {boolean}
   */
  public get centeredMenu(): boolean {
    return isCenteredMenu(this.props);
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
      if (!this.centeredMenu) {
        this.unsubscribeAllCaptureEvents();
        this.syntheticScrollEventUnsubscriber = this.domAccessor.captureEventWithinElement({
          autoUnsubscribe: true,
          callback: this.hide,
          element: this.selfRef.current,
          eventName: SyntheticEventsEnum.SCROLL,  // We do not have info about scrollable parent (body, etc, ...)
        });
        this.resizeUnsubscriber = this.domAccessor.captureEvent({
          autoUnsubscribe: true,
          callback: this.hide,
          eventName: EventsEnum.RESIZE,
        });
      }
    });

    ifNotNilThanValue(
      nvl(props.xPosition, props.yPosition),
      () => {
        const el = this.menuAnchorRef.current;
        this.domAccessor.addClassNames(el, 'rac-absolute');
        this.domAccessor.applyPosition(el, 'left', props.xPosition);
        this.domAccessor.applyPosition(el, 'top', props.yPosition);
      }
    );
  }

  /**
   * @stable [18.06.2019]
   */
  public hide(): void {
    const props = this.props;
    this.setState({opened: false}, () => {
      if (isFn(props.onClose)) {
        props.onClose();
      }
    });
  }

  /**
   * @stable [29.11.2018]
   * @returns {boolean}
   */
  public isOpen(): boolean {
    return this.state.opened;
  }

  /**
   * @stable [15.01.2020]
   * @returns {boolean}
   */
  protected get isWaitingForData(): boolean {
    return inProgress(this.props);
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
   * @stable [23.11.2019]
   * @param {string} filter
   */
  private onFilterValueChange(filter: string): void {
    this.setState({filter});
    this.filterQueryTask.start();
  }

  /**
   * @stable [23.11.2019]
   */
  private onFilterValueDelayedChange(): void {
    const props = this.props;
    if (isFn(props.onFilterChange)) {
      props.onFilterChange(this.state.filter);
    }
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
   * @stable [06.01.2020]
   */
  private onDialogActivate(): void {
    if (this.isFilterUsed) {
      this.field.setFocus();
    }
  }

  /**
   * @stable [23.11.2019]
   */
  private unsubscribeAllCaptureEvents(): void {
    if (isFn(this.syntheticScrollEventUnsubscriber)) {
      this.syntheticScrollEventUnsubscriber();
      this.syntheticScrollEventUnsubscriber = null;
    }
    if (isFn(this.resizeUnsubscriber)) {
      this.resizeUnsubscriber();
      this.resizeUnsubscriber = null;
    }
  }

  /**
   * @stable [06.12.2019]
   * @param {boolean} addPerfectScroll
   * @returns {JSX.Element}
   */
  private getListElement(addPerfectScroll = false): JSX.Element {
    return (
      <SimpleList
        plugins={[
          ...(addPerfectScroll ? [PerfectScrollPlugin] : [])
        ]}
        className={this.uiFactory.list}>
        {subArray(this.items, this.props.maxCount).map(this.getItemElement)}
      </SimpleList>
    );
  }

  /**
   * @stable [23.09.2019]
   * @param {IMenuItemEntity} option
   * @returns {JSX.Element}
   */
  private getItemElement(option: IMenuItemEntity): JSX.Element {
    const props = this.props;
    return (
      <ListItem
        key={`menu-item-key-${option.value}`}
        disabled={option.disabled}
        icon={option.icon}
        rawData={option}
        renderer={props.renderer}
        tpl={props.tpl}
        onClick={this.onSelect}>
        {this.optionValueFn(option)}
      </ListItem>
    );
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
        visible={this.isFilterUsed}  /* MDC focus trap */
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
        className: 'rac-menu-dialog-icon-close',
        onClick: this.hide,
      })
    );
  }

  /**
   * @stable [23.11.2019]
   * @returns {boolean}
   */
  private get isFilterUsed(): boolean {
    return isFilterUsed(this.props);
  }

  /**
   * @stable [17.05.2019]
   * @returns {boolean}
   */
  private get doesDialogExist(): boolean {
    return !R.isNil(this.dialog);
  }

  /**
   * @stable [07.06.2018]
   * @returns {IField}
   */
  private get field(): IField {
    return this.fieldRef.current;
  }

  /**
   * @stable [17.06.2019]
   * @returns {Dialog<AnyT>}
   */
  private get dialog(): Dialog<AnyT> {
    return this.dialogRef.current;
  }

  /**
   * @stable [20.12.2019]
   * @returns {boolean}
   */
  private get canInitPerfectScrollPlugin(): boolean {
    return !this.centeredMenu;
  }

  /**
   * @stable [17.06.2019]
   * @param {IMenuItemEntity} itm
   * @returns {StringNumberT}
   */
  private readonly optionValueFn =
    (itm: IMenuItemEntity): StringNumberT => (itm.label ? this.t(itm.label) : itm.value)
}
