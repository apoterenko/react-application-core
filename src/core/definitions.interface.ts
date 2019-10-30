import * as React from 'react';
import * as R from 'ramda';

export type AnyT = any;
export type StringNumberT = number | string;
export type EntityIdT = StringNumberT;
export const FIRST_PAGE = 1;
export const ONE_DOLLAR_VALUE = 1;
export const DEFAULT_CURRENCY_PRECISION_VALUE = 2;
export const DEFAULT_PAGE_SIZE = 50;
export const DEFAULT_MAX_PAGE_SIZE = 1000000;
export const DEFAULT_TIME_FROM = '00:00:00';
export const DEFAULT_TIME_TO = '23:59:59';
export const NEW_OPTION = 'new';
export const UNDEF = void 0;
export const UNDEF_SYMBOL = Symbol('UNDEF');
export const CLEAR_DIRTY_CHANGES_VALUE = UNDEF;
export const ACTION_PREFIX = '$$-RAC-';
export const APPLICATION_PDF_FORMAT = 'application/pdf';
export const IMAGE_JPG_FORMAT = 'image/jpg';
export const IMAGE_JPEG_FORMAT = 'image/jpeg';
export const IMAGE_PNG_FORMAT = 'image/png';

/**
 * @stable [15.09.2018]
 */
export const DAYS_OF_WEEK: Array<{id: number, name: string}> = [
  {id: 0, name: 'Sunday'},
  {id: 1, name: 'Monday'},
  {id: 2, name: 'Tuesday'},
  {id: 3, name: 'Wednesday'},
  {id: 4, name: 'Thursday'},
  {id: 5, name: 'Friday'},
  {id: 6, name: 'Saturday'}
];
export const DAYS_OF_WEEK_MAP = R.mergeAll<Record<number, boolean>>(DAYS_OF_WEEK.map((day) => ({[day.id]: true})));

/**
 * Core fields
 */
export const ID_FIELD_NAME = 'id';                                                              /* @stable [02.07.2018] */
export const FROM_DATE_FIELD_NAME = 'fromDate';
export const TO_DATE_FIELD_NAME = 'toDate';
export const FROM_TIME_FIELD_NAME = 'fromTime';
export const TO_TIME_FIELD_NAME = 'toTime';
export const TIME_FIELD_NAME = 'time';
/**
 * @deprecated
 */
export const NAME_FIELD_NAME = 'name';                                                          /* @stable [16.08.2018] */
export const REGION_FIELD_NAME = 'region';                                                      /* @stable [01.08.2018] */
export const CITY_FIELD_NAME = 'city';                                                          /* @stable [04.08.2018] */

/* @stable [23.04.2018] */
export interface IEmptyDataWrapper<TEmptyData> {
  emptyData?: TEmptyData;
}

/* @stable [23.04.2018] */
export interface IBooleanEmptyDataWrapper extends IEmptyDataWrapper<boolean> {
}

export interface I$$dialogFormChangesConfirmStoreProxyWrapper<TValue> { $$dialogFormChangesConfirmStoreProxy?: TValue; }
export interface I$$dictionaryStoreProxyWrapper<TValue> { $$dictionaryStoreProxy?: TValue; }
export interface I$$formStoreProxyWrapper<TValue> { $$formStoreProxy?: TValue; }
export interface I$$nameWrapper { $$name?: string; }
export interface I$$permissionStoreProxyWrapper<TValue> { $$permissionStoreProxy?: TValue; }
export interface I$$transportStoreProxyWrapper<TValue> { $$transportStoreProxy?: TValue; }
export interface IAcceptableWrapper { acceptable?: boolean; }
export interface IAccessConfigurationWrapper<TAccessConfiguration> { accessConfiguration?: TAccessConfiguration; }
export interface IActionsDisabledWrapper { actionsDisabled?: boolean; }
export interface IActionsFactoryWrapper<TValue> { actionsFactory?: TValue; }
export interface IActionsPosition<TActionsPosition> { actionsPosition?: TActionsPosition; }
export interface IActionsRenderedWrapper { actionsRendered?: boolean; }
export interface IActionsWrapper<TActions> { actions?: TActions; }
export interface IActionWrapper<TAction> { action?: TAction; }
export interface IActivateDialogWrapper { activateDialog?(): void; }
export interface IActivateWrapper { activate?(): void; }
export interface IActiveActionsWrapper<TActions> { activeActions?: TActions; }
export interface IActiveValueWrapper<TActiveValue = number> { activeValue?: TActiveValue; }
export interface IActiveWrapper<TActive = boolean> { active?: TActive; }
export interface IAddApiWrapper { addApi?: string; }
export interface IAddedFilesWrapper<TValue> { addedFiles?: TValue; }
export interface IAddWrapper<TValue> { add?: TValue; }
export interface IAlignWrapper<TAlign = string> { align?: TAlign; }
export interface IAlwaysDirtyWrapper { alwaysDirty?: boolean; }
export interface IAlwaysResettableWrapper { alwaysResettable?: boolean; }
export interface IApiUrlWrapper { apiUrl?: string; }
export interface IApplicationWrapper<TApplication> { application?: TApplication; }
export interface IAreaWrapper<TArea = string> { area?: TArea; }
export interface IAuthorizedWrapper { authorized?: boolean; }
export interface IAuthWrapper<TAuth = string> { auth?: TAuth; }
export interface IAutoCompleteWrapper<TAutoComplete = string> { autoComplete?: TAutoComplete; }
export interface IAutoFocusWrapper { autoFocus?: boolean; }
export interface IAutoResetWrapper { autoReset?: boolean; }
export interface IBarcodeWrapper<TBarcode = string> { barcode?: TBarcode; }
export interface IBindDictionaryWrapper<TBindDictionary = string> { bindDictionary?: TBindDictionary; }
export interface IBlobDataContentTypeWrapper { blobDataContentType?: string; }
export interface IBlobDataWrapper<TValue = Blob> { blobData?: TValue; }
export interface IBlobResponseWrapper<TValue = boolean> { blobResponse?: TValue; }
export interface IBlockWrapper<TBlock = boolean> { block?: TBlock; }
export interface IBoolWrapper { bool?: boolean; }
export interface IBorderedWrapper { bordered?: boolean; }
export interface IButtonConfigurationWrapper<TValue> { buttonConfiguration?: TValue; }
export interface ICancelTokenWrapper<TValue = string> { cancelToken?: TValue; }
export interface ICenteredMenuWrapper { centeredMenu?: boolean; }
export interface IChangeableWrapper { changeable?: boolean; }
export interface IChangeEvent<TTarget = IValueWrapper> extends React.ChangeEvent<TTarget> {}
export interface IChangesWrapper<TChanges extends IKeyValue = IKeyValue> { changes?: TChanges; }
export interface IChannelWrapper<TChannel = string> { channel?: TChannel; }
export interface IChildrenWrapper<TChildren> { children?: TChildren; }
export interface ICityWrapper<TCity = string> { city?: TCity; }
export interface IClassNameWrapper<TClassName = string> { className?: TClassName; }
export interface IClosableWrapper { closable?: boolean; }
export interface ICloseWrapper<TClose> { close?: TClose; }
export interface ICodeWrapper<TCode = string> { code?: TCode; }
export interface IColumnClassNameWrapper<TClassName = string> { columnClassName?: TClassName; }
export interface IColumnNameWrapper { columnName?: string; }
export interface IColumnRenderedWrapper { columnRendered?: boolean; }
export interface IColumnsConfigurationWrapper<TValue> { columnsConfiguration?: TValue; }
export interface IColumnStylesWrapper<TStyles> { columnStyles?: TStyles; }
export interface IColumnTitleWrapper<TColumnTitle = string> { columnTitle?: TColumnTitle; }
export interface IColumnWidthWrapper { columnWidth?: number; }
export interface ICompactWrapper<TCompact = boolean> { compact?: TCompact; }
export interface IConnectedWrapper<TConnected = boolean> { connected?: TConnected; }
export interface ICountryWrapper<TCountry = string> { country?: TCountry; }
export interface ICustomActionsWrapper<TValue> { customActions?: TValue; }
export interface IDataProviderWrapper<TValue> { dataProvider?: TValue; }
export interface IDataWrapper<TData = AnyT[]> { data?: TData; }
export interface IDateNowWrapper<TValue = number> { dateNow?: TValue; }
export interface IDefaultSrcWrapper<TDefaultSrc = string> { defaultScr?: TDefaultSrc; }
export interface IDefaultValueWrapper<TDefaultValue = AnyT> { defaultValue?: TDefaultValue; }
export interface IDelayTimeoutWrapper<TDelayTimeout = number> { delayTimeout?: TDelayTimeout; }
export interface IDestroySectionsWrapper<TValue = string[]> { destroySections?: TValue; }
export interface IDestroyWrapper<TValue = string> { destroy?: TValue; }
export interface IDetectFileTypeTransportConfigurationWrapper<TValue> { detectFileTypeTransportConfiguration?: TValue; }
export interface IDetectFileTypeWrapper { detectFileType?: boolean; }
export interface IDialogOpenedWrapper<TOpened = boolean> { dialogOpened?: TOpened; }
export interface IDictionariesWrapper<TDictionaries> { dictionaries?: TDictionaries; }
export interface IDirectionsWrapper<TDirections> { directions?: TDirections; }
export interface IDirectionWrapper<TDirection = string> { direction?: TDirection; }
export interface IDirtyWrapper { dirty?: boolean; }
export interface IDisabledWrapper<TValue = boolean> { disabled?: TValue; }
export interface IDisplayNameWrapper { displayName?: string; }
export interface IDisplayValueWrapper<TDisplayValue = string> { displayValue?: TDisplayValue; }
export interface IEditApiWrapper { editApi?: string; }
export interface IEditedWrapper { edited?: boolean; }
export interface IEditWrapper<TValue> { edit?: TValue; }
export interface IEmptyMessageWrapper<TValue = string> { emptyMessage?: TValue; }
export interface IEmptyValueWrapper<TValue = AnyT> { emptyValue?: TValue; }
export interface IEntity extends IEntityIdTWrapper, IKeyValue {}
export interface IEntityIdTWrapper extends IIdWrapper<EntityIdT> {}
export interface IEntityIdWrapper<TEntityId = EntityIdT> { entityId?: TEntityId; }
export interface IEntityWrapper<TEntity = IEntity> { entity?: TEntity; }
export interface IErrorWrapper<TError = boolean> { error?: TError; }
export interface IExpandActionRenderedWrapper { expandActionRendered?: boolean; }
export interface IExpandedGroupsWrapper<TExpandedGroups> { expandedGroups?: TExpandedGroups; }
export interface IFactorWrapper<TFactor = number> { factor?: TFactor; }
export interface IFieldRenderedWrapper { fieldRendered?: boolean; }
export interface IFieldsWrapper<TFields> { fields?: TFields; }
export interface IFieldWrapper<TField> { field?: TField; }
export interface IFilePathWrapper { filePath?: string; }
export interface IFilesWrapper<TValue> { files?: TValue; }
export interface IFilterPlaceholderWrapper { filterPlaceholder?: string; }
export interface IFilterRendererWrapper<TPayload> { filterRenderer?(payload: TPayload): JSX.Element; }
export interface IFilterWrapper<TFilter = string> { filter?: TFilter; }
export interface IFlexWrapper<TFlex> { flex?: TFlex; }
export interface IFocusedWrapper { focused?: boolean; }
export interface IFocusEvent<TTarget = {}> extends React.FocusEvent<TTarget> {}
export interface IForceReloadWrapper { forceReload?: boolean; }
export interface IFormatWrapper<TFormat = string> { format?: TFormat; }
export interface IFormConfigurationWrapper<TFormConfiguration> { formConfiguration?: TFormConfiguration; }
export interface IFormDataContentTypeWrapper { formDataContentType?: string; }
export interface IFormDataWrapper<TFormData = FormData> { formData?: TFormData; }
export interface IFormSectionWrapper<TFormSection = string> { formSection?: TFormSection; }
export interface IFormsSectionsWrapper<TFormsSections> { formsSections?: TFormsSections; }
export interface IFormWrapper<TForm> { form?: TForm; }
export interface IForwardedRefWrapper<TForwardedRef> { forwardedRef?: TForwardedRef; }
export interface IFullSizeWrapper { fullSize?: boolean; }
export interface IFullWrapper<TFull = boolean> { full?: TFull; }
export interface IGetSelfWrapper<TValue = Element> { getSelf(): TValue; }
export interface IGoBackWrapper { goBack?(): void; }
export interface IGridConfigurationWrapper<TValue> { gridConfiguration?: TValue; }
export interface IGroupableWrapper { groupable?: boolean; }
export interface IGroupByWrapper<TGroupBy> { groupBy?: TGroupBy; }
export interface IGroupedDataSorterWrapper<T1, T2> { groupedDataSorter?(t1?: T1, t2?: T1, t3?: T2, t4?: T2): number; }
export interface IGroupedWrapper { grouped?: boolean; }
export interface IGroupExpandedWrapper { groupExpanded?: boolean; }
export interface IHeaderClassNameWrapper { headerClassName?: string; }
export interface IHeaderColSpanWrapper { headerColSpan?: number; }
export interface IHeaderColumnClassNameWrapper<TClassName = string> { headerColumnClassName?: TClassName; }
export interface IHeaderColumnStylesWrapper<TStyles> { headerStyles?: TStyles; }
export interface IHeaderRenderedWrapper { headerRendered?: boolean; }
export interface IHeaderRendererWrapper<TPayload> { headerRenderer?(payload: TPayload): React.ReactNode; }
export interface IHeadersWrapper<THeaders = IKeyValue> { headers?: THeaders; }
export interface IHeaderWidthWrapper { headerWidth?: number; }
export interface IHeightWrapper { height?: number; }
export interface IHideWrapper { hide?(): void; }
export interface IHighlightExpandedGroupWrapper { highlightExpandedGroup?: boolean; }
export interface IHighlightOddWrapper { highlightOdd?: boolean; }
export interface IHistoryWrapper<TValue> { history?: TValue; }
export interface IHomeWrapper<THome> { home?: THome; }
export interface IHoveredWrapper { hovered?: boolean; }
export interface IIconConfigurationWrapper<TValue> { iconConfiguration?: TValue; }
export interface IIconWrapper<TIcon = string> { icon?: TIcon; }
export interface IIdWrapper<TId = number> { id?: TId; }
export interface IIgnoreEnterKeyWrapper { ignoreEnterKey?: boolean; }
export interface IIndexedWrapper { indexed?: boolean; }
export interface IIndexWrapper<TIndex = number> { index?: TIndex; }
export interface IInfoWrapper<TInfo = string> { info?: TInfo; }
export interface IInitialStateWrapper<TValue> { initialState?: TValue; }
export interface IInlineWrapper { inline?: boolean; }
export interface IIpWrapper<TIp = string> { ip?: TIp; }
export interface IIsOpenWrapper { isOpen?(): boolean; }
export interface IItemsWrapper<TItems> { items?: TItems; }
export interface IItemWrapper<TItem> { item?: TItem; }
export interface IKeyboardEvent<TTarget = {}> extends React.KeyboardEvent<TTarget> { }
export interface IKeyboardOpenWrapper { keyboardOpen?: boolean; }
export interface IKeyValue extends Record<string, AnyT> {}
export interface ILabelWrapper<TLabel = string> { label?: TLabel; }
export interface ILargeWrapper<TLarge = boolean> { large?: TLarge; }
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
export interface ILocalFilterWrapper<TPayload = AnyT> { localFilter?(payload?: TPayload): boolean; }
export interface ILocationWrapper<TLocation> { location?: TLocation; }
export interface ILockWrapper { lock?: boolean; }
export interface ILoginWrapper<TLogin = string> { login?: TLogin; }
export interface ILogoutWrapper<TLogout> { logout?: TLogout; }
export interface IMappersWrapper<TMappers> { mappers?: TMappers; }
export interface IMarkerWrapper<TMarker> { marker?: TMarker; }
export interface IMaxCountWrapper { maxCount?: number; }
export interface IMenuConfigurationWrapper<TMenuConfiguration> { menuConfiguration?: TMenuConfiguration; }
export interface IMenuOptionsWrapper<TMenuOptions> { menuOptions?: TMenuOptions; }
export interface IMergerWrapper<TMerger> { merger?: TMerger; }
export interface IMergeStrategyWrapper<TValue> { mergeStrategy?: TValue; }
export interface IMessagesWrapper<TMessages> { messages?: TMessages; }
export interface IMessageWrapper<TMessage = string> { message?: TMessage; }
export interface IMethodWrapper { method?: string; }
export interface IMiniWrapper { mini?: boolean; }
export interface IModeWrapper<TMode = string> { mode?: TMode; }
export interface IMultiWrapper { multi?: boolean; }
export interface INameWrapper<TName = string> { name?: TName; }
export interface INavigateBackWrapper { navigateBack?: boolean; }
export interface INewEntityWrapper<TNewEntity = boolean> { newEntity?: TNewEntity; }
export interface INextFormChangesWrapper<TChanges> { nextFormChanges?: TChanges; }
export interface INextFormRouteWrapper { nextFormRoute?: string; }
export interface INextFormSectionWrapper { nextFormSection?: string; }
export interface INextListSectionWrapper { nextListSection?: string; }
export interface INextSectionWrapper<TValue = string> { nextSection?: TValue; }
export interface INoAuthWrapper { noAuth?: boolean; }
export interface INoCacheWrapper { noCache?: boolean; }
export interface INoShrinkWrapper { noShrink?: boolean; }
export interface IOddWrapper { odd?: boolean; }
export interface IOnBeforeSubmitWrapper<TOnBeforeSubmit> { onBeforeSubmit?: TOnBeforeSubmit; }
export interface IOnClickWrapper<TValue = AnyT> { onClick?(payload?: TValue): void; }
export interface IOnCloseWrapper<TValue = () => void> { onClose?: TValue; }
export interface IOnColumnClickWrapper<TValue = AnyT> { onColumnClick?(payload?: TValue): void; }
export interface IOnDeactivateWrapper<TDeactivate> { onDeactivate?: TDeactivate; }
export interface IOnDelayWrapper { onDelay?(): void; }
export interface IOnDictionaryFilterChangeWrapper<TValue> { onDictionaryFilterChange?: TValue; }
export interface IOnDownloadFileClickWrapper<TOnDownloadFileClick> { onDownloadFileClick?: TOnDownloadFileClick; }
export interface IOnEmptyDictionaryWrapper<TValue> { onEmptyDictionary?: TValue; }
export interface IOnFilterChangeWrapper<TValue> { onFilterChange?: TValue; }
export interface IOnFilterClickWrapper<TOnFilterClick> { onFilterClick?: TOnFilterClick; }
export interface IOnLoadDictionaryWrapper<TValue> { onLoadDictionary?: TValue; }
export interface IOnRefreshClickWrapper<TOnRefreshClick> { onRefreshClick?: TOnRefreshClick; }
export interface IOnResetWrapper<TValue> { onReset?: TValue; }
export interface IOnScrollWrapper<TPayload = AnyT> { onScroll?(payload?: TPayload): void; }
export interface IOnSelectWrapper<TValue = AnyT> { onSelect?(payload?: TValue): void; }
export interface IOnSortingDirectionChangeWrapper<TPayload> { onSortingDirectionChange?(payload: TPayload): void; }
export interface IOnSubmitWrapper<TValue> { onSubmit?: TValue; }
export interface IOnValidWrapper<TValue> { onValid?: TValue; }
export interface IOpenedWrapper<TOpened = boolean> { opened?: TOpened; }
export interface IOperationIdWrapper { operationId?: string; }
export interface IOperationWrapper<TOperation = IIdWrapper<string>> { operation?: TOperation; }
export interface IOptionsWrapper<TOptions> { options?: TOptions; }
export interface IOriginalDataWrapper<TOriginalData = IEntity[]> { originalData?: TOriginalData; }
export interface IOriginalEntityWrapper<TOriginalEntity> { originalEntity?: TOriginalEntity; }
export interface IOriginalValueWrapper<TOriginalValue = AnyT> { originalValue?: TOriginalValue; }
export interface IOutlinedWrapper { outlined?: boolean; }
export interface IOverlayBackgroundClassNameWrapper { overlayBackgroundClassName?: string; }
export interface IPageWrapper<TPage = number> { page?: TPage; }
export interface IParamsWrapper<TParams = IKeyValue> { params?: TParams; }
export interface IParentWrapper<TParent> { parent?: TParent; }
export interface IPasswordWrapper<TPassword = string> { password?: TPassword; }
export interface IPathWrapper<TPath = string> { path?: TPath; }
export interface IPatternWrapper<TPattern = string> { pattern?: TPattern; }
export interface IPayloadWrapper<TPayload = AnyT> { payload?: TPayload; }
export interface IPermissionsWrapper<TValue> { permissions?: TValue; }
export interface IPlaceEntityWrapper<TPlaceEntity> { placeEntity?: TPlaceEntity; }
export interface IPlaceholderWrapper { placeholder?: string; }
export interface IPlaceIdWrapper<TPlaceId = string> { placeId?: TPlaceId; }
export interface IPlaceWrapper<TPlace = string> { place?: TPlace; }
export interface IPointsWrapper<TPoints> { points?: TPoints; }
export interface IPopupWrapper<TPopup = boolean> { popup?: TPopup; }
export interface IPreventEffectsWrapper<TValue = boolean> { preventEffects?: TValue; }
export interface IPreventFocusWrapper { preventFocus?: boolean; }
export interface IPreviewScaleWrapper<TScale = number> { previewScale?: TScale; }
export interface IPreviousActionWrapper<TValue> { previousAction?: TValue; }
export interface IPreviousFormSectionWrapper { previousFormSection?: string; }
export interface IProfileWrapper<TProfile> { profile?: TProfile; }
export interface IProgressMessageWrapper<TProgressMessage = string> { progressMessage?: TProgressMessage; }
export interface IProgressWrapper { progress?: boolean; }
export interface IQueryParamsWrapper<TQueryParams> { queryParams?: TQueryParams; }
export interface IQueryWrapper<TQuery = string> { query?: TQuery; }
export interface IQueueWrapper<TQueue> { queue?: TQueue; }
export interface IRaisedWrapper { raised?: boolean; }
export interface IRawDataWrapper<TRawData = AnyT> { rawData?: TRawData; }
export interface IReadOnlyWrapper { readOnly?: boolean; }
export interface IReadyWrapper { ready?: boolean; }
export interface IRefreshMapWrapper { refreshMap?: boolean; }
export interface IRegionWrapper<TRegion = string> { region?: TRegion; }
export interface IRelatedLinksWrapper<TValue> { relatedLinks?: TValue; }
export interface IRemoteFilterWrapper { remoteFilter?: boolean; }
export interface IRemoteSorterWrapper { remoteSorter?: boolean; }
export interface IRemovedFilesWrapper<TValue> { removedFiles?: TValue; }
export interface IRemovedWrapper<TRemoved = boolean> { removed?: TRemoved; }
export interface IRemoveWrapper<TValue> { remove?: TValue; }
export interface IRenderedWrapper { rendered?: boolean; }
export interface IRendererWrapper<T1 = AnyT, T2 = AnyT, T3 = AnyT> { renderer?(t1: T1, t2?: T2, t3?: T3): JSX.Element; }
export interface IReplacedWrapper<TReplaced = AnyT> { replaced?: TReplaced; }
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
export interface IRightSlotWrapper<TRightSlot> { rightSlot?: TRightSlot; }
export interface IRippledWrapper<TRippled = boolean> { rippled?: TRippled; }
export interface IRobotDetectionMinSymbolsCountWrapper { robotDetectionMinSymbolsCount?: number; }
export interface IRoundedWrapper { rounded?: boolean; }
export interface IRouteParamsWrapper<TValue = IKeyValue> { routeParams?: TValue; }
export interface IRowWrapper<TRow = boolean> { row?: TRow; }
export interface IScaleWrapper<TScale = number> { scale?: TScale; }
export interface ISectionNameWrapper { sectionName?: string; }
export interface ISectionWrapper<TSection = string> { section?: TSection; }
export interface ISelectableWrapper { selectable?: boolean; }
export interface ISelectedElementClassNameWrapper { selectedElementClassName?: string; }
export interface ISelectedWrapper<TSelected = boolean> { selected?: TSelected; }
export interface ISelectWrapper<TValue = string> { select?: TValue; }
export interface ISettingsWrapper<TValue> { settings?: TValue; }
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
export interface IStyleWrapper<TStyle> { style?: TStyle; }
export interface ISubmitConfigurationWrapper<TValue> { submitConfiguration?: TValue; }
export interface ISubmitIconWrapper<TIcon = string> { submitIcon?: TIcon; }
export interface ISubmitTextWrapper { submitText?: string; }
export interface ISucceedMessageWrapper { succeedMessage?: string; }
export interface ISuccessWrapper<TSuccess = boolean> { success?: TSuccess; }
export interface ISyntheticCursorWrapper<TValue = boolean> { syntheticCursor?: TValue; }
export interface ITabIndexWrapper { tabIndex?: number; }
export interface ITabPanelWrapper<TTabPanel = JSX.Element> { tabPanel?: TTabPanel; }
export interface ITitleWrapper { title?: string; }
export interface ITokenWrapper<TToken = string> { token?: TToken; }
export interface ITooltipWrapper<TTooltip = string> { tooltip?: TTooltip; }
export interface ITopTotalWrapper { topTotal?: boolean; }
export interface ITotalAmountWrapper<TTotalAmount = number> { totalAmount?: TTotalAmount; }
export interface ITotalWrapper<TValue = boolean> { total?: TValue; }
export interface ITouchedWrapper { touched?: boolean; }
export interface IToWrapper<TValue = string> { to?: TValue; }
export interface ITplWrapper<TValue> { tpl?: TValue; }
export interface ITransportFactoryWrapper<TValue> { transportFactory?: TValue; }
export interface ITransportWrapper<TValue> { transport?: TValue; }
export interface ITypeWrapper<TValue = string> { type?: TValue; }
export interface IUniqueParamNameWrapper { uniqueParamName?: string; }
export interface IUpdatedWrapper<TValue = boolean> { updated?: TValue; }
export interface IUpdateWrapper<TValue = string> { update?: TValue; }
export interface IUploadUrlWrapper { uploadUrl?: string; }
export interface IUrlFactoryWrapper<TValue> { urlFactory?: TValue; }
export interface IUrlProviderWrapper<TValue> { urlProvider?: TValue; }
export interface IUrlWrapper<TValue = string> { url?: TValue; }
export interface IUseFilterWrapper { useFilter?: boolean; }
export interface IUseKeyboardWrapper { useKeyboard?: boolean; }
export interface IUsePreviewWrapper { usePreview?: boolean; }
export interface IUserWrapper<TUser = string> { user?: TUser; }
export interface IUuidWrapper { uuid?: string; }
export interface IValidateOnMountWrapper { validateOnMount?: boolean; }
export interface IValidWrapper { valid?: boolean; }
export interface IValueWrapper<TValue = AnyT> { value?: TValue; }
export interface IViewerWrapper<TViewer> { viewer?: TViewer; }
export interface IVisibleWrapper { visible?: boolean; }
export interface IWarningWrapper<TWarning = boolean> { warning?: TWarning; }
export interface IWidthWrapper<TWidth = number> { width?: TWidth; }
export interface IWithCredentialsWrapper { withCredentials?: boolean; }
export interface IWrapperClassNameWrapper<TWrapperClassName = string> { wrapperClassName?: TWrapperClassName; }
export interface IWrapWrapper { wrap?: boolean; }
export interface IXPositionWrapper { xPosition?: number | (() => number); }
export interface IXWrapper<TX = number> { x?: TX; }
export interface IYPositionWrapper { yPosition?: number | (() => number); }
export interface IYWrapper<TY = number> { y?: TY; }
export interface IZipCodeWrapper<TZipCode = string> { zipCode?: TZipCode; }
export interface IZoomWrapper { zoom?: number; }

/**
 * @stable [15.05.2018]
 */
export interface IToolbarWrapper<TToolbar = JSX.Element> {
  toolbar?: TToolbar;
}

/* @stable - 11.04.2018 */
export interface IBasenameWrapper {
  basename?: string;
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
 * @stable [16.12.2018]
 */
export interface IChannelsWrapper<TChannels = string> {
  channels?: TChannels;
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
 * @stable [29.07.2018]
 */
export interface IOnChangePlaceWrapper<TChangedValue = AnyT, TOnChangePlace = (value?: TChangedValue) => void> {
  onChangePlace?: TOnChangePlace;
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
 * @stable [20.08.2018]
 */
export interface INeedToOpenMenuWrapper {
  needToOpenMenu?: boolean;
}

/**
 * @stable [01.08.2018]
 */
export interface IPrefixLabelWrapper {
  prefixLabel?: string;
}

/* @stable - 23.04.2018 */
export interface IPluginsWrapper<TPlugins> {
  plugins?: TPlugins;
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
 * @stable [17.05.2018]
 */
export interface IAcceptDisabledWrapper {
  acceptDisabled?: boolean;
}

/**
 * @stable [17.05.2018]
 */
export interface ICloseDisabledWrapper {
  closeDisabled?: boolean;
}

/**
 * @stable [18.05.2018]
 */
export interface INotUseFieldWrapper {
  notUseField?: boolean;
}

/**
 * @stable [01.08.2018]
 */
export interface INotUsePlaceActionWrapper {
  notUsePlaceAction?: boolean;
}

/**
 * @stable [01.08.2018]
 */
export interface INotUseCustomValidatorWrapper {
  notUseCustomValidator?: boolean;
}

/**
 * @stable [19.08.2018]
 */
export interface INotUseActiveValueFilterWrapper {
  notUseActiveValueFilter?: boolean;
}

/**
 * @stable [01.08.2018]
 */
export interface IUseZipCodeWrapper {
  useZipCode?: boolean;
}

/**
 * @stable [31.07.2018]
 */
export interface IInputWrapper<TInput = HTMLInputElement | HTMLTextAreaElement> {
  input?: TInput;
}

/**
 * @stable [02.06.2018]
 */
export interface IDateWrapper<TDate = string> {
  date?: TDate;
}

/**
 * @stable [02.06.2018]
 */
export interface ITimeWrapper<TTime = string> {
  time?: TTime;
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
 * @stable [09.05.2018]
 */
export interface ITotalCountWrapper<TTotalCount = number> {
  totalCount?: TTotalCount;
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
 * @stable [17.05.2018]
 */
export interface IRemovedEntityWrapper<TEntity extends IEntity = IEntity> extends IRemovedWrapper<TEntity> {
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
 * @stable [09.05.2018]
 */
export interface IPageSizeWrapper<TPageSize = number> {
  pageSize?: TPageSize;
}

/**
 * @stable [09.05.2018]
 */
export interface ILockPageWrapper<TLockPage = boolean> {
  lockPage?: TLockPage;
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
 * @stable [22.08.2018]
 */
export interface ITimeoutWrapper {
  timeout?: number;
}

/**
 * @stable [31.08.2018]
 */
export interface IAliasWrapper<TAlias = string> {
  alias?: TAlias;
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
 * @stable [15.09.2018]
 */
export interface IClearActionWrapper {
  clearActionRendered?: boolean;
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
 * @stable [17.05.2018]
 */
export interface ICloseMessageWrapper<TCloseMessage = string> {
  closeMessage?: TCloseMessage;
}

/**
 * @stable [17.05.2018]
 */
export interface IAcceptMessageWrapper<TAcceptMessage = string> {
  acceptMessage?: TAcceptMessage;
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
 * @stable [31.07.2018]
 */
export interface IOnInitWrapper<TOnInit = (...args: AnyT[]) => void> {
  onInit?: TOnInit;
}

/**
 * @stable [17.06.2018]
 */
export interface IValidationGroupWrapper<TValidationGroup = string> {
  validationGroup?: TValidationGroup;
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
 * @stable [04.07.2018]
 */
export interface IApiEntityWrapper<TApiEntity> {
  apiEntity?: TApiEntity;
}

/**
 * @stable [27.12.2018]
 */
export interface ITotalEntityWrapper<TTotalEntity> {
  totalEntity?: TTotalEntity;
}

/* @stable - 12.04.2018 */
export interface IExtraParamsWrapper<TExtraParams> {
  extraParams?: TExtraParams;
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

/**
 * @stable [09.06.2018]
 */
export interface ITextWrapper<TText = string> {
  text?: TText;
}

/* @stable - 19.04.2018 */
export interface ITransparentWrapper<TTransparent> {
  transparent?: TTransparent;
}

/* @stable - 19.04.2018 */
export interface IBooleanTransparentWrapper extends ITransparentWrapper<boolean> {
}

/* @stable - 19.04.2018 */
export interface IIconLeftWrapper<TIconLeft> {
  iconLeft?: TIconLeft;
}

/* @stable - 19.04.2018 */
export interface IBooleanIconLeftWrapper extends IIconLeftWrapper<boolean> {
}

export interface ITextStyleWrapper<TTextStyle> {
  textStyle?: TTextStyle;
}

/* @stable - 20.04.2018 */
export interface IModalWrapper<TModal> {
  modal?: TModal;
}

export interface IContentWrapper<TContent = JSX.Element> { content?: TContent; }

/* @stable - 20.04.2018 */
export interface IBooleanModalWrapper extends IModalWrapper<boolean> {
}

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

/* @stable - 19.04.2018 */
export interface IIconStyleWrapper<TIconStyle = IKeyValue> {
  iconStyle?: TIconStyle;
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

/* @stable - 19.04.2018 */
export interface IDefaultOnPressWrapper extends IOnPressWrapper<() => void> {
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

/**
 * @stable [17.05.2018]
 */
export interface IOnAcceptWrapper<TOnAccept = (...args: AnyT[]) => void> {
  onAccept?: TOnAccept;
}

/* @stable - 31.03.2018 */
export interface IOnCreateWrapper<TOnCreate = () => void> {
  onCreate?: TOnCreate;
}

/**
 * @stable [18.05.2018]
 */
export interface IOnActivateWrapper<TOnActivate = () => void> {
  onActivate?: TOnActivate;
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

/* @stable - 14.04.2018 */
export interface IExactWrapper {
  exact?: boolean;
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

/* @stable - 14.04.2018 */
export interface IHideNavBarWrapper {
  hideNavBar?: boolean;
}

/* @stable [26.04.2018] */
export interface IInitialWrapper<TInitial> {
  initial?: TInitial;
}

/* @stable - 14.04.2018 */
export interface IBeforeEnterWrapper<TBeforeEnter> {
  beforeEnter?: TBeforeEnter;
}

/* @stable - 20.04.2018 */
export interface IOnEnterWrapper<TOnEnter> {
  onEnter?: TOnEnter;
}

/* @stable - 14.04.2018 */
export interface IAfterEnterWrapper<TAfterEnter> {
  afterEnter?: TAfterEnter;
}

/* @stable - 14.04.2018 */
export interface IComputedMatchWrapper<TComputedMatch> {
  computedMatch?: TComputedMatch;
}

/**
 * @stable [18.06.2018]
 */
export interface IDisplayMessageWrapper<TDisplayMessage = string> {
  displayMessage?: TDisplayMessage;
}

/* @stable - 15.04.2018 */
export interface ICallbackWrapper<TCallback> {
  callback?: TCallback;
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

/**
 * @stable [19.09.2018]
 */
export interface IKeyWrapper<TKey = string> {
  key?: TKey;
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
