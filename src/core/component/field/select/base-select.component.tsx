import * as React from 'react';
import * as R from 'ramda';
import {
  LoggerFactory,
  ILogger,
} from 'ts-smart-logger';

import {
  CalcUtils,
  CloneUtils,
  ClsUtils,
  ConditionUtils,
  DelayedTask,
  FilterUtils,
  NvlUtils,
  ObjectUtils,
  PropsUtils,
  TypeUtils,
  WrapperUtils,
} from '../../../util';
import { BaseTextField } from '../text-field/base-text-field.component';
import { Menu } from '../../menu/menu.component';
import { InlineOption } from '../../inline-option';
import {
  AnyT,
  EntityIdT,
  StringNumberT,
} from '../../../definitions.interface';
import {
  ChangeEventT,
  FieldActionTypesEnum,
  FieldClassesEnum,
  FieldConstants,
  IBaseEvent,
  IBaseSelectProps,
  IBaseSelectState,
  IFluxQueryEntity,
  IMenuProps,
  IMultiItemEntity,
  IPresetsSelectOptionEntity,
  SelectClassesEnum,
  SelectValueT,
} from '../../../definition';

export class BaseSelect<TProps extends IBaseSelectProps,
                        TState extends IBaseSelectState>
  extends BaseTextField<TProps, TState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<IBaseSelectProps>({
    forceReload: true,
    remoteFilter: true,
  }, BaseTextField);

  protected static readonly logger = LoggerFactory.makeLogger('BaseSelect');

  private readonly menuRef = React.createRef<Menu>();
  private readonly quickFilterQueryTask: DelayedTask;

  /**
   * @stable [10.08.2020]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.onDropDownClick = this.onDropDownClick.bind(this);
    this.onInlineOptionClick = this.onInlineOptionClick.bind(this);
    this.onMenuFilterChange = this.onMenuFilterChange.bind(this);
    this.onOptionsLoadDone = this.onOptionsLoadDone.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.openMenu = this.openMenu.bind(this);

    if (this.isExpandActionRendered) {
      this.defaultActions = [
        {
          type: this.mergedProps.icon || FieldActionTypesEnum.DROP_DOWN,
          onClick: this.onDropDownClick,
        },
        ...this.defaultActions
      ];
    }
    if (this.isQuickSearchEnabled) {
      this.quickFilterQueryTask = new DelayedTask(this.doFilterChange.bind(this), this.delayTimeout);
    }
  }

  /**
   * @stable [19.10.2020]
   * @param event
   */
  public async onChange(event: ChangeEventT): Promise<void> {
    await super.onChange(event);
    this.onQueryTaskStart();
  }

  /**
   * @stable [10.08.2020]
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    super.componentDidUpdate(prevProps, prevState);
    const originalProps = this.originalProps;

    if (this.state.progress
      && !originalProps.waitingForOptions && prevProps.waitingForOptions) {
      // We can't use progress props because it is reserved
      // The new data have come
      this.setState({progress: false}, this.onOptionsLoadDone);
    }

    this.tryResetCachedValue(originalProps, prevProps);
  }

  /**
   * @stable [10.08.2020]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.cancelQueryFilterTask();
  }

  /**
   * @stable [30.01.2020]
   */
  protected async clearValue(): Promise<void> {
    await super.clearValue();

    if (this.isPlainValueApplied) {
      this.clearCachedValue();
    }
  }

  /**
   * @stable [14.10.2020]
   * @param event
   * @protected
   */
  public onKeyEscape(event: IBaseEvent): void {
    super.onKeyEscape(event);
    this.hideMenu();
  }

  /**
   * @stable [09.08.2020]
   */
  public openMenu(): void {
    if (this.isBusy || this.isMenuAlreadyOpened) {
      return;
    }
    const areLocalOptionsUsed = this.areLocalOptionsUsed;
    const doOptionsExist = this.doOptionsExist;
    const isForceReload = this.isForceReload;
    const isQuickSearchEnabled = this.isQuickSearchEnabled;

    BaseSelect.logger.debug(
      '[$BaseSelect][openMenu] isForceReload:', isForceReload,
      ', doOptionsExist:', doOptionsExist,
      ', areLocalOptionsUsed:', areLocalOptionsUsed,
      ', isQuickSearchEnabled:', isQuickSearchEnabled
    );

    if ((isForceReload || !doOptionsExist) && !areLocalOptionsUsed) {
      if (isQuickSearchEnabled) {
        this.doFilterChange();
      } else {
        this.onFilterChange();
      }
    } else {
      this.showMenu();
    }
  }

  /**
   * @stable [09.08.2020]
   * @param event
   */
  public onKeyEnter(event: IBaseEvent): void {
    if (this.onQueryTaskStart(true)) {
      this.domAccessor.cancelEvent(event);
    }
    super.onKeyEnter(event);
  }

  public deleteItem(item: IMultiItemEntity): void {
    // Do nothing
  }

  /**
   * @stable [14.10.2020]
   * @param event
   * @protected
   */
  protected onClick(event: IBaseEvent): void {
    super.onClick(event);
    this.openMenu();
  }

  /**
   * @stable [16.10.2020]
   * @protected
   */
  protected get attachmentBodyElement(): JSX.Element {
    const {
      inlineOptionClassName,
      inlineOptions,
    } = this.originalProps;

    if (R.isNil(inlineOptions)) {
      return null;
    }
    const currentValue = this.value;

    return (
      <React.Fragment>
        {this.options.map((option) => {
            const id = this.fromSelectValueToId(option);
            const isInlineOptionSelected = this.isInlineOptionSelected(id, currentValue);

            return (
              <InlineOption
                key={`inline-option-key-${id}`}
                option={option}
                selected={isInlineOptionSelected}
                className={
                  ClsUtils.joinClassName(
                    inlineOptionClassName,
                    SelectClassesEnum.BASE_SELECT_INLINE_OPTION
                  )
                }
                onClick={() => this.onInlineOptionClick(option, isInlineOptionSelected)}
              />
            );
          }
        )}
      </React.Fragment>
    );
  }

  /**
   * @stable [22.01.2020]
   * @returns {JSX.Element}
   */
  protected get inputAttachmentElement(): JSX.Element {
    return ConditionUtils.orNull(
      this.isMenuRendered,   // To improve a performance
      () => (
        <Menu
          ref={this.menuRef}
          anchorElement={ConditionUtils.orNull(this.isMenuAnchored, () => this.menuAnchorElement)}
          width={ConditionUtils.orNull(this.isMenuAnchored, () => this.menuWidth)}
          progress={this.isBusy}
          options={this.getFilteredOptions()}
          onSelect={this.onSelect}
          onFilterChange={this.onMenuFilterChange}
          {...this.getMenuProps()}/>
      )
    );
  }

  /**
   * @stable [08.08.2020]
   * @protected
   */
  protected getMenuProps(): IMenuProps {
    const {
      menuConfiguration,
    } = this.originalProps;

    return FilterUtils.defValuesFilter<IMenuProps, IMenuProps>({
      filter: ConditionUtils.orUndef(this.isRemoteFilterUsed, () => null), // To prevent menu local options filtration
      ...menuConfiguration,
    });
  }

  /**
   * @stable [08.08.2020]
   * @param filter
   * @protected
   */
  protected getFilteredOptions(filter?: (option: IPresetsSelectOptionEntity) => boolean): IPresetsSelectOptionEntity[] {
    const value = this.value;
    let actualFilter = filter;
    const doesFilterExist = TypeUtils.isFn(filter);

    if (this.isQuickSearchEnabled
      && !this.isRemoteFilterUsed
      && !this.isValueObject(value)
      && ObjectUtils.isObjectNotEmpty(value)) {

      const queryFilter = (option) => FilterUtils.queryFilter(value, this.fromSelectValueToDisplayValue(option));
      actualFilter = doesFilterExist
        ? (option) => queryFilter(option) && filter(option)
        : queryFilter;
    }
    return TypeUtils.isFn(actualFilter)
      ? this.options.filter(actualFilter)
      : this.options;
  }

  /**
   * @stable [14.10.2020]
   * @protected
   */
  protected get isBusy(): boolean {
    return this.state.progress;
  }

  /**
   * @stable [10.08.2020]
   * @protected
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      SelectClassesEnum.BASE_SELECT
    );
  }

  /**
   * @stable [28.01.2020]
   * @param {IPresetsSelectOptionEntity} option
   */
  protected onSelect(option: IPresetsSelectOptionEntity): void {
    if (this.isPlainValueApplied) {
      this.saveCachedValue(CloneUtils.shallowClone(option), () => this.doSelectOption(option));
    } else {
      this.doSelectOption(option);
    }
  }

  /**
   * @stable [10.08.2020]
   * @param option
   * @param isInlineOptionSelected
   * @protected
   */
  protected onInlineOptionClick(option: IPresetsSelectOptionEntity,
                                isInlineOptionSelected: boolean): void {
    this.onSelect(option);
  }

  /**
   * @stable [10.08.2020]
   * @param id
   * @param currentValue
   * @protected
   */
  protected isInlineOptionSelected(id: EntityIdT, currentValue: SelectValueT): boolean {
    return this.fromSelectValueToId(currentValue) === id;
  }

  /**
   * @stable [05.09.2020]
   * @param option
   * @protected
   */
  protected notifySelectOption(option: IPresetsSelectOptionEntity): void {
    const {
      onSelect,
    } = this.originalProps;

    if (!TypeUtils.isDef(option) || !TypeUtils.isFn(onSelect)) {
      return;
    }
    onSelect(option);
  }

  /**
   * @stable [28.01.2020]
   * @param {SelectValueT} value
   * @returns {AnyT}
   */
  protected getDecoratedDisplayValue(value: SelectValueT): AnyT {
    const $$cachedValue = this.$$cashedValue;
    const hasCachedValue = !R.isNil($$cachedValue);

    if (!hasCachedValue && (!this.isQuickSearchEnabled || this.isValueObject(value))) {
      const id = this.fromSelectValueToId(value);
      value = NvlUtils.nvl(
        R.find((option) => this.fromSelectValueToId(option) === id, this.options),
        value
      );
    }
    return super.getDecoratedDisplayValue(hasCachedValue ? $$cachedValue : value, hasCachedValue);
  }

  /**
   * @stable [10.08.2020]
   * @param value
   * @protected
   */
  protected decorateDisplayValue(value: AnyT): AnyT {
    return this.fromSelectValueToDisplayValue(value);
  }

  /**
   * @stable [10.08.2020]
   * @protected
   */
  protected get options(): IPresetsSelectOptionEntity[] {
    return NvlUtils.nvl(this.originalProps.options, []);
  }

  /**
   * @stable [10.08.2020]
   * @protected
   */
  protected get isExpandActionRendered(): boolean {
    return WrapperUtils.isExpandActionRendered(this.mergedProps);
  }

  /**
   * @stable [08.08.2020]
   * @protected
   */
  protected get isAllowEmptyFilterValue(): boolean {
    return WrapperUtils.isAllowEmptyFilterValue(this.originalProps);
  }

  /**
   * @stable [10.08.2020]
   * @param value
   * @protected
   */
  protected fromSelectValueToId(value: SelectValueT): EntityIdT {
    return this.fieldConverter.fromSelectValueToId(value);
  }

  /**
   * @stable [10.08.2020]
   * @protected
   */
  protected getComponentsSettingsProps(): TProps {
    return PropsUtils.mergeWithSystemProps<TProps>(
      super.getComponentsSettingsProps(),
      this.componentsSettings.baseSelect as TProps
    );
  }

  /**
   * @stable [14.08.2020]
   */
  private doFilterChange(): void {
    this.onFilterChange(this.decoratedDisplayValue);
  }

  /**
   * @stable [09.08.2020]
   * @param event
   * @private
   */
  private onDropDownClick(event: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);
    this.openMenu();
    this.setFocus();
  }

  /**
   * @stable [10.08.2020]
   * @param noDelay
   * @private
   */
  private onQueryTaskStart(noDelay = false): boolean {
    if (this.isBusy) {
      return false;
    }
    if (this.isRemoteFilterUsed) {
      this.hideMenu();

      if (noDelay) {
        this.cancelQueryFilterTask();
        this.doFilterChange();
      } else {
        this.quickFilterQueryTask.start();
      }
    } else {
      this.showMenu();
    }
    return true;
  }

  /**
   * @stable [10.08.2020]
   * @private
   */
  private onMenuFilterChange(query: string): void {
    if (!this.isRemoteFilterUsed) {
      // In case of "API init data + a local filter"

      BaseSelect.logger.debug('[$BaseSelect][onMenuFilterChange] The remote filter is down. Do nothing..');
      return;
    }
    this.onFilterChange(query);
  }

  /**
   * @stable [13.08.2020]
   * @param query
   */
  private onFilterChange(query?: string): void {
    const {
      onDictionaryChange,
    } = this.originalProps;

    if (!TypeUtils.isFn(onDictionaryChange)) {
      BaseSelect.logger.debug(
        '[$BaseSelect][onFilterChange] The onDictionaryChange callback is not defined. Do nothing..'
      );
      return;
    }
    if (this.isQuickSearchEnabled) {
      const isQueryEmpty = !ObjectUtils.isObjectNotEmpty(query);

      if (isQueryEmpty && !this.isAllowEmptyFilterValue) {
        BaseSelect.logger.debug('[$BaseSelect][onFilterChange] The query is empty. Do nothing...');
        return;
      }
    }

    this.setState({progress: true}, () => {
      BaseSelect.logger.debug(
        '[$BaseSelect][onFilterChange] The onDictionaryChange callback is being called. Query:', query
      );
      onDictionaryChange(this.dictionary, {
        payload: FilterUtils.defValuesFilter<IFluxQueryEntity, IFluxQueryEntity>({query}),
      });
    });
  }

  /**
   * @stable [11.08.2020]
   * @private
   */
  private onOptionsLoadDone(): void {
    const filteredOptions = this.getFilteredOptions();

    BaseSelect.logger.debug(
      '[$BaseSelect][onOptionsLoadDone] The options have been loaded successfully. The options:',
      filteredOptions
    );

    this.showMenu(filteredOptions);
    ConditionUtils.ifNotNilThanValue(this.originalProps.onDictionaryLoad, (onDictionaryLoad) => onDictionaryLoad(filteredOptions));
  }

  /**
   * @stable [10.08.2020]
   * @param option
   * @private
   */
  private doSelectOption(option: IPresetsSelectOptionEntity): void {
    this.onChangeManually(this.isPlainValueApplied ? this.fromSelectValueToId(option) : option);
    this.notifySelectOption(option);
    this.setFocus();
  }

  /**
   * @stable [29.01.2020]
   * @param {TProps} props
   * @param {TProps} previousProps
   */
  private tryResetCachedValue(props: TProps, previousProps: TProps): void {
    if (!this.isPlainValueApplied) {
      return;
    }

    const newValue = props.value;
    if (!R.equals(newValue, previousProps.value)) {
      // The value has changed

      // TODO Pass cached value inside a constructor
      const $$cachedValue = this.$$cashedValue;
      if (!R.isNil($$cachedValue) && !R.equals($$cachedValue.value, newValue)) {
        // Need to reset the previous cached display value if the value has been cleared or replaced
        this.clearCachedValue();
      }
    }
  }

  /**
   * @stable [09.08.2020]
   * @private
   */
  private cancelQueryFilterTask(): void {
    ConditionUtils.ifNotNilThanValue(this.quickFilterQueryTask, (task) => task.stop());
  }

  /**
   * @stable [11.08.2020]
   * @param filteredOptions
   * @private
   */
  private showMenu(filteredOptions?: IPresetsSelectOptionEntity[]): void {
    if (this.isMenuAlreadyOpened) {
      return;
    }

    if (!R.isEmpty(filteredOptions || this.getFilteredOptions())) {
      this.setState({menuRendered: true}, () => this.menu.show());

      BaseSelect.logger.debug('[$BaseSelect][showMenu] The menu has been shown.');
    } else {
      BaseSelect.logger.debug('[$BaseSelect][showMenu] The options are empty. The menu does not show.');
    }
  }

  /**
   * @stable [09.08.2020]
   * @private
   */
  private hideMenu(): void {
    if (!this.isMenuAlreadyOpened) {
      return;
    }
    this.setState({menuRendered: false});
  }

  /**
   * @stable [30.01.2020]
   * @param {() => void} callback
   */
  private clearCachedValue(callback?: () => void): void {
    this.saveCachedValue(null, callback);
  }

  /**
   * @stable [30.01.2020]
   * @param {IPresetsSelectOptionEntity} value
   * @param {() => void} callback
   */
  private saveCachedValue(value?: IPresetsSelectOptionEntity, callback?: () => void): void {
    this.setState({$$cachedValue: value}, callback);
  }

  /**
   * @stable [15.10.2020]
   * @param value
   * @private
   */
  private fromSelectValueToDisplayValue(value: SelectValueT): StringNumberT {
    return this.fieldConverter.fromSelectValueToDisplayValue(value);
  }

  /**
   * @stable [15.10.2020]
   * @protected
   */
  protected get originalEmptyValue(): AnyT {
    return FieldConstants.VALUE_TO_RESET;
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get isQuickSearchEnabled(): boolean {
    return !this.isFocusPrevented;
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get delayTimeout(): number {
    return NvlUtils.nvl(this.mergedProps.delayTimeout, 1000);
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get areLocalOptionsUsed(): boolean {
    return TypeUtils.isUndef(this.originalProps.waitingForOptions);
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get isMenuAnchored(): boolean {
    return this.originalProps.anchored;
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get menuAnchorElement(): HTMLElement {
    return CalcUtils.calc(this.originalProps.menuAnchorElement) || this.input;
  }

  /**
   * @stable [30.01.2020]
   * @returns {IPresetsSelectOptionEntity}
   */
  private get $$cashedValue(): IPresetsSelectOptionEntity {
    return this.state.$$cachedValue;
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get dictionary(): string {
    return this.originalProps.dictionary;
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get doOptionsExist(): boolean {
    return !R.isNil(this.originalProps.options);
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get isMenuAlreadyOpened(): boolean {
    return ConditionUtils.ifNotNilThanValue(this.menu, (menu) => menu.isOpen(), false);
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get isForceReload(): boolean {
    return this.originalProps.forceReload;
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get isRemoteFilterUsed(): boolean {
    return this.originalProps.remoteFilter && !this.areLocalOptionsUsed;
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get isMenuRendered(): boolean {
    return this.state.menuRendered;
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get menuWidth(): number {
    return this.domAccessor.getWidth(this.actualRef.current);
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get menu(): Menu {
    return this.menuRef.current;
  }
}
