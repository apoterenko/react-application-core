import * as React from 'react';

export type AnyT = any;
export type StringNumberT = number | string;
export type EntityIdT = StringNumberT;
export const FIRST_PAGE = 1;
export const ONE_DOLLAR_VALUE = 1;
export const DEFAULT_CURRENCY_PRECISION_VALUE = 2;
export const DEFAULT_PAGE_SIZE = 50;
export const DEFAULT_MAX_PAGE_SIZE = 1000000;
export const NEW_OPTION = 'new';
export const UNDEF = void 0;
export const UNDEF_SYMBOL = Symbol('UNDEF');
export const CLEAR_DIRTY_CHANGES_VALUE = UNDEF;
export const ACTION_PREFIX = '$$-RAC-';

/**
 * Core fields
 */
export const FROM_TIME_FIELD_NAME = 'fromTime';
export const TO_TIME_FIELD_NAME = 'toTime';
export const TIME_FIELD_NAME = 'time';
/**
 * @deprecated
 */
export const NAME_FIELD_NAME = 'name';                                                          /* @stable [16.08.2018] */

/* @stable [23.04.2018] */
export interface IEmptyDataWrapper<TEmptyData> {
  emptyData?: TEmptyData;
}

/* @stable [23.04.2018] */
export interface IBooleanEmptyDataWrapper extends IEmptyDataWrapper<boolean> {
}

export interface I$$cachedValueWrapper<TValue> { $$cachedValue?: TValue; }
export interface IAcceptableWrapper { acceptable?: boolean; }
export interface IAcceptDisabledWrapper { acceptDisabled?: boolean; }
export interface IAcceptTextWrapper { acceptText?: string; }
export interface IAcceptWrapper { accept?(): void; }
export interface IAccessConfigurationWrapper<TValue> { accessConfiguration?: TValue; }
export interface IAccessDeniedWrapper<TValue> { accessDenied?: TValue; }
export interface IActionsDisabledWrapper { actionsDisabled?: boolean; }
export interface IActionsFactoryWrapper<TValue> { actionsFactory?: TValue; }
export interface IActionsPosition<TActionsPosition> { actionsPosition?: TActionsPosition; }
export interface IActionsRenderedWrapper { actionsRendered?: boolean; }
export interface IActionsWrapper<TValue> { actions?: TValue; }
export interface IActionWrapper<TValue> { action?: TValue; }
export interface IActivateDialogWrapper { activateDialog?(): void; }
export interface IActivateWrapper<TValue = {}> { activate?(payload?: TValue): void; }
export interface IActiveActionsWrapper<TValue> { activeActions?: TValue; }
export interface IActiveValueWrapper<TValue = number> { activeValue?: TValue; }
export interface IActiveWrapper<TValue = boolean> { active?: TValue; }
export interface IAddApiWrapper { addApi?: string; }
export interface IAddedFilesWrapper<TValue> { addedFiles?: TValue; }
export interface IAddWrapper<TValue> { add?: TValue; }
export interface IAfterEnterWrapper<TAfterEnter> { afterEnter?: TAfterEnter; }
export interface IAliasWrapper<TValue = string> { alias?: TValue; }
export interface IAlignWrapper<TValue = string> { align?: TValue; }
export interface IAllowEmptyFilterValueWrapper { allowEmptyFilterValue?: boolean; }
export interface IAlwaysDirtyWrapper { alwaysDirty?: boolean; }
export interface IAlwaysResettableWrapper { alwaysResettable?: boolean; }
export interface IAlwaysSendChangesWrapper { alwaysSendChanges?: boolean; }
export interface IAnchoredWrapper { anchored?: boolean; }
export interface IAnchorElementWrapper<TValue> { anchorElement?: TValue; }
export interface IApiEntityWrapper<TValue> { apiEntity?: TValue; }
export interface IApiUrlWrapper { apiUrl?: string; }
export interface IApplicationWrapper<TValue> { application?: TValue; }
export interface IAreaWrapper<TValue = string> { area?: TValue; }
export interface IAsyncLibsWrapper<TValue> { asyncLibs?: TValue; }
export interface IAuthorizedWrapper { authorized?: boolean; }
export interface IAuthWrapper<TValue = string> { auth?: TValue; }
export interface IAutoCompleteWrapper<TValue = string> { autoComplete?: TValue; }
export interface IAutoFocusWrapper { autoFocus?: boolean; }
export interface IAutoResetWrapper { autoReset?: boolean; }
export interface IAutoUnsubscribingWrapper { autoUnsubscribing?: boolean; }
export interface IBarcodeWrapper<TValue = string> { barcode?: TValue; }
export interface IBasenameWrapper { basename?: string; }
export interface IBeforeEnterWrapper<TBeforeEnter> { beforeEnter?: TBeforeEnter; }
export interface IBindDictionaryWrapper<TBindDictionary = string> { bindDictionary?: TBindDictionary; }
export interface IBirthdayWrapper { birthday?: string; }
export interface IBlobDataContentTypeWrapper { blobDataContentType?: string; }
export interface IBlobDataWrapper<TValue = Blob> { blobData?: TValue; }
export interface IBlobResponseWrapper<TValue = boolean> { blobResponse?: TValue; }
export interface IBoolWrapper { bool?: boolean; }
export interface IBorderedWrapper { bordered?: boolean; }
export interface IButtonConfigurationWrapper<TValue> { buttonConfiguration?: TValue; }
export interface ICalendarActionRenderedWrapper { calendarActionRendered?: boolean; }
export interface ICalendarConfigurationWrapper<TValue> { calendarConfiguration?: TValue; }
export interface ICalendarEntityConfigurationWrapper<TValue> { calendarEntityConfiguration?: TValue; }
export interface ICalendarEntityWrapper<TValue> { calendarEntity?: TValue; }
export interface ICallbackWrapper<TValue = (payload?: TPayload) => void, TPayload = AnyT> { callback?: TValue; }
export interface ICancelTokenWrapper<TValue = string> { cancelToken?: TValue; }
export interface ICaptureWrapper { capture?: boolean; }
export interface IChangeableWrapper { changeable?: boolean; }
export interface IChangeEvent<TTarget = IValueWrapper> extends React.ChangeEvent<TTarget> {}
export interface IChangesWrapper<TChanges extends IKeyValue = IKeyValue> { changes?: TChanges; }
export interface IChannelsWrapper<TValue = string> { channels?: TValue; }
export interface IChannelWrapper<TValue = string> { channel?: TValue; }
export interface ICheckScrimWrapper { checkScrim?: boolean; }
export interface IChildrenWrapper<TValue> { children?: TValue; }
export interface ICityWrapper<TValue = string> { city?: TValue; }
export interface IClassNameWrapper<TValue = string> { className?: TValue; }
export interface IClearActionRenderedWrapper { clearActionRendered?: boolean; }
export interface IClosableWrapper { closable?: boolean; }
export interface ICloseDisabledWrapper { closeDisabled?: boolean; }
export interface ICloseTextWrapper { closeText?: string; }
export interface ICodeWrapper<TValue = string> { code?: TValue; }
export interface IColumnClassNameWrapper<TValue = string> { columnClassName?: TValue; }
export interface IColumnNameWrapper { columnName?: string; }
export interface IColumnRenderedWrapper { columnRendered?: boolean; }
export interface IColumnsConfigurationWrapper<TValue> { columnsConfiguration?: TValue; }
export interface IColumnStylesWrapper<TValue> { columnStyles?: TValue; }
export interface IColumnTitleWrapper<TValue = string> { columnTitle?: TValue; }
export interface IColumnWidthWrapper { columnWidth?: number; }
export interface ICompactWrapper<TValue = boolean> { compact?: TValue; }
export interface IComputedMatchWrapper<TValue> { computedMatch?: TValue; }
export interface IConditionWrapper<TValue> { condition?: TValue; }
export interface IConnectedWrapper<TConnected = boolean> { connected?: TConnected; }
export interface IContainerWrapper<TValue> { container?: TValue; }
export interface IConverterWrapper<TValue> { converter?: TValue; }
export interface ICountryAbbrWrapper<TValue = string> { countryAbbr?: TValue; }
export interface ICountryWrapper<TCountry = string> { country?: TCountry; }
export interface ICurrentWrapper<TValue> { current?: TValue; }
export interface ICursorWrapper<TValue> { cursor?: TValue; }
export interface ICustomActionsWrapper<TValue> { customActions?: TValue; }
export interface IDataProviderWrapper<TValue> { dataProvider?: TValue; }
export interface IDataWrapper<TData = AnyT[]> { data?: TData; }
export interface IDateNowWrapper<TValue = number> { dateNow?: TValue; }
export interface IDateWrapper<TValue = string> { date?: TValue; }
export interface IDaysLabelsWrapper<TValue> { daysLabels?: TValue; }
export interface IDaysWrapper<TValue> { days?: TValue; }
export interface IDayWrapper<TValue = number> { day?: TValue; }
export interface IDecoratedWrapper { decorated?: boolean; }
export interface IDefaultChangesWrapper<TChanges extends IKeyValue = IKeyValue> { defaultChanges?: TChanges; }
export interface IDefaultSrcWrapper<TDefaultSrc = string> { defaultScr?: TDefaultSrc; }
export interface IDefaultValueWrapper<TDefaultValue = AnyT> { defaultValue?: TDefaultValue; }
export interface IDefaultWrapper { default?: boolean; }
export interface IDelayTimeoutWrapper<TDelayTimeout = number> { delayTimeout?: TDelayTimeout; }
export interface IDepthWrapper { depth?: number; }
export interface IDestroySectionsWrapper<TValue = string[]> { destroySections?: TValue; }
export interface IDestroyWrapper<TValue = string> { destroy?: TValue; }
export interface IDetectFileTypeTransportConfigurationWrapper<TValue> { detectFileTypeTransportConfiguration?: TValue; }
export interface IDetectFileTypeWrapper { detectFileType?: boolean; }
export interface IDialogClassNameWrapper { dialogClassName?: string; }
export interface IDialogConfigurationWrapper<TValue> { dialogConfiguration?: TValue; }
export interface IDialogOpenedWrapper<TValue = boolean> { dialogOpened?: TValue; }
export interface IDictionariesWrapper<TValue> { dictionaries?: TValue; }
export interface IDiffWrapper<TValue> { diff?: TValue; }
export interface IDirectionsWrapper<TValue> { directions?: TValue; }
export interface IDirectionWrapper<TValue = string> { direction?: TValue; }
export interface IDirtyWrapper { dirty?: boolean; }
export interface IDisabledWrapper<TValue = boolean> { disabled?: TValue; }
export interface IDisableLabelWrapper { disableLabel?: string; }
export interface IDisplayNameWrapper { displayName?: string; }
export interface IDisplayValueRenderedOnlyWrapper { displayValueRenderedOnly?: boolean; }
export interface IDisplayValueWrapper<TValue = string> { displayValue?: TValue; }
export interface IDurationWrapper<TValue> { duration?: TValue; }
export interface IEditApiWrapper { editApi?: string; }
export interface IEditedWrapper { edited?: boolean; }
export interface IEditWrapper<TValue> { edit?: TValue; }
export interface IElementWrapper<TValue = Element> { element?: TValue; }
export interface IEmptyMessageWrapper<TValue = string> { emptyMessage?: TValue; }
export interface IEmptyValueWrapper<TValue = AnyT> { emptyValue?: TValue; }
export interface IEntity extends IEntityIdTWrapper, IKeyValue {}
export interface IEntityIdTWrapper extends IIdWrapper<EntityIdT> {}
export interface IEntityIdWrapper<TEntityId = EntityIdT> { entityId?: TEntityId; }
export interface IEntityWrapper<TEntity = IEntity> { entity?: TEntity; }
export interface IErrorWrapper<TError = boolean> { error?: TError; }
export interface IEventNameWrapper { eventName?: string; }
export interface IExactWrapper { exact?: boolean; }
export interface IExpandActionRenderedWrapper { expandActionRendered?: boolean; }
export interface IExpandedAllGroupsWrapper { expandedAllGroups?: boolean; }
export interface IExpandedGroupsWrapper<TExpandedGroups> { expandedGroups?: TExpandedGroups; }
export interface IExtraParamsWrapper<TExtraParams> { extraParams?: TExtraParams; }
export interface IFactorWrapper<TValue = number> { factor?: TValue; }
export interface IFieldConfigurationWrapper<TProps> { fieldConfiguration?: TProps; }
export interface IFieldRenderedWrapper { fieldRendered?: boolean; }
export interface IFieldsWrapper<TFields> { fields?: TFields; }
export interface IFieldWrapper<TField> { field?: TField; }
export interface IFilePathWrapper { filePath?: string; }
export interface IFilesWrapper<TValue> { files?: TValue; }
export interface IFilterPlaceholderWrapper { filterPlaceholder?: string; }
export interface IFilterRendererWrapper<TPayload> { filterRenderer?(payload: TPayload): JSX.Element; }
export interface IFilterWrapper<TValue = string> { filter?: TValue; }
export interface IFirstWrapper<TValue = boolean> { first?: TValue; }
export interface IFlexWrapper<TFlex> { flex?: TFlex; }
export interface IFocusedWrapper { focused?: boolean; }
export interface IFocusEvent<TTarget = {}> extends React.FocusEvent<TTarget> {}
export interface IForceReloadWrapper { forceReload?: boolean; }
export interface IFormattedNameWrapper { formattedName?: string; }
export interface IFormatWrapper<TValue = string> { format?: TValue; }
export interface IFormConfigurationWrapper<TFormConfiguration> { formConfiguration?: TFormConfiguration; }
export interface IFormDataContentTypeWrapper { formDataContentType?: string; }
export interface IFormDataWrapper<TFormData = FormData> { formData?: TFormData; }
export interface IFormSectionWrapper<TValue = string> { formSection?: TValue; }
export interface IFormsSectionsWrapper<TFormsSections> { formsSections?: TFormsSections; }
export interface IFormWrapper<TForm> { form?: TForm; }
export interface IForwardedRefWrapper<TForwardedRef> { forwardedRef?: TForwardedRef; }
export interface IFromToEntity<TValue> extends IToWrapper<TValue>, IFromWrapper<TValue> {}
export interface IFromWrapper<TValue = string> { from?: TValue; }
export interface IFullSizeWrapper { fullSize?: boolean; }
export interface IFullWrapper<TValue = boolean> { full?: TValue; }
export interface IGetSelfWrapper<TValue = Element> { getSelf(): TValue; }
export interface IGoBackWrapper { goBack?(depth?: number): void; }
export interface IGridConfigurationWrapper<TValue> { gridConfiguration?: TValue; }
export interface IGroupableWrapper { groupable?: boolean; }
export interface IGroupByWrapper<TGroupBy> { groupBy?: TGroupBy; }
export interface IGroupedDataSorterWrapper<T1, T2> { groupedDataSorter?(t1?: T1, t2?: T1, t3?: T2, t4?: T2): number; }
export interface IGroupedRowsWrapper<TValue> { groupedRows?: TValue; }
export interface IGroupedWrapper { grouped?: boolean; }
export interface IGroupExpandedWrapper { groupExpanded?: boolean; }
export interface IHeaderClassNameWrapper { headerClassName?: string; }
export interface IHeaderColSpanWrapper { headerColSpan?: number; }
export interface IHeaderColumnClassNameWrapper<TClassName = string> { headerColumnClassName?: TClassName; }
export interface IHeaderColumnStylesWrapper<TStyles> { headerStyles?: TStyles; }
export interface IHeaderFormatWrapper<TValue = string> { headerFormat?: TValue; }
export interface IHeaderRenderedWrapper { headerRendered?: boolean; }
export interface IHeaderRendererWrapper<TPayload> { headerRenderer?(payload: TPayload): React.ReactNode; }
export interface IHeadersWrapper<THeaders = IKeyValue> { headers?: THeaders; }
export interface IHeaderWidthWrapper { headerWidth?: number; }
export interface IHeightRestrictedWrapper { heightRestricted?: boolean; }
export interface IHeightWrapper { height?: number; }
export interface IHideWrapper { hide?(): void; }
export interface IHighlightOddWrapper { highlightOdd?: boolean; }
export interface IHistoryWrapper<TValue> { history?: TValue; }
export interface IHomeWrapper<THome> { home?: THome; }
export interface IHoveredWrapper { hovered?: boolean; }
export interface IIconConfigurationWrapper<TValue> { iconConfiguration?: TValue; }
export interface IIconRightWrapper { iconRight?: boolean; }
export interface IIconWrapper<TValue = string> { icon?: TValue; }
export interface IIdWrapper<TValue = number> { id?: TValue; }
export interface IIgnoreEnterKeyWrapper { ignoreEnterKey?: boolean; }
export interface IIgnoreSelectedValueWrapper { ignoreSelectedValue?: boolean; }
export interface IIndexedWrapper { indexed?: boolean; }
export interface IIndexWrapper<TValue = number> { index?: TValue; }
export interface IInfoWrapper<TValue = string> { info?: TValue; }
export interface IInitialStateWrapper<TValue> { initialState?: TValue; }
export interface IInlineWrapper { inline?: boolean; }
export interface IInputFormatWrapper { inputFormat?: string; }
export interface IInputTimeFormatWrapper { inputTimeFormat?: string; }
export interface IIpWrapper<TIp = string> { ip?: TIp; }
export interface IIsFirstSelectedWrapper<TValue> { isFirstSelected?(payload?: TValue): boolean; }
export interface IIsLastSelectedWrapper<TValue> { isLastSelected?(payload?: TValue): boolean; }
export interface IIsOpenWrapper { isOpen?(): boolean; }
export interface IIsoWeekWrapper { isoWeek?: boolean; }
export interface IIsSelectedWrapper<TValue> { isSelected?(payload?: TValue): boolean; }
export interface IItemsWrapper<TValue> { items?: TValue; }
export interface IItemWrapper<TValue> { item?: TValue; }
export interface IKeepChangesWrapper { keepChanges?: boolean; }
export interface IKeyboardEvent<TValue = {}> extends React.KeyboardEvent<TValue> { }
export interface IKeyboardOpenWrapper { keyboardOpen?: boolean; }
export interface IKeyValue extends Record<string, AnyT> {}
export interface IKeyWrapper<TValue = string> { key?: TValue; }
export interface ILabelWrapper<TValue = string> { label?: TValue; }
export interface ILastWrapper<TValue = boolean> { last?: TValue; }
export interface ILatWrapper<TLat = number> { lat?: TLat; }
export interface ILayoutWrapper<TLayout> { layout?: TLayout; }
export interface ILazyLoadingWrapper { lazyLoading?: boolean; }
export interface ILeftSlotWrapper<TLeftSlot> { leftSlot?: TLeftSlot; }
export interface ILinkedSectionsWrapper { linkedSections?: string[]; }
export interface ILinkWrapper<TLink = string> { link?: TLink; }
export interface IListAccessorWrapper<TListAccessor> { listAccessor?: TListAccessor; }
export interface IListConfigurationWrapper<TProps> { listConfiguration?: TProps; }
export interface IListSectionWrapper<TListSection = string> { listSection?: TListSection; }
export interface IListsSectionsWrapper<TListsSections> { listsSections?: TListsSections; }
export interface IListWrapper<TList> { list?: TList; }
export interface ILngWrapper<TLng = number> { lng?: TLng; }
export interface ILoadingWrapper { loading?: boolean; }
export interface ILocalFilterWrapper<TValue = {}> { localFilter?(payload?: TValue): boolean; }
export interface ILocationWrapper<TValue> { location?: TValue; }
export interface ILockPageWrapper<TValue = boolean> { lockPage?: TValue; }
export interface ILockWrapper { lock?: boolean; }
export interface ILoginWrapper<TValue = string> { login?: TValue; }
export interface ILogoutWrapper<TValue = string> { logout?: TValue; }
export interface IManualValidationWrapper { manualValidation?: boolean; }
export interface IMappersWrapper<TValue> { mappers?: TValue; }
export interface IMarkerWrapper<TValue> { marker?: TValue; }
export interface IMaxCountWrapper { maxCount?: number; }
export interface IMaxDateWrapper<TValue = string> { maxDate?: TValue; }
export interface IMenuAnchorElementWrapper<TValue> { menuAnchorElement?: TValue; }
export interface IMenuConfigurationWrapper<TValue> { menuConfiguration?: TValue; }
export interface IMenuOptionsWrapper<TValue> { menuOptions?: TValue; }
export interface IMenuRenderedWrapper { menuRendered?: boolean; }
export interface IMergeStrategyWrapper<TValue> { mergeStrategy?: TValue; }
export interface IMessagesWrapper<TValue> { messages?: TValue; }
export interface IMessageWrapper<TValue = string> { message?: TValue; }
export interface IMethodWrapper { method?: string; }
export interface IMinDateWrapper<TValue = string> { minDate?: TValue; }
export interface IMiniWrapper { mini?: boolean; }
export interface IModeWrapper<TValue = string> { mode?: TValue; }
export interface IMonthWrapper<TValue = number> { month?: TValue; }
export interface IMultiWrapper { multi?: boolean; }
export interface INameWrapper<TValue = string> { name?: TValue; }
export interface INavigateBackWrapper { navigateBack?: boolean; }
export interface INewEntityWrapper<TValue = boolean> { newEntity?: TValue; }
export interface INextFormChangesWrapper<TValue> { nextFormChanges?: TValue; }
export interface INextFormRouteWrapper { nextFormRoute?: string; }
export interface INextFormSectionWrapper { nextFormSection?: string; }
export interface INextListSectionWrapper { nextListSection?: string; }
export interface INextSectionWrapper<TValue = string> { nextSection?: TValue; }
export interface INextWrapper<TValue> { next?: TValue; }
export interface INoAuthWrapper { noAuth?: boolean; }
export interface INoCacheWrapper { noCache?: boolean; }
export interface INoShrinkWrapper { noShrink?: boolean; }
export interface IOddWrapper { odd?: boolean; }
export interface IOnAcceptWrapper { onAccept?(...args: AnyT[]): void; }
export interface IOnActivateWrapper { onActivate?(): void; }
export interface IOnBeforeSubmitWrapper<TPayload, TResult = void> { onBeforeSubmit?(payload?: TPayload): TResult; }
export interface IOnChangePlaceWrapper<TPayload = {}> { onChangePlace?(payload?: TPayload): void; }
export interface IOnClickWrapper<TValue = {}> { onClick?(value?: TValue): void; }
export interface IOnCloseWrapper<TValue = () => void> { onClose?: TValue; }
export interface IOnColumnClickWrapper<TValue = AnyT> { onColumnClick?(value?: TValue): void; }
export interface IOnColumnContentClickWrapper<TValue = AnyT> { onColumnContentClick?(value?: TValue): void; }
export interface IOnDeactivateWrapper<TPayload = {}> { onDeactivate?(payload?: TPayload): void; }
export interface IOnDelayWrapper { onDelay?(): void; }
export interface IOnDictionaryFilterChangeWrapper<TValue> { onDictionaryFilterChange?: TValue; }
export interface IOnDownloadFileClickWrapper<TOnDownloadFileClick> { onDownloadFileClick?: TOnDownloadFileClick; }
export interface IOnEmptyDictionaryWrapper<TValue> { onEmptyDictionary?: TValue; }
export interface IOnEnterWrapper<TOnEnter> { onEnter?: TOnEnter; }
export interface IOnFilterChangeWrapper<TValue> { onFilterChange?: TValue; }
export interface IOnFilterClickWrapper<TOnFilterClick> { onFilterClick?: TOnFilterClick; }
export interface IOnInitWrapper<TValue = AnyT> { onInit?(payload?: TValue): void; }
export interface IOnLoadDictionaryWrapper<TValue> { onLoadDictionary?: TValue; }
export interface IOnRefreshClickWrapper<TOnRefreshClick> { onRefreshClick?: TOnRefreshClick; }
export interface IOnResetWrapper { onReset?(): void; }
export interface IOnScrollWrapper<TValue = {}> { onScroll?(payload?: TValue): void; }
export interface IOnSelectWrapper<TValue = {}> { onSelect?(payload?: TValue): void; }
export interface IOnSortingDirectionChangeWrapper<TPayload> { onSortingDirectionChange?(payload: TPayload): void; }
export interface IOnSubmitWrapper<TPayload = {}> { onSubmit?(payload?: TPayload): void; }
export interface IOnValidWrapper<TPayload = boolean> { onValid?(payload?: TPayload): void; }
export interface IOpenedWrapper<TValue = boolean> { opened?: TValue; }
export interface IOpenMenuWrapper<TPayload> { openMenu?(payload?: TPayload): void; }
export interface IOperationIdWrapper { operationId?: string; }
export interface IOperationWrapper<TValue = IIdWrapper<string>> { operation?: TValue; }
export interface IOptionsWrapper<TValue> { options?: TValue; }
export interface IOrderWrapper<TValue = number> { order?: TValue; }
export interface IOriginalDataWrapper<TValue = IEntity[]> { originalData?: TValue; }
export interface IOriginalEntityWrapper<TValue> { originalEntity?: TValue; }
export interface IOriginalValueWrapper<TValue = AnyT> { originalValue?: TValue; }
export interface IOutlinedWrapper { outlined?: boolean; }
export interface IOutputFormatWrapper { outputFormat?: string; }
export interface IOutputTimeFormatWrapper { outputTimeFormat?: string; }
export interface IOverlayBackgroundClassNameWrapper { overlayBackgroundClassName?: string; }
export interface IPageSizeWrapper<TValue = number> { pageSize?: TValue; }
export interface IPageWrapper<TPage = number> { page?: TPage; }
export interface IParamsWrapper<TValue = {}> { params?: TValue; }
export interface IParentClassNameWrapper<TValue = string> { parentClassName?: TValue; }
export interface IParentElementWrapper<TValue = Element> { parentElement?: TValue; }
export interface IParentWrapper<TParent> { parent?: TParent; }
export interface IPartOfGroupWrapper { partOfGroup?: boolean; }
export interface IPasswordWrapper<TValue = string> { password?: TValue; }
export interface IPathWrapper<TValue = string> { path?: TValue; }
export interface IPatternWrapper<TValue = string> { pattern?: TValue; }
export interface IPayloadWrapper<TValue = {}> { payload?: TValue; }
export interface IPerfectScrollWrapper<TValue> { perfectScroll?: TValue; }
export interface IPeriodWrapper<TValue = AnyT> { period?: TValue; }
export interface IPermissionsWrapper<TValue> { permissions?: TValue; }
export interface IPlaceActionRenderedWrapper { placeActionRendered?: boolean; }
export interface IPlaceEntityWrapper<TValue> { placeEntity?: TValue; }
export interface IPlaceholderWrapper { placeholder?: string; }
export interface IPlaceIdWrapper<TValue = string> { placeId?: TValue; }
export interface IPlacesWrapper<TValue> { places?: TValue; }
export interface IPlainValueWrapper { plainValue?: boolean; }
export interface IPluginsWrapper<TValue> { plugins?: TValue; }
export interface IPointsWrapper<TValue> { points?: TValue; }
export interface IPopupWrapper<TValue = boolean> { popup?: TValue; }
export interface IPositionConfigurationWrapper<TValue> { positionConfiguration?: TValue; }
export interface IPreventEffectsWrapper<TValue = boolean> { preventEffects?: TValue; }
export interface IPreventFocusWrapper { preventFocus?: boolean; }
export interface IPreviewScaleWrapper<TValue = number> { previewScale?: TValue; }
export interface IPreviousActionWrapper<TValue> { previousAction?: TValue; }
export interface IPreviousFormSectionWrapper { previousFormSection?: string; }
export interface IPreviousWrapper<TValue> { previous?: TValue; }
export interface IProfileWrapper<TValue> { profile?: TValue; }
export interface IProgressMessageWrapper<TValue = string> { progressMessage?: TValue; }
export interface IProgressWrapper { progress?: boolean; }
export interface IQueryParamsWrapper<TValue> { queryParams?: TValue; }
export interface IQueryWrapper<TValue = string> { query?: TValue; }
export interface IQueueWrapper<TValue> { queue?: TValue; }
export interface IRaisedWrapper { raised?: boolean; }
export interface IRangeEnabledWrapper { rangeEnabled?: boolean; }
export interface IRawDataWrapper<TValue = AnyT> { rawData?: TValue; }
export interface IReadOnlyWrapper { readOnly?: boolean; }
export interface IReadyWrapper { ready?: boolean; }
export interface IRefreshMapWrapper { refreshMap?: boolean; }
export interface IRefreshOnUpdateWrapper { refreshOnUpdate?: boolean; }
export interface IRegionWrapper<TValue = string> { region?: TValue; }
export interface IRelatedLinksWrapper<TValue> { relatedLinks?: TValue; }
export interface IRemoteFilterWrapper { remoteFilter?: boolean; }
export interface IRemoteSorterWrapper { remoteSorter?: boolean; }
export interface IRemovedFilesWrapper<TValue> { removedFiles?: TValue; }
export interface IRemovedWrapper<TValue = boolean> { removed?: TValue; }
export interface IRemoveWrapper<TValue> { remove?: TValue; }
export interface IRenderedWrapper { rendered?: boolean; }
export interface IRendererWrapper<T1 = AnyT, T2 = AnyT, T3 = AnyT> { renderer?(t1: T1, t2?: T2, t3?: T3): JSX.Element; }
export interface IReplacedWrapper<TValue = AnyT> { replaced?: TValue; }
export interface IReplaceRouteWrapper { replaceRoute?: boolean; }
export interface IReplaceWrapper<TValue = string> { replace?: TValue; }
export interface IRequestDataFactoryWrapper<TValue> { requestDataFactory?: TValue; }
export interface IRequestProviderWrapper<TValue> { requestProvider?: TValue; }
export interface IRequiredWrapper<TRequired = boolean> { required?: TRequired; }
export interface IResetActionRenderedWrapper { resetActionRendered?: boolean; }
export interface IResetConfigurationWrapper<TValue> { resetConfiguration?: TValue; }
export interface IResetIconWrapper<TResetIcon = string> { resetIcon?: TResetIcon; }
export interface IResetTextWrapper { resetText?: string; }
export interface IResponseFactoryWrapper<TValue> { responseFactory?: TValue; }
export interface IResponseReaderWrapper<TReader> { responseReader?: TReader; }
export interface IResponseTypeWrapper { responseType?: string; }
export interface IResponsiveWrapper<TResponsive = boolean> { responsive?: TResponsive; }
export interface IResultWrapper<TResult = AnyT> { result?: TResult; }
export interface IReturnNeverExecutablePeriodAsEmptyValueWrapper { returnNeverExecutablePeriodAsEmptyValue?: boolean; }
export interface IRightSlotWrapper<TRightSlot> { rightSlot?: TRightSlot; }
export interface IRippledWrapper<TRippled = boolean> { rippled?: TRippled; }
export interface IRobotDetectionMinSymbolsCountWrapper { robotDetectionMinSymbolsCount?: number; }
export interface IRouteConfigurationWrapper<TValue> { routeConfiguration?: TValue; }
export interface IRouteParamsWrapper<TValue = IKeyValue> { routeParams?: TValue; }
export interface IRowNumWrapper { rowNum?: number; }
export interface IRowWrapper<TRow = boolean> { row?: TRow; }
export interface IScaleWrapper<TScale = number> { scale?: TScale; }
export interface IScrollableWrapper { scrollable?: boolean; }
export interface ISectionNameWrapper { sectionName?: string; }
export interface ISectionWrapper<TSection = string> { section?: TSection; }
export interface ISelectableWrapper<TValue = boolean> { selectable?: TValue; }
export interface ISelectedDaysWrapper<TValue> { selectedDays?: TValue; }
export interface ISelectedElementClassNameWrapper { selectedElementClassName?: string; }
export interface ISelectedWrapper<TSelected = boolean> { selected?: TSelected; }
export interface ISelectWrapper<TValue = string> { select?: TValue; }
export interface ISettingsWrapper<TValue> { settings?: TValue; }
export interface IShowOnlyCurrentDaysWrapper { showOnlyCurrentDays?: boolean; }
export interface IShowWrapper { show?(): void; }
export interface ISignInWrapper<TSignIn> { signIn?: TSignIn; }
export interface ISmallWrapper<TSmall = boolean> { small?: TSmall; }
export interface ISortableWrapper { sortable?: boolean; }
export interface ISorterWrapper<TEntity = IEntity> { sorter?(entity1: TEntity, entity2: TEntity): number; }
export interface ISourceWrapper<TValue> { source?: TValue; }
export interface ISrcWrapper<TSrc = string> { src?: TSrc; }
export interface IStackWrapper<TStack> { stack?: TStack; }
export interface IStateWrapper<TState> { state?: TState; }
export interface IStatusTextWrapper { statusText?: string; }
export interface IStatusWrapper<TStatus = number> { status?: TStatus; }
export interface IStepWrapper<TStep = number> { step?: TStep; }
export interface IStickyElementClassNameWrapper { stickyElementClassName?: string; }
export interface IStickyHeadWrapper { stickyHead?: boolean; }
export interface IStreetNumberWrapper<TStreetNumber = string> { streetNumber?: TStreetNumber; }
export interface IStreetWrapper<TStreet = string> { street?: TStreet; }
export interface IStrictWrapper { strict?: boolean; }
export interface IStyleWrapper<TStyle> { style?: TStyle; }
export interface ISubmitConfigurationWrapper<TValue> { submitConfiguration?: TValue; }
export interface ISubmitIconWrapper<TIcon = string> { submitIcon?: TIcon; }
export interface ISubmitTextWrapper { submitText?: string; }
export interface ISucceedTextWrapper { succeedText?: string; }
export interface ISyntheticCursorWrapper<TValue = boolean> { syntheticCursor?: TValue; }
export interface ITabIndexWrapper { tabIndex?: number; }
export interface ITabPanelWrapper<TTabPanel = JSX.Element> { tabPanel?: TTabPanel; }
export interface ITextWrapper<TValue = string> { text?: TValue; }
export interface ITimeoutWrapper { timeout?: number; }
export interface ITimeWrapper<TTime = string> { time?: TTime; }
export interface ITitleWrapper { title?: string; }
export interface ITodayWrapper<TValue> { today?: TValue; }
export interface ITokenWrapper<TToken = string> { token?: TToken; }
export interface ITopTotalWrapper { topTotal?: boolean; }
export interface ITotalAmountWrapper<TTotalAmount = number> { totalAmount?: TTotalAmount; }
export interface ITotalCountWrapper<TValue = number> { totalCount?: TValue; }
export interface ITotalEntityWrapper<TValue = AnyT> { totalEntity?: TValue; }
export interface ITotalWrapper<TValue = boolean> { total?: TValue; }
export interface ITouchedWrapper { touched?: boolean; }
export interface IToWrapper<TValue = string> { to?: TValue; }
export interface ITplWrapper<TValue> { tpl?: TValue; }
export interface ITransportFactoryWrapper<TValue> { transportFactory?: TValue; }
export interface ITransportWrapper<TValue> { transport?: TValue; }
export interface ITypeWrapper<TValue = string> { type?: TValue; }
export interface IUniqueParamNameWrapper { uniqueParamName?: string; }
export interface IUnitWrapper<TValue> { unit?: TValue; }
export interface IUpdatedWrapper<TValue = boolean> { updated?: TValue; }
export interface IUpdateWrapper<TValue = string> { update?: TValue; }
export interface IUploadUrlWrapper { uploadUrl?: string; }
export interface IUrlFactoryWrapper<TValue> { urlFactory?: TValue; }
export interface IUrlProviderWrapper<TValue> { urlProvider?: TValue; }
export interface IUrlWrapper<TValue = string> { url?: TValue; }
export interface IUseFilterWrapper { useFilter?: boolean; }
export interface IUseKeyboardWrapper { useKeyboard?: boolean; }
export interface IUseLocalOptionsWrapper { useLocalOptions?: boolean; }
export interface IUsePreviewWrapper { usePreview?: boolean; }
export interface IUserWrapper<TValue = string> { user?: TValue; }
export interface IUseSyntheticCalendarWrapper { useSyntheticCalendar?: boolean; }
export interface IUseZipCodeWrapper { useZipCode?: boolean; }
export interface IUuidWrapper { uuid?: string; }
export interface IValidateOnMountWrapper { validateOnMount?: boolean; }
export interface IValidWrapper { valid?: boolean; }
export interface IValueWrapper<TValue = AnyT> { value?: TValue; }
export interface IViewerWrapper<TValue> { viewer?: TValue; }
export interface IVisibleWrapper { visible?: boolean; }
export interface IWaitingForOptionsWrapper { waitingForOptions?: boolean; }
export interface IWarningWrapper<TWarning = boolean> { warning?: TWarning; }
export interface IWidthWrapper<TValue = number> { width?: TValue; }
export interface IWithCredentialsWrapper { withCredentials?: boolean; }
export interface IWrapperClassNameWrapper<TWrapperClassName = string> { wrapperClassName?: TWrapperClassName; }
export interface IWrapperWrapper<TValue> { wrapper?: TValue; }
export interface IWrapWrapper { wrap?: boolean; }
export interface IXPositionWrapper { xPosition?: number | (() => number); }
export interface IXWrapper<TX = number> { x?: TX; }
export interface IYearWrapper<TValue = number> { year?: TValue; }
export interface IYPositionWrapper { yPosition?: number | (() => number); }
export interface IYWrapper<TY = number> { y?: TY; }
export interface IZipCodeWrapper<TZipCode = string> { zipCode?: TZipCode; }
export interface IZoneWrapper<TValue = string> { zone?: TValue; }
export interface IZoomWrapper { zoom?: number; }

/**
 * @stable [15.05.2018]
 */
export interface IToolbarWrapper<TToolbar = JSX.Element> {
  toolbar?: TToolbar;
}

/**
 * @stable [18.05.2018]
 */
export interface ISetFocusWrapper<TSetFocus = () => void> {
  setFocus: TSetFocus;
}

/**
 * @stable [18.05.2018]
 */
export interface IResetErrorWrapper<TResetError = () => void> {
  resetError: TResetError;
}

/**
 * @stable [02.05.2018]
 */
export interface IActionButtonsWrapper<TActionButtons> {
  actionButtons?: TActionButtons;
}

/**
 * @stable [02.05.2018]
 */
export interface IActionIconsWrapper<TActionIcons> {
  actionIcons?: TActionIcons;
}

/**
 * @stable [04.05.2018]
 */
export interface IUseIndicatorWrapper {
  useIndicator?: boolean;
}

/**
 * @stable [13.05.2018]
 */
export interface IOnRemoveWrapper<TItem = AnyT, TOnRemove = (item?: TItem) => void> {
  onRemove?: TOnRemove;
}

/**
 * @stable [04.05.2018]
 */
export interface IOnChangeWrapper<TChangedValue = AnyT, TOnChange = (value?: TChangedValue) => void> {
  onChange?: TOnChange;
}

/**
 * @stable [23.09.2018]
 */
export interface IOnGroupClickWrapper<TGroup = AnyT, TOnGroupClick = (value?: TGroup) => void> {
  onGroupClick?: TOnGroupClick;
}

/**
 * @stable [07.06.2018]
 */
export interface IOnChangeFilterWrapper<TChangedValue = AnyT, TOnChangeFilter = (value?: TChangedValue) => void> {
  onChangeFilter?: TOnChangeFilter;
}

/**
 * @stable [07.06.2018]
 */
export interface IOnChangeHeaderWrapper<TChangedValue = AnyT, TOnChangeHeader = (value?: TChangedValue) => void> {
  onChangeHeader?: TOnChangeHeader;
}

/**
 * @stable [07.06.2018]
 */
export interface IOnChangeBoolValueWrapper<TChangedValue = AnyT, TOnChangeGrouping = (value?: TChangedValue) => void> {
  onChangeBoolValue?(value?: TChangedValue): void;
}

/**
 * @stable [18.05.2018]
 */
export interface IOnChangeManuallyWrapper<TOnChangeManually = (...args) => void> {
  onChangeManually?: TOnChangeManually;
}

/**
 * @stable [28.11.2018]
 */
export interface IGetValueWrapper<TValue = AnyT> {
  getValue?(): TValue;
}

/**
 * @stable [18.05.2018]
 */
export interface IOnFocusWrapper<TPayload = AnyT, TOnFocus = (payload: TPayload) => void> {
  onFocus?: TOnFocus;
}

/**
 * @stable [18.05.2018]
 */
export interface IOnBlurWrapper<TPayload = AnyT, TOnBlur = (payload: TPayload) => void> {
  onBlur?: TOnBlur;
}

/**
 * @stable [06.06.2018]
 */
export interface IClearValueWrapper<TClearValue = () => void> {
  clearValue: TClearValue;
}

/**
 * @stable [18.05.2018]
 */
export interface IOnOpenWrapper<TOnOpen = () => void> {
  onOpen?: TOnOpen;
}

/**
 * @stable [31.05.2018]
 */
export interface INavigationActionTypeWrapper<TNavigationActionType = string> {
  navigationActionType?: TNavigationActionType;
}

/**
 * @stable [31.05.2018]
 */
export interface IOnMoreOptionsSelectWrapper<TPayload, TOnMoreOptionsSelect = (payload?: TPayload) => void> {
  onMoreOptionsSelect?: TOnMoreOptionsSelect;
}

/**
 * @stable [01.08.2018]
 */
export interface IPrefixLabelWrapper {
  prefixLabel?: string;
}

/**
 * @stable [31.07.2018]
 */
export interface IValidateWrapper<TValidatedValueResult = AnyT,
                                  TValidatedValue = AnyT,
                                  TValidate = (validatedValue?: TValidatedValue) => TValidatedValueResult> {
  validate?: TValidate;
}

/**
 * @stable [13.01.2019]
 */
export interface IRenderToBodyWrapper {
  renderToBody?: boolean;
}

/**
 * @stable [13.01.2019]
 */
export interface IKeyboardConfigurationWrapper<TKeyboardConfiguration> {
  keyboardConfiguration?: TKeyboardConfiguration;
}

/**
 * @stable [07.06.2018]
 */
export interface IFilterChangesWrapper<TChanges extends IKeyValue = IKeyValue> {
  filterChanges?: TChanges;
}

/**
 * @stable [23.09.2018]
 */
export interface IAvatarRenderedWrapper {
  avatarRendered?: boolean;
}

/**
 * @stable [18.05.2018]
 */
export interface INotUseFieldWrapper {
  notUseField?: boolean;
}

/**
 * @stable [31.07.2018]
 */
export interface IInputWrapper<TInput = HTMLInputElement | HTMLTextAreaElement> {
  input?: TInput;
}

/**
 * @stable [01.06.2018]
 */
export interface IFromDateWrapper<TFromDate = string> {
  fromDate?: TFromDate;
}

/**
 * @stable [01.06.2018]
 */
export interface IToDateWrapper<TToDate = string> {
  toDate?: TToDate;
}

/**
 * @stable [19.08.2018]
 */
export interface IFromTimeWrapper<TFromTime = string> {
  fromTime?: TFromTime;
}

/**
 * @stable [19.08.2018]
 */
export interface IToTimeWrapper<TToTime = string> {
  toTime?: TToTime;
}

export interface IFromDateFromTimeEntity extends IFromDateWrapper,
                                                 IFromTimeWrapper {
}

export interface IToDateToTimeEntity extends IToDateWrapper,
                                             IToTimeWrapper {
}

export interface IFromDateToDateEntity extends IFromDateWrapper,
                                               IToDateWrapper {
}

/**
 * @stable [11.06.2018]
 */
export interface IFontSizeWrapper {
  fontSize?: number;
}

/**
 * @stable [04.05.2018]
 */
export interface IMaskWrapper<TMask = Array<string|RegExp>> {
  mask?: TMask;
}

/**
 * @stable [04.05.2018]
 */
export interface IMaskGuideWrapper<TMaskGuide = boolean> {
  maskGuide?: TMaskGuide;
}

/**
 * @stable [04.05.2018]
 */
export interface IMaskPlaceholderCharWrapper<TMaskPlaceholderChar = string> {
  maskPlaceholderChar?: TMaskPlaceholderChar;
}

/**
 * @stable [24.09.2018]
 */
export interface IWestWrapper<TWest = JSX.Element> {
  west?: TWest;
}

/**
 * @stable [24.09.2018]
 */
export interface IEastWrapper<TEast = JSX.Element> {
  east?: TEast;
}

/**
 * @stable [27.04.2018]
 */
export interface IOpenWrapper<TOpen = boolean> {
  open?: TOpen;
}

/**
 * @stable [02.06.2018]
 */
export interface IErrorMessageRenderedWrapper {
  errorMessageRendered?: boolean;
}

/**
 * @stable [16.09.2018]
 */
export interface IFooterRenderedWrapper {
  footerRendered?: boolean;
}

/**
 * @stable [31.08.2018]
 */
export interface IResolverWrapper<TResolver> {
  resolver?: TResolver;
}

/**
 * @stable [31.08.2018]
 */
export interface ILazyLoadedResolverWrapper<TLazyLoadedResolver> {
  lazyLoadedResolver?: TLazyLoadedResolver;
}

/**
 * @stable [31.08.2018]
 */
export interface ILazyLoadedSectionWrapper<TLazyLoadedSection> {
  lazyLoadedSection?: TLazyLoadedSection;
}

/**
 * @stable [18.05.2018]
 */
export interface ISimpleWrapper<TSimple = boolean> {
  simple?: TSimple;
}

/**
 * @stable [02.06.2018]
 */
export interface IEmptyDataMessageWrapper<TEmptyDataMessage = string> {
  emptyDataMessage?: TEmptyDataMessage;
}

/**
 * @stable [07.06.2018]
 */
export interface ITplFnWrapper<TItem = IEntity, TResult = StringNumberT> extends ITplWrapper<(item: TItem) => TResult> {
}

/**
 * @stable [04.10.2018]
 */
export interface ITitleRendererWrapper<TItem = string, TRenderer = (item?: TItem) => JSX.Element> {
  titleRenderer?: TRenderer;
}

/**
 * @stable [22.10.2018]
 */
export interface ISubBorderWrapper<TSubBorder = boolean> {
  subBorder?: TSubBorder;
}

/**
 * @stable [14.05.2018]
 */
export interface IFilterFnWrapper<TFilteredItem = IEntity, TFilter = (item: TFilteredItem) => boolean>
  extends IFilterWrapper<TFilter> {
}

/**
 * @stable [07.08.2018]
 */
export interface ITopTitleWrapper<TTopTitle = string> {
  topTitle?: TTopTitle;
}

/**
 * @stable [08.05.2018]
 */
export interface IPositionWrapper<TPosition = number> {
  position?: TPosition;
}

/**
 * @stable [31.05.2018]
 */
export interface IMoreOptionsWrapper<TMoreOptions> {
  moreOptions?: TMoreOptions;
}

/**
 * @stable [08.05.2018]
 */
export interface IUseUppercaseWrapper {
  useUppercase?: boolean;
}

/**
 * @stable [01.02.2019]
 */
export interface IErrorMessageWrapper<TErrorMessage = string> {
  errorMessage?: TErrorMessage;
}

/**
 * @stable [17.06.2018]
 */
export interface IStringErrorWrapper extends IErrorWrapper<string> {
}

/**
 * @stable [17.06.2018]
 */
export interface IChangeFormWrapper<TChangeForm> {
  changeForm?: TChangeForm;
}

/**
 * @stable [29.05.2018]
 */
export interface ICustomErrorWrapper<TCustomError = boolean> {
  customError?: TCustomError;
}

/**
 * @stable [22.08.2018]
 */
export interface IRelatedEntityWrapper<TRelatedEntity = IEntity> {
  relatedEntity?: TRelatedEntity;
}

/**
 * @stable [02.05.2018]
 */
export interface IRippableWrapper<TRippable = boolean> {
  rippable?: TRippable;
}

/**
 * @stable [03.10.2018]
 */
export interface ICenteredWrapper<TCentered = boolean> {
  centered?: TCentered;
}

/**
 * @stable [03.10.2018]
 */
export interface IBackwardRenderedWrapper<TBackwardRendered = boolean> {
  backwardRendered?: TBackwardRendered;
}

/**
 * @stable [03.10.2018]
 */
export interface IForwardRenderedWrapper<TForwardRendered = boolean> {
  forwardRendered?: TForwardRendered;
}

/* @stable - 19.04.2018 */
export interface ITransparentWrapper<TTransparent> {
  transparent?: TTransparent;
}

/* @stable - 19.04.2018 */
export interface IIconLeftWrapper<TIconLeft> {
  iconLeft?: TIconLeft;
}

export interface IContentWrapper<TContent = JSX.Element> { content?: TContent; }

/**
 * @stable [20.09.2018]
 */
export interface ISeparatorWrapper<TSeparator = boolean> {
  separator?: TSeparator;
}

/**
 * @stable [28.06.2018]
 */
export interface IUseDownloadActionWrapper {
  useDownloadAction?: boolean;
}

/**
 * @stable [28.06.2018]
 */
export interface IUseCameraWrapper {
  useCamera?: boolean;
}

/**
 * @stable [02.08.2018]
 */
export interface ICameraEnabledWrapper {
  cameraEnabled?: boolean;
}

/**
 * @stable [28.06.2018]
 */
export interface ICameraWidthWrapper {
  cameraWidth?: number;
}

/**
 * @stable [28.06.2018]
 */
export interface ICameraHeightWrapper {
  cameraHeight?: number;
}

/**
 * @stable [28.06.2018]
 */
export interface IFileNameWrapper {
  fileName?: string;
}

/**
 * @stable [03.09.2018]
 */
export interface ICaretBlinkingFrequencyTimeoutWrapper {
  caretBlinkingFrequencyTimeout?: number;
}

/**
 * @stable [04.09.2018]
 */
export interface ICaretVisibilityWrapper {
  caretVisibility?: boolean;
}

/**
 * @stable [04.09.2018]
 */
export interface ICaretPositionWrapper {
  caretPosition?: number;
}

/**
 * @stable [29.05.2018]
 */
export interface IFilterFormWrapper<TFilterForm> {
  filterForm?: TFilterForm;
}

/**
 * @stable [31.05.2018]
 */
export interface IFooterWrapper<TFooter = JSX.Element> {
  footer?: TFooter;
}

export interface ISubmitWrapper<TPayload = AnyT> { submit?(payload?: TPayload): void; }

/* @stable - 19.04.2018 */
export interface IOnPressWrapper<TOnPress> {
  onPress?: TOnPress;
}

/**
 * @stable [17.08.2018]
 */
export interface IOnClearWrapper<TOnClear = () => void> {
  onClear?: TOnClear;
}

/**
 * @stable [22.08.2018]
 */
export interface IAfterShowWrapper<TAfterShow = () => void> {
  afterShow?: TAfterShow;
}

/* @stable - 31.03.2018 */
export interface IOnCreateWrapper<TOnCreate = () => void> {
  onCreate?: TOnCreate;
}

/**
 * @stable [02.06.2018]
 */
export interface IDeactivatedWrapper {
  deactivated?: boolean;
}

/**
 * @stable [18.05.2018]
 */
export interface IOnApplyWrapper<TAppliedValue = AnyT, TOnApply = (value?: TAppliedValue) => void> {
  onApply?: TOnApply;
}

/**
 * @stable [26.08.2018]
 */
export interface IOnRefreshWrapper<TOnRefresh = () => void> {
  onRefresh?: TOnRefresh;
}

/**
 * @stable [08.06.2018]
 */
export interface ITypeIdWrapper<TTypeId = EntityIdT> {
  typeId?: TTypeId;
}

/**
 * @stable [08.06.2018]
 */
export interface ITypeNameWrapper {
  typeName?: string;
}

/**
 * @stable [10.09.2018]
 */
export interface IColSpanWrapper {
  colSpan?: number;
}

/**
 * @stable [10.09.2018]
 */
export interface IColumnColSpanWrapper {
  columnColSpan?: number;
}

/**
 * @stable [18.06.2018]
 */
export interface IDisplayMessageWrapper<TDisplayMessage = string> {
  displayMessage?: TDisplayMessage;
}

/**
 * @stable [17.06.2018]
 */
export interface IAppVersionWrapper {
  appVersion?: string;
}

/**
 * @stable [07.01.2019]
 */
export interface ICurrentTimeWrapper<TCurrentDate> {
  currentTime?: TCurrentDate;
}

/* @stable - 15.04.2018 */
export interface INotificationWrapper<TNotification> {
  notification?: TNotification;
}

/* @stable - 20.04.2018 */
export interface IStringToWrapper extends IToWrapper<string> {
}

/**
 * @stable [10.09.2019]
 */
export enum UniCodesEnum {
  ARROW_RIGHT = '\u27f6',
  ASYMP = '\u2248',
  DASH = '\u2014',
  N_DASH = '\u2013',
  NO_BREAK_SPACE = '\u00a0',
  SPACE = '\u0020',
}

/**
 * @deprecated
 */
export const UNI_CODES = {
  dash: '\u2014',
  infinity: '\u221e',
  nDash: '\u2013',
  space: '\u0020',
  noBreakSpace: '\u00a0',
  arrowRight:  '\u27f6',
  crarr: '\u21b5',
  lfloor: '\u230a',
};

export type ChangeEventT = React.ChangeEvent<{ value: AnyT, name?: string }>;
