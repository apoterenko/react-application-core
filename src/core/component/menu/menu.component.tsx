import * as React from 'react';
import * as R from 'ramda';

import {
  StringNumberT,
  UNDEF,
} from '../../definitions.interface';
import {
  DelayedTask,
  ifNotNilThanValue,
  inProgress,
  isFilterUsed,
  isFn,
  isHighlightOdd,
  isMulti,
  isRemoteFilterApplied,
  orNull,
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
  SyntheticEmitterEventsEnum,
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
    delayTimeout: 1000,
    filter: (query, entity) => queryFilter(query, entity.label || entity.value),
  };

  private readonly dialogRef = React.createRef<Dialog>();
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

    this.getItemElement = this.getItemElement.bind(this);
    this.hide = this.hide.bind(this);
    this.onDialogActivate = this.onDialogActivate.bind(this);
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
      this.state.opened && (
        <Dialog
          ref={this.dialogRef}
          closable={false}
          acceptable={false}
          width={props.width}
          positionConfiguration={props.positionConfiguration}
          anchorElement={props.anchorElement}
          className='rac-menu-dialog'
          onActivate={this.onDialogActivate}
          onDeactivate={this.onDialogDeactivate}
        >
          {!this.isAnchored && this.closeActionElement}
          {this.filterElement}
          {this.listElement}
        </Dialog>
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
   * @stable [24.01.2020]
   */
  public show(): void {
    this.setState({filter: UNDEF, opened: true}, () => {
      if (this.doesDialogExist) {
        this.dialog.activate();
      }
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
    });
  }

  /**
   * @stable [18.06.2019]
   */
  public hide(): void {
    this.clearAll();

    this.setState({opened: false}, () => {
      const props = this.props;
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
   */
  private notifyFilterChange(): void {
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
   * @returns {JSX.Element}
   */
  private get listElement(): JSX.Element {
    return (
      <SimpleList
        plugins={[PerfectScrollPlugin]}
        className={this.uiFactory.list}
      >
        {subArray(this.items, this.props.maxCount).map(this.getItemElement)}
      </SimpleList>
    );
  }

  /**
   * @stable [17.01.2020]
   * @param {IMenuItemEntity} option
   * @param {number} index
   * @returns {JSX.Element}
   */
  private getItemElement(option: IMenuItemEntity, index: number): JSX.Element {
    const props = this.props;
    return (
      <ListItem
        key={`menu-item-key-${option.value}`}
        disabled={option.disabled}
        icon={option.icon}
        rawData={option}
        odd={isHighlightOdd(props, index)}
        renderer={props.renderer}
        tpl={props.tpl}
        onClick={this.onSelect}>
        {this.optionValueFn(option)}
      </ListItem>
    );
  }

  /**
   * @stable [24.01.2020]
   */
  private clearAll(): void {
    this.unsubscribeAllEvents();

    ifNotNilThanValue(this.filterQueryTask, (task) => task.stop());
  }

  /**
   * @stable [17.01.2020]
   * @returns {JSX.Element}
   */
  private get filterElement(): JSX.Element {
    const props = this.props;
    const state = this.state;

    return orNull(
      this.isFilterUsed,
      () => (
        <TextField
          ref={this.fieldRef}
          full={false}
          value={state.filter}
          placeholder={props.filterPlaceholder || this.settings.messages.FILTER_PLACEHOLDER}
          errorMessageRendered={false}
          onChange={this.onFilterValueChange}/>
      )
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
   * @returns {Dialog}
   */
  private get dialog(): Dialog {
    return this.dialogRef.current;
  }

  /**
   * @stable [17.01.2020]
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  private scrollEventCallbackCondition(element: HTMLElement): boolean {
    return element !== this.selfRef.current;
  }

  /**
   * @stable [24.01.2020]
   * @returns {boolean}
   */
  private get isAnchored(): boolean {
    return !R.isNil(this.props.anchorElement);
  }

  /**
   * @stable [17.06.2019]
   * @param {IMenuItemEntity} itm
   * @returns {StringNumberT}
   */
  private readonly optionValueFn =
    (itm: IMenuItemEntity): StringNumberT => (itm.label ? this.t(itm.label) : itm.value)
}
