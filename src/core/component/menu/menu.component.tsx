import * as React from 'react';
import * as R from 'ramda';

import {
  StringNumberT,
  UNDEF,
} from '../../definitions.interface';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  DelayedTask,
  isFilterUsed,
  isHighlightOdd,
  isMulti,
  isRemoteFilterApplied,
  queryFilter,
  subArray,
  TypeUtils,
} from '../../util';
import { GenericComponent } from '../base/generic.component';
import { BasicList } from '../list/basic/basic-list.component';
import { Dialog } from '../dialog/dialog.component';
import { ListItem } from '../list/item/list-item.component';
import {
  EventsEnum,
  IconsEnum,
  IMenu,
  IMenuProps,
  IMenuState,
  IPresetsMenuItemEntity,
  MenuClassesEnum,
  SyntheticEmitterEventsEnum,
} from '../../definition';
import { TextField } from '../field/text-field';
import { PerfectScrollPlugin } from '../plugin/perfect-scroll.plugin';
import { InlineOption } from '../inline-option/inline-option.component';
import { BasicComponent } from '../base/basic.component';

export class Menu extends GenericComponent<IMenuProps, IMenuState>
  implements IMenu {

  public static readonly defaultProps: IMenuProps = {
    delayTimeout: 1000,
    heightRestricted: true,
    filter: (query, entity) => queryFilter(query, entity.label || entity.value),
  };

  private readonly dialogRef = React.createRef<Dialog>();
  private readonly fieldRef = React.createRef<TextField>();
  private readonly listElementRef = React.createRef<HTMLUListElement>();
  /**/
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
    const {
      anchorElement,
      className,
      heightRestricted,
      inline,
      positionConfiguration,
      width,
    } = this.originalProps;
    const {
      opened,
    } = this.state;

    return ConditionUtils.orNull(
      opened,
      () => (
        <Dialog
          ref={this.dialogRef}
          closable={false}
          acceptable={false}
          default={false}
          scrollable={false}
          inline={inline}
          width={width}
          positionConfiguration={positionConfiguration}
          anchorElement={anchorElement}
          className={
            ClsUtils.joinClassName(
              MenuClassesEnum.MENU,
              CalcUtils.calc(className),
              heightRestricted && MenuClassesEnum.MENU_HEIGHT_RESTRICTED
            )
          }
          onActivate={this.onDialogActivate}
          onDeactivate={this.onDialogDeactivate}
        >
          {!this.isAnchored && (
            <React.Fragment>
              {this.closeActionElement}
              {this.inlineOptionsElement}
              {this.isFilterUsed && this.filterElement}
            </React.Fragment>
          )}
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

    this.filterQueryTask = null;
  }

  /**
   * @stable [31.01.2020]
   * @param {() => void} callback
   */
  public show(callback?: () => void): void {
    this.setState({filter: UNDEF, opened: true}, () => {
      if (TypeUtils.isFn(callback)) {
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
    if (TypeUtils.isFn(props.onFilterChange)) {
      props.onFilterChange(this.state.filter);
    }
  }

  /**
   * @stable [24.01.2020]
   * @param {string} filter
   */
  private onFilterValueChange(filter: string): void {
    this.setState(
      {filter}, () => ConditionUtils.ifNotNilThanValue(this.filterQueryTask, (task) => task.start())
    );
  }

  /**
   * @stable [23.11.2019]
   * @param {IPresetsMenuItemEntity} option
   */
  private onSelect(option: IPresetsMenuItemEntity): void {
    const props = this.props;
    if (TypeUtils.isFn(props.onSelect)) {
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
    ConditionUtils.ifNotNilThanValue(this.field, (field) => field.setFocus());
  }

  /**
   * @stable [25.01.2020]
   */
  private onDialogAfterRender(): void {
    ConditionUtils.ifNotNilThanValue(this.dialog, (dialog) => dialog.activate());

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
    if (TypeUtils.isFn(props.onClose)) {
      props.onClose();
    }
  }

  /**
   * @stable [24.01.2020]
   * @returns {JSX.Element}
   */
  private get listElement(): JSX.Element {
    const {
      NO_DATA,
    } = this.settings.messages;
    const {
      maxCount,
    } = this.originalProps;

    const items = subArray(this.items, maxCount);

    return (
      <BasicList
        forwardedRef={this.listElementRef}
        full={!this.isAnchored}
        plugins={PerfectScrollPlugin}
      >
        {items.map((option: IPresetsMenuItemEntity, index: number) => this.asItemElement(option, index, items.length))}
        {!items.length && (
          <div
            className={MenuClassesEnum.MENU_EMPTY_MESSAGE}
          >
            {NO_DATA}
          </div>
        )}
      </BasicList>
    );
  }

  /**
   * @stable [29.01.2020]
   * @param {IPresetsMenuItemEntity} option
   * @param {number} index
   * @param {number} length
   * @returns {JSX.Element}
   */
  private asItemElement(option: IPresetsMenuItemEntity, index: number, length: number): JSX.Element {
    const props = this.props;

    return (
      <ListItem
        key={`menu-item-key-${option.value}`}
        disabled={option.disabled}
        icon={option.icon}
        iconLeftAligned={option.iconLeftAligned}
        rawData={option}
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
   * @stable [08.07.2020]
   * @returns {JSX.Element}
   */
  private get inlineOptionsElement(): JSX.Element {
    const {
      inlineOptions,
      onInlineOptionClose,
    } = this.originalProps;

    return ConditionUtils.ifNotNilThanValue(
      inlineOptions,
      () => (
        <BasicComponent
          plugins={PerfectScrollPlugin}
          className={MenuClassesEnum.MENU_INLINE_OPTIONS}
        >
          {inlineOptions.map((option) => (
            <InlineOption
              key={`inline-option-key-${this.fieldConverter.fromSelectValueToId(option)}`}
              option={option}
              onClose={onInlineOptionClose}
            />
          ))}
        </BasicComponent>
      )
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
        placeholder={props.filterPlaceholder || this.settings.messages.SEARCH}
        errorMessageRendered={false}
        className={MenuClassesEnum.MENU_FILTER}
        onChange={this.onFilterValueChange}/>
    );
  }

  /**
   * @stable [07.07.2020]
   * @returns {JSX.Element}
   */
  private get closeActionElement(): JSX.Element {
    return (
      this.uiFactory.makeIcon({
        type: IconsEnum.TIMES,
        className: MenuClassesEnum.MENU_ICON_CLOSE,
        onClick: this.hide,
      })
    );
  }

  /**
   * @stable [04.05.2020]
   * @param {HTMLElement} element
   * @returns {boolean}
   */
  private scrollEventCallbackCondition(element: HTMLElement): boolean {
    return element !== this.listElementRef.current;
  }

  /**
   * @stable [24.01.2020]
   */
  private clearAll(): void {
    this.unsubscribeAllEvents();

    ConditionUtils.ifNotNilThanValue(this.filterQueryTask, (task) => task.stop());
  }

  /**
   * @stable [23.11.2019]
   */
  private unsubscribeAllEvents(): void {
    if (TypeUtils.isFn(this.scrollEventUnsubscriber)) {
      this.scrollEventUnsubscriber();
      this.scrollEventUnsubscriber = null;
    }
    if (TypeUtils.isFn(this.resizeUnsubscriber)) {
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
   * @returns {IPresetsMenuItemEntity[]}
   */
  private get items(): IPresetsMenuItemEntity[] {
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
   * @param {IPresetsMenuItemEntity} itm
   * @returns {StringNumberT}
   */
  private readonly optionValueFn =
    (itm: IPresetsMenuItemEntity): StringNumberT => (itm.label ? this.t(itm.label) : itm.value)
}
