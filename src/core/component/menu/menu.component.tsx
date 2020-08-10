import * as React from 'react';
import * as R from 'ramda';

import {
  UNDEF,
} from '../../definitions.interface';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  DelayedTask,
  FilterUtils,
  isHighlightOdd,
  ObjectUtils,
  subArray,
  TypeUtils,
} from '../../util';
import {
  EventsEnum,
  IconsEnum,
  IMenuProps,
  IMenuState,
  IPresetsMenuItemEntity,
  MenuClassesEnum,
  SyntheticEmitterEventsEnum,
} from '../../definition';
import { BasicComponent } from '../base/basic.component';
import { BasicList } from '../list/basic/basic-list.component';
import { Button } from '../button/button.component';
import { Dialog } from '../dialog/dialog.component';
import { GenericComponent } from '../base/generic.component';
import { InlineOption } from '../inline-option/inline-option.component';
import { ListItem } from '../list/item/list-item.component';
import { PerfectScrollPlugin } from '../plugin/perfect-scroll.plugin';
import { TextField } from '../field/text-field';

export class Menu extends GenericComponent<IMenuProps, IMenuState> {

  public static readonly defaultProps: IMenuProps = {
    delayTimeout: 1000,
    filter: (query, entity) => FilterUtils.queryFilter(query, entity.label || entity.value),
    heightRestricted: true,
  };

  private readonly dialogRef = React.createRef<Dialog>();
  private readonly fieldRef = React.createRef<TextField>();
  private readonly listElementRef = React.createRef<HTMLUListElement>();
  /**/
  private filterQueryTask: DelayedTask;
  private scrollEventUnsubscriber: () => void;
  private resizeUnsubscriber: () => void;

  /**
   * @stable [08.08.2020]
   * @param originalProps
   */
  constructor(originalProps: IMenuProps) {
    super(originalProps);

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
      this.filterQueryTask = new DelayedTask(this.notifyFilterChange.bind(this), originalProps.delayTimeout);
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
          {!this.isAnchored && this.applyActionsElement}
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
   * @stable [09.08.2020]
   */
  public hide(): void {
    this.clearAll();

    this.setState({opened: false}, this.onDialogAfterDestroy);
  }

  /**
   * @stable [08.08.2020]
   */
  public isOpen(): boolean {
    return this.state.opened;
  }

  /**
   * @stable [07.08.2020]
   * @private
   */
  private notifyFilterChange(): void {
    const {
      onFilterChange,
    } = this.originalProps;

    if (TypeUtils.isFn(onFilterChange)) {
      onFilterChange(this.state.filter);
    }
  }

  /**
   * @stable [08.08.2020]
   * @param filter
   * @private
   */
  private onFilterValueChange(filter: string): void {
    this.setState(
      {filter}, () => ConditionUtils.ifNotNilThanValue(this.filterQueryTask, (task) => task.start())
    );
  }

  /**
   * @stable [09.08.2020]
   * @param option
   * @private
   */
  private onSelect(option: IPresetsMenuItemEntity): void {
    const originalProps = this.originalProps;
    const {
      multi,
      onSelect,
    } = originalProps;

    if (TypeUtils.isFn(onSelect)) {
      onSelect(option);
    }

    if (multi && this.items.length > 1) {
      // Because a "Flux Cycle", to prevent empty list after updating
      return;
    }
    this.hide();
  }

  /**
   * @stable [09.08.2020]
   * @private
   */
  private onDialogActivate(): void {
    ConditionUtils.ifNotNilThanValue(this.field, (field) => field.setFocus());
  }

  /**
   * @stable [08.08.2020]
   * @private
   */
  private onDialogDeactivate(): void {
    this.setState({opened: false});
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
    const {
      renderer,
      tpl,
    } = this.originalProps;
    const {
      disabled,
      icon,
      iconLeftAligned,
      value,
    } = option;

    return (
      <ListItem
        key={`menu-item-key-${value}`}
        disabled={disabled}
        icon={icon}
        iconLeftAligned={iconLeftAligned}
        last={index === length - 1}
        odd={isHighlightOdd(this.originalProps, index)}
        rawData={option}
        renderer={renderer}
        tpl={tpl}
        onClick={this.onSelect}
      >
        {this.fieldConverter.fromSelectValueToDisplayValue(option)}
      </ListItem>
    );
  }

  /**
   * @stable [09.08.2020]
   * @private
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
   * @stable [09.08.2020]
   * @private
   */
  private get applyActionsElement(): JSX.Element {
    const {
      inlineOptions,
      multi,
    } = this.originalProps;

    return ConditionUtils.orNull(
      multi,
      () => (
        <Button
          raised={true}
          disabled={!ObjectUtils.isObjectNotEmpty(inlineOptions)}
          icon={IconsEnum.CHECK_CIRCLE}
          text={this.settings.messages.APPLY}
          className={MenuClassesEnum.MENU_APPLY_ACTION}
          onClick={this.hide}/>
      )
    );
  }

  /**
   * @stable [09.08.2020]
   * @private
   */
  private get filterElement(): JSX.Element {
    const {
      filterPlaceholder,
    } = this.originalProps;
    const {filter} = this.state;

    return (
      <TextField
        ref={this.fieldRef}
        value={filter}
        errorMessageRendered={false}
        full={false}
        className={MenuClassesEnum.MENU_FILTER}
        placeholder={filterPlaceholder || this.settings.messages.SEARCH}
        onChange={this.onFilterValueChange}/>
    );
  }

  /**
   * @stable [08.08.2020]
   * @private
   */
  private get closeActionElement(): JSX.Element {
    return this.uiFactory.makeIcon({
      type: IconsEnum.TIMES,
      className: MenuClassesEnum.MENU_ICON_CLOSE,
      onClick: this.hide,
    });
  }

  /**
   * @stable [08.08.2020]
   * @param element
   * @private
   */
  private scrollEventCallbackCondition(element: HTMLElement): boolean {
    return element !== this.listElementRef.current;
  }

  /**
   * @stable [08.08.2020]
   */
  private clearAll(): void {
    this.unsubscribeAllEvents();

    ConditionUtils.ifNotNilThanValue(this.filterQueryTask, (task) => task.stop());
  }

  /**
   * @stable [08.08.2020]
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
   * @stable [09.08.2020]
   * @private
   */
  private get items(): IPresetsMenuItemEntity[] {
    const {
      filter,
      options,
    } = this.originalProps;
    const query = this.state.filter;

    return this.isFilterUsed && TypeUtils.isFn(filter)
      ? options.filter((option) => filter(query, option))
      : options;
  }

  /**
   * @stable [08.08.2020]
   * @private
   */
  private get isFilterUsed(): boolean {
    return this.originalProps.useFilter;
  }

  /**
   * @stable [08.08.2020]
   * @private
   */
  private get isAnchored(): boolean {
    return !R.isNil(this.originalProps.anchorElement);
  }

  /**
   * @stable [08.08.2020]
   * @private
   */
  private get field(): TextField {
    return this.fieldRef.current;
  }

  /**
   * @stable [08.08.2020]
   * @private
   */
  private get dialog(): Dialog {
    return this.dialogRef.current;
  }
}
