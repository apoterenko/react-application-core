import * as React from 'react';
import * as R from 'ramda';
import {
  LoggerFactory,
  ILogger,
} from 'ts-smart-logger';

import {
  asMultiFieldAddedEntities,
  calc,
  ConditionUtils,
  DelayedTask,
  isAllowEmptyFilterValue,
  isAnchored,
  isExpandActionRendered,
  isForceUseLocalFilter,
  isMenuRendered,
  isObjectNotEmpty,
  joinClassName,
  nvl,
  ObjectUtils,
  orNull,
  queryFilter,
  shallowClone,
  TypeUtils,
  WrapperUtils,
} from '../../../util';
import { BaseTextField } from '../text-field';
import { Menu } from '../../menu';
import {
  AnyT,
  EntityIdT,
  IEntity,
  StringNumberT,
} from '../../../definitions.interface';
import {
  IBaseSelect,
  IBaseSelectProps,
  IBaseSelectState,
} from './base-select.interface';
import {
  ChangeEventT,
  FieldActionTypesEnum,
  FieldConstants,
  IBaseEvent,
  IComponentsSettingsEntity,
  IMenu,
  IMenuProps,
  IMultiItemEntity,
  IPresetsSelectOptionEntity,
  SelectValueT,
} from '../../../definition';

export class BaseSelect<TProps extends IBaseSelectProps,
                        TState extends IBaseSelectState>
  extends BaseTextField<TProps, TState>
  implements IBaseSelect {

  protected static readonly logger = LoggerFactory.makeLogger('BaseSelect');

  private readonly menuRef = React.createRef<Menu>();
  private readonly quickFilterQueryTask: DelayedTask;

  /**
   * @stable [30.11.2019]
   * @param {TProps} props
   */
  constructor(props: TProps) {
    super(props);

    this.getMenuAnchorElement = this.getMenuAnchorElement.bind(this);
    this.getMenuWidth = this.getMenuWidth.bind(this);
    this.onDropDownClick = this.onDropDownClick.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.onOptionsLoadDone = this.onOptionsLoadDone.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.openMenu = this.openMenu.bind(this);

    if (this.isExpandActionRendered) {
      this.defaultActions = [
        {type: this.systemBaseSelectProps.icon || props.icon || FieldActionTypesEnum.DROP_DOWN, onClick: this.onDropDownClick},
        ...this.defaultActions
      ];
    }
    if (this.isQuickSearchEnabled) {
      this.quickFilterQueryTask = new DelayedTask(this.notifyQuickSearchFilterChange.bind(this), this.delayTimeout);
    }
  }

  /**
   * @stable [11.01.2020]
   * @param {IBaseEvent} event
   */
  public onChange(event: ChangeEventT): void {
    super.onChange(event);

    this.startQuickSearchIfApplicable();
  }

  /**
   * @stable [29.01.2020]
   * @param {Readonly<TProps extends IBaseSelectProps>} prevProps
   * @param {Readonly<TState extends IBaseSelectState>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<TProps>, prevState: Readonly<TState>): void {
    super.componentDidUpdate(prevProps, prevState);
    const props = this.props;

    if (this.state.progress
      && !props.waitingForOptions && prevProps.waitingForOptions) {
      // We can't use progress props because it is reserved
      // The new data have come
      this.setState({progress: false}, this.onOptionsLoadDone);
    }

    this.tryResetCachedValue(props, prevProps);
  }

  /**
   * @stable [31.01.2020]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.cancelQueryFilterTask();
  }

  /**
   * @stable [11.01.2020]
   * @param {IBaseEvent} event
   */
  public onKeyEscape(event: IBaseEvent): void {
    super.onKeyEscape(event);
    this.hideMenu();
  }

  /**
   * @stable [30.01.2020]
   */
  public clearValue(): void {
    super.clearValue();

    if (this.isPlainValueApplied) {
      this.clearCachedValue();
    }
  }

  /**
   * @stable [11.01.2020]
   */
  public openMenu(): void {
    if (this.isBusy || this.isMenuAlreadyRenderedAndOpened) {
      return;
    }
    const $isForceReload = this.isForceReload;
    const $doOptionsExist = this.doOptionsExist;

    BaseSelect.logger.debug('[$BaseSelect][openMenu] isForceReload:', $isForceReload, ', doOptionsExist:', $doOptionsExist);

    if ($isForceReload || !$doOptionsExist) {
      const {
        onDictionaryEmpty,
      } = this.props;

      if (TypeUtils.isFn(onDictionaryEmpty)) {
        BaseSelect.logger.debug('[$BaseSelect][openMenu] The onDictionaryEmpty callback is defined, need to load options...');

        this.setState({progress: true}, () => onDictionaryEmpty(this.dictionary));
      } else {
        BaseSelect.logger.debug('[$BaseSelect][openMenu] The onDictionaryEmpty callback is not defined, menu show needed...');

        // Try open empty dialog menu to remote search
        this.renderAndShowMenu(!this.isQuickSearchEnabled);
      }
    } else {
      this.renderAndShowMenu();
    }
  }

  /**
   * @stable [16.01.2020]
   * @param {IBaseEvent} event
   */
  public onKeyEnter(event: IBaseEvent): void {
    if (this.startQuickSearchIfApplicable(true)) {
      this.domAccessor.cancelEvent(event);
    }
    super.onKeyEnter(event);
  }

  public deleteItem(item: IMultiItemEntity): void {
    // Do nothing
  }

  /**
   * @stable [28.01.2020]
   * @param {IBaseEvent} event
   */
  protected onClick(event: IBaseEvent): void {
    super.onClick(event);

    const isQuickSearchEnabled = this.isQuickSearchEnabled;
    const isLocalOptionsUsed = this.areLocalOptionsUsed;

    BaseSelect.logger.debug(
      '[$BaseSelect][onClick] isQuickSearchEnabled:', isQuickSearchEnabled, ', isLocalOptionsUsed:', isLocalOptionsUsed
    );

    if (isQuickSearchEnabled && !isLocalOptionsUsed) {
      if (this.isBusy) {
        BaseSelect.logger.debug('[$BaseSelect][onClick] The field is busy. Do nothing...');
      } else {
        this.notifyQuickSearchFilterChange();
      }
    } else {
      this.openMenu();
    }
  }

  protected get attachmentElement(): JSX.Element {
    const props = this.props;

    // TODO
    if (!props.inlineOptions) {
      return null;
    }
    const currentValue = this.value;
    const value = TypeUtils.isPrimitive(currentValue)
      ? [{id: currentValue}] as IEntity[]
      : (asMultiFieldAddedEntities(this.value) || []);

    return (
      <div className='rac-field__inline-options'>
        {this.options.map((option) => {
            const isSelected = value.find((itm) => itm.id === option.value);
            return (
              <div
                key={`inline-option-key-${option.value}`}
                className={joinClassName(
                  'rac-field__inline-option',
                  isSelected && 'rac-field__inline-option-active',
                )}
                onClick={() => isSelected
                  ? this.deleteItem({id: option.value})
                  : this.onSelect(option)}
              >
                {option.label}
              </div>
            );
          }
        )}
      </div>
    );
  }

  /**
   * @stable [22.01.2020]
   * @returns {JSX.Element}
   */
  protected get inputAttachmentElement(): JSX.Element {
    return orNull(
      this.isMenuRendered,   // To improve a performance
      () => (
        <Menu
          ref={this.menuRef}
          anchorElement={orNull(this.isMenuAnchored, () => this.getMenuAnchorElement)}
          width={orNull(this.isMenuAnchored, () => this.getMenuWidth)}
          progress={this.isBusy}
          options={this.getFilteredOptions()}
          onSelect={this.onSelect}
          onFilterChange={this.onFilterChange}
          {...this.getMenuProps()}/>
      )
    );
  }

  /**
   * @stable [09.01.2020]
   * @returns {IMenuProps}
   */
  protected getMenuProps(): IMenuProps {
    return this.props.menuConfiguration;
  }

  /**
   * @stable [31.01.2020]
   * @param {(option: ISelectOptionEntity) => boolean} filter
   * @returns {IPresetsSelectOptionEntity[]}
   */
  protected getFilteredOptions(filter?: (option: IPresetsSelectOptionEntity) => boolean): IPresetsSelectOptionEntity[] {
    const value = this.value;
    const doesFilterExist = TypeUtils.isFn(filter);

    if (this.isQuickSearchEnabled
      && (this.isForceUseLocalFilter || this.areLocalOptionsUsed)
      && !this.isValueObject(value)
      && isObjectNotEmpty(value)) {

      const originalFilter = (option) => queryFilter(value, this.fromSelectOptionEntityToDisplayValue(option));

      return this.options.filter(
        doesFilterExist
          ? (option) => originalFilter(option) && filter(option)
          : originalFilter
      );
    }
    return doesFilterExist
      ? this.options.filter(filter)
      : this.options;
  }

  /**
   * @stable [03.06.2020]
   * @returns {boolean}
   */
  protected get isBusy(): boolean {
    return WrapperUtils.inProgress(this.state);
  }

  /**
   * @stable [11.01.2020]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return joinClassName(super.getFieldClassName(), 'rac-base-select');
  }

  /**
   * @stable [21.12.2019]
   * @returns {AnyT}
   */
  protected get originalEmptyValue(): AnyT {
    return FieldConstants.VALUE_TO_RESET;
  }

  /**
   * @stable [28.01.2020]
   * @param {IPresetsSelectOptionEntity} option
   */
  protected onSelect(option: IPresetsSelectOptionEntity): void {
    if (this.isPlainValueApplied) {
      this.saveCachedValue(shallowClone(option), () => this.doSelectOption(option));
    } else {
      this.doSelectOption(option);
    }
  }

  /**
   * @stable [11.01.2020]
   * @param {IPresetsSelectOptionEntity} option
   */
  protected notifySelectOption(option: IPresetsSelectOptionEntity): void {
    const onSelect = this.props.onSelect;
    if (!TypeUtils.isDef(option) || !TypeUtils.isFn(onSelect)) {
      return;
    }
    onSelect(option);
  }

  /**
   * @stable [28.01.2020]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected getDecoratedDisplayValue(value: AnyT): AnyT {
    const $$cachedValue = this.$$cashedValue;
    const hasCachedValue = !R.isNil($$cachedValue);

    if (!hasCachedValue && (!this.isQuickSearchEnabled || this.isValueObject(value))) {
      const optionValue = this.fromSelectOptionEntityToId(value);
      value = nvl(
        R.find<IPresetsSelectOptionEntity>((option) => this.fromSelectOptionEntityToId(option) === optionValue, this.options),
        value
      );
    }
    return super.getDecoratedDisplayValue(hasCachedValue ? $$cachedValue : value, hasCachedValue);
  }

  /**
   * @stable [28.01.2020]
   * @param {AnyT} value
   * @returns {AnyT}
   */
  protected decorateDisplayValue(value: AnyT): AnyT {
    return this.fromSelectOptionEntityToDisplayValue(value);
  }

  /**
   * @stable [11.01.2020]
   * @returns {IPresetsSelectOptionEntity[]}
   */
  protected get options(): IPresetsSelectOptionEntity[] {
    return nvl(this.props.options, []);
  }

  /**
   * @stable [11.01.2020]
   * @returns {boolean}
   */
  protected get isExpandActionRendered(): boolean {
    return isExpandActionRendered(this.props);
  }

  /**
   * @stable [28.01.2020]
   * @returns {boolean}
   */
  protected get isAllowEmptyFilterValue(): boolean {
    return isAllowEmptyFilterValue(this.props);
  }

  /**
   * @stable [18.05.2020]
   * @param {AnyT} value
   * @returns {EntityIdT}
   */
  protected fromSelectOptionEntityToId(value: AnyT): EntityIdT {
    return this.fieldConverter.fromSelectOptionEntityToId(value);
  }

  /**
   * @stable [28.01.2020]
   */
  private notifyQuickSearchFilterChange(): void {
    if (this.isValueObject(this.value)) {
      // Why we should search the same value object instance?

      BaseSelect.logger.debug('[$BaseSelect][notifyQuickSearchFilterChange] The value is an object. Do nothing...');
      return;
    }

    const currentValue = this.decoratedDisplayValue;
    const isCurrentValueNotEmpty = ObjectUtils.isObjectNotEmpty(currentValue);
    const $isAllowEmptyFilterValue = this.isAllowEmptyFilterValue;

    if (!$isAllowEmptyFilterValue && !isCurrentValueNotEmpty) {
      BaseSelect.logger.debug('[$BaseSelect][notifyQuickSearchFilterChange] The decorated value is empty. Do nothing...');
      return;
    }
    this.setState({progress: true}, () => {
      BaseSelect.logger.debug(
        '[$BaseSelect][notifyQuickSearchFilterChange] The onFilterChange method is being call. The current value:', currentValue
      );

      this.onFilterChange(currentValue);
    });
  }

  /**
   * @stable [11.01.2020]
   * @param {IBaseEvent} event
   */
  private onDropDownClick(event: IBaseEvent): void {
    this.domAccessor.cancelEvent(event);
    this.openMenu();
    this.setFocus();
  }

  /**
   * @stable [28.01.2020]
   * @param {IPresetsSelectOptionEntity} option
   */
  private doSelectOption(option: IPresetsSelectOptionEntity): void {
    this.onChangeManually(this.isPlainValueApplied ? this.fromSelectOptionEntityToId(option) : option);
    this.notifySelectOption(option);
    this.setFocus();
  }

  /**
   * @stable [16.06.2020]
   * @param {string} query
   */
  private onFilterChange(query: string): void {
    const mergedProps = this.mergedProps;
    const {
      onDictionaryFilterChange,
    } = mergedProps;

    if (TypeUtils.isFn(onDictionaryFilterChange)) {
      onDictionaryFilterChange(this.dictionary, {payload: {query}});
    }
  }

  /**
   * @stable [11.01.2020]
   */
  private hideMenu(): void {
    if (this.isMenuAlreadyRenderedAndOpened) {
      this.setState({menuRendered: false});
    }
  }

  /**
   * @stable [12.01.2020]
   * @param {boolean} force
   */
  private renderAndShowMenu(force = false): void {
    if (force || !R.isEmpty(this.getFilteredOptions())) {
      this.setState({menuRendered: true}, () => this.menu.show());
    } else {
      BaseSelect.logger.debug('[$BaseSelect][renderAndShowMenu] The options are empty. The menu does not show.');
    }
  }

  /**
   * @stable [16.01.2020]
   */
  private startQuickSearchIfApplicable(noDelay = false): boolean {
    const isQuickSearchEnabled = this.isQuickSearchEnabled;
    const isFieldBusy = this.isBusy;
    const isLocalOptionsUsed = this.areLocalOptionsUsed;

    if (!isQuickSearchEnabled || isFieldBusy || isLocalOptionsUsed) {
      BaseSelect.logger.debug(
        '[$BaseSelect][startQuickSearchIfApplicable] Can\'t start a search because of isQuickSearchEnabled:',
        isQuickSearchEnabled, ', isFieldBusy:', isFieldBusy, ', isLocalOptionsUsed:', isLocalOptionsUsed
      );

      if (!this.isMenuAlreadyRenderedAndOpened
        && isQuickSearchEnabled
        && isLocalOptionsUsed) {
        this.renderAndShowMenu(true);
      }
      return false;
    }
    if (this.isPlainValueApplied) {
      this.clearCachedValue(() => this.hideMenuAndStartQuickSearch(noDelay));
    } else {
      this.hideMenuAndStartQuickSearch(noDelay);
    }
    return true;
  }

  /**
   * @stable [28.01.2020]
   */
  private onOptionsLoadDone(): void {
    this.renderAndShowMenu();

    const props = this.props;
    if (TypeUtils.isFn(props.onDictionaryLoad)) {
      props.onDictionaryLoad(this.getFilteredOptions());
    }
  }

  /**
   * @stable [30.01.2020]
   * @param {boolean} noDelay
   */
  private hideMenuAndStartQuickSearch(noDelay = false): void {
    this.hideMenu();

    if (noDelay) {
      this.cancelQueryFilterTask();
      this.notifyQuickSearchFilterChange();
    } else {
      this.quickFilterQueryTask.start();
    }
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
   * @stable [18.05.2020]
   */
  private cancelQueryFilterTask(): void {
    ConditionUtils.ifNotNilThanValue(this.quickFilterQueryTask, (task) => task.stop());
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
   * @stable [18.05.2020]
   * @param {SelectValueT} value
   * @returns {StringNumberT}
   */
  private fromSelectOptionEntityToDisplayValue(value: SelectValueT): StringNumberT {
    return this.fieldConverter.fromSelectOptionEntityToDisplayValue(value);
  }

  /**
   * @stable [29.01.2020]
   * @returns {boolean}
   */
  private get isQuickSearchEnabled(): boolean {
    return !this.isFocusPrevented;
  }

  /**
   * @stable [24.01.2020]
   * @returns {number}
   */
  private getMenuWidth(): number {
    return this.domAccessor.getWidth(this.selfRef.current);
  }

  /**
   * @stable [11.01.2020]
   * @returns {number}
   */
  private get delayTimeout(): number {
    return nvl(this.props.delayTimeout, 1000);
  }

  /**
   * @stable [15.01.2020]
   * @returns {boolean}
   */
  private get doOptionsExist(): boolean {
    return !R.isNil(this.props.options);
  }

  /**
   * @stable [22.01.2020]
   * @returns {boolean}
   */
  private get isMenuRendered(): boolean {
    return isMenuRendered(this.state);
  }

  /**
   * @stable [16.06.2020]
   * @returns {boolean}
   */
  private get areLocalOptionsUsed(): boolean {
    return TypeUtils.isUndef(this.originalProps.waitingForOptions);
  }

  /**
   * @stable [24.01.2020]
   * @returns {boolean}
   */
  private get isMenuAnchored(): boolean {
    return isAnchored(this.props);
  }

  /**
   * @stable [01.02.2020]
   * @returns {boolean}
   */
  private get isForceUseLocalFilter(): boolean {
    return isForceUseLocalFilter(this.props);
  }

  /**
   * @stable [31.01.2020]
   * @returns {boolean}
   */
  private get isForceReload(): boolean {
    return WrapperUtils.isForceReload(this.props);
  }

  /**
   * @stable [11.01.2020]
   * @returns {boolean}
   */
  private get isMenuAlreadyRenderedAndOpened(): boolean {
    const menu = this.menu;
    return !R.isNil(menu) && menu.isOpen();
  }

  /**
   * @stable [24.01.2020]
   * @returns {HTMLElement}
   */
  private getMenuAnchorElement(): HTMLElement {
    return calc<HTMLElement>(this.props.menuAnchorElement) || this.input;
  }

  /**
   * @stable [30.11.2019]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.menuRef.current;
  }

  /**
   * @stable [30.01.2020]
   * @returns {IPresetsSelectOptionEntity}
   */
  private get $$cashedValue(): IPresetsSelectOptionEntity {
    return this.state.$$cachedValue;
  }

  /**
   * @stable [01.02.2020]
   * @returns {string}
   */
  private get dictionary(): string {
    const {dictionary, bindDictionary} = this.props;
    return nvl(dictionary, bindDictionary); // bindDictionary is used by Form
  }

  /**
   * @stable [17.02.2020]
   * @returns {TProps}
   */
  private get systemBaseSelectProps(): TProps {
    const {baseSelect = {}} = this.settings.components || {} as IComponentsSettingsEntity;
    return baseSelect as TProps;
  }
}
