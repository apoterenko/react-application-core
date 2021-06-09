import * as React from 'react';
import { IBaseEvent } from './definition';

export const ACTION_PREFIX = '$$-RAC-';
export const UNDEF = void 0;
export const UNDEF_SYMBOL = Symbol('UNDEF');
export type AnyT = any;
export type EntityIdT = StringNumberT;
export type ResultFnT<TResult, TArg1 = unknown, TArg2 = unknown, TArg3 = unknown> = TResult | ((arg1?: TArg1, arg2?: TArg2, arg3?: TArg3) => TResult);
export type BooleanFnT<TArg1 = unknown, TArg2 = unknown, TArg3 = unknown> = ResultFnT<boolean, TArg1, TArg2, TArg3>;
export type StringFnT<TArg1 = unknown, TArg2 = unknown, TArg3 = unknown> = ResultFnT<string, TArg1, TArg2, TArg3>;
export type StringNumberT = number | string;

/**
 * @stable [24.05.2021]
 */
export interface IClosableWrapper<TValue = boolean> { closable?: TValue; }
export interface IInlineOptionConfigurationWrapper<TValue> { inlineOptionConfiguration?: TValue; }
export interface ILengthWrapper<TValue = number> { length?: TValue; }
export interface IMarkerWrapper<TValue> { marker?: TValue; }
export interface IRefreshWrapper<TValue = boolean> { refresh?: TValue; }
export interface ITypeWrapper<TValue = string> { type?: TValue; }
export interface IVisibleWrapper<TValue = boolean> { visible?: TValue; }
export interface IZoomWrapper<TValue = number> { zoom?: TValue; }

/**/
export interface I$$cachedValueWrapper<TValue> { $$cachedValue?: TValue; }
export interface IAcceptableWrapper { acceptable?: boolean; }
export interface IAcceptActionConfigurationWrapper<TValue> { acceptActionConfiguration?: TValue; }
export interface IAcceptDisabledWrapper { acceptDisabled?: boolean; }
export interface IAcceptTextWrapper { acceptText?: string; }
export interface IAcceptWrapper<TValue = string> { accept?: TValue; }
export interface IAccessConfigurationWrapper<TValue> { accessConfiguration?: TValue; }
export interface IAccessDeniedWrapper<TValue> { accessDenied?: TValue; }
export interface IActionConfigurationWrapper<TValue> { actionConfiguration?: TValue; }
export interface IActionsFactoryWrapper<TValue> { actionsFactory?: TValue; }
export interface IActionsPositionWrapper<TValue> { actionsPosition?: TValue; }
export interface IActionsRenderedWrapper { actionsRendered?: boolean; }
export interface IActionsWrapper<TValue> { actions?: TValue; }
export interface IActionWrapper<TValue> { action?: TValue; }
export interface IActivateDialogWrapper { activateDialog?(): void; }
export interface IActivateWrapper<TValue = {}> { activate?(payload?: TValue): void; }
export interface IActiveGroupWrapper<TValue> { activeGroup?: TValue; }
export interface IActiveToolsWrapper<TValue> { activeTools?: TValue; }
export interface IActiveValueWrapper<TValue = number> { activeValue?: TValue; }
export interface IActiveWrapper<TValue = boolean> { active?: TValue; }
export interface IAddApiWrapper { addApi?: string; }
export interface IAddedFilesWrapper<TValue> { addedFiles?: TValue; }
export interface IAddWrapper<TValue> { add?: TValue; }
export interface IAfterEnterWrapper<TValue> { afterEnter?: TValue; }
export interface IAheadValueWrapper<TValue> { aheadValue?: TValue; }
export interface IAliasWrapper<TValue = string> { alias?: TValue; }
export interface IAlignItemsCenterWrapper { alignItemsCenter?: boolean; }
export interface IAlignItemsEndWrapper { alignItemsEnd?: boolean; }
export interface IAlignItemsStartWrapper { alignItemsStart?: boolean; }
export interface IAlignItemsStretchWrapper { alignItemsStretch?: boolean; }
export interface IAlignWrapper<TValue = string> { align?: TValue; }
export interface IAllGroupsExpandedWrapper { allGroupsExpanded?: boolean; }
export interface IAllowEmptyFilterValueWrapper { allowEmptyFilterValue?: boolean; }
export interface IAllowSingleTabWrapper { allowSingleTab?: boolean; }
export interface IAlwaysDirtyWrapper { alwaysDirty?: boolean; }
export interface IAlwaysResettableWrapper { alwaysResettable?: boolean; }
export interface IAnchoredWrapper { anchored?: boolean; }
export interface IAnchorElementWrapper<TValue> { anchorElement?: TValue; }
export interface IApiEntityWrapper<TValue> { apiEntity?: TValue; }
export interface IApiUrlWrapper { apiUrl?: string; }
export interface IApplicationWrapper<TValue> { application?: TValue; }
export interface IAreaWrapper<TValue = string> { area?: TValue; }
export interface IAreGroupsReadyWrapper { areGroupsReady?: boolean; }
export interface IAsyncLibsWrapper<TValue> { asyncLibs?: TValue; }
export interface IAuthorizedWrapper { authorized?: boolean; }
export interface IAuthWrapper<TValue = string> { auth?: TValue; }
export interface IAutoCompleteWrapper<TValue = string> { autoComplete?: TValue; }
export interface IAutoFocusWrapper { autoFocus?: boolean; }
export interface IAutoResetWrapper { autoReset?: boolean; }
export interface IAutoScrollToInitPositionWrapper<TValue = boolean> { autoScrollToInitPosition?: TValue; }
export interface IAutoUnsubscribingWrapper { autoUnsubscribing?: boolean; }
export interface IBackActionConfigurationWrapper<TValue = boolean> { backActionConfiguration?: TValue; }
export interface IBarcodeWrapper<TValue = string> { barcode?: TValue; }
export interface IBasenameWrapper { basename?: string; }
export interface IBeforeEnterWrapper<TValue> { beforeEnter?: TValue; }
export interface IBirthdayWrapper { birthday?: string; }
export interface IBlobDataContentTypeWrapper { blobDataContentType?: string; }
export interface IBlobDataWrapper<TValue = Blob> { blobData?: TValue; }
export interface IBlobResponseWrapper<TValue = boolean> { blobResponse?: TValue; }
export interface IBlobUrlWrapper { blobUrl?: string; }
export interface IButtonConfigurationWrapper<TValue> { buttonConfiguration?: TValue; }
export interface ICalendarActionRenderedWrapper { calendarActionRendered?: boolean; }
export interface ICalendarConfigurationWrapper<TValue> { calendarConfiguration?: TValue; }
export interface ICalendarEntityConfigurationWrapper<TValue> { calendarEntityConfiguration?: TValue; }
export interface ICalendarEntityWrapper<TValue> { calendarEntity?: TValue; }
// @ts-ignore
export interface ICallbackWrapper<TValue = (payload?: TPayload) => void, TPayload = unknown> { callback?: TValue; }
export interface ICameraActionDisabledWrapper { cameraActionDisabled?: boolean; }
export interface ICancelTokenWrapper<TValue = string> { cancelToken?: TValue; }
export interface ICaptureWrapper<TValue = boolean> { capture?: TValue; }
export interface ICaretBlinkingFrequencyWrapper { caretBlinkingFrequency?: number; }
export interface ICaretPositionWrapper { caretPosition?: number; }
export interface ICaretVisibilityWrapper { caretVisibility?: boolean; }
export interface IChangeableWrapper { changeable?: boolean; }
export interface IChangeEvent<TValue = IValueWrapper> extends React.ChangeEvent<TValue> {}
export interface IChangesWrapper<TValue = {}> { changes?: TValue; }
export interface IChannelsWrapper<TValue = string> { channels?: TValue; }
export interface IChannelWrapper<TValue = string> { channel?: TValue; }
export interface IChatDialogContentWrapper<TValue = React.ReactNode> { chatDialogContent?: TValue; }
export interface ICheckModalWrapper { checkModal?: boolean; }
export interface IChildrenWrapper<TValue> { children?: TValue; }
export interface ICityWrapper<TValue = string> { city?: TValue; }
export interface IClassNameWrapper<TValue = string> { className?: TValue; }
export interface IClearActionRenderedWrapper { clearActionRendered?: boolean; }
export interface IClosableOverlayWrapper { closableOverlay?: boolean; }
export interface ICloseActionConfigurationWrapper<TValue> { closeActionConfiguration?: TValue; }
export interface ICloseDisabledWrapper { closeDisabled?: boolean; }
export interface IClosedWrapper { closed?: boolean; }
export interface ICloseTextWrapper { closeText?: string; }
export interface ICodeWrapper<TValue = string> { code?: TValue; }
export interface IColSpanWrapper { colSpan?: number; }
export interface IColumnClassNameWrapper<TValue = string> { columnClassName?: TValue; }
export interface IColumnNameWrapper { columnName?: string; }
export interface IColumnNumWrapper { columnNum?: number; }
export interface IColumnRenderedWrapper { columnRendered?: boolean; }
export interface IColumnsConfigurationWrapper<TValue> { columnsConfiguration?: TValue; }
export interface IColumnStyleWrapper<TValue> { columnStyle?: TValue; }
export interface IColumnTitleWrapper<TValue = string> { columnTitle?: TValue; }
export interface IColumnWidthWrapper<TValue = number> { columnWidth?: TValue; }
export interface IColumnWrapper<TValue> { column?: TValue; }
export interface ICompactWrapper<TValue = boolean> { compact?: TValue; }
export interface IComputedMatchWrapper<TValue> { computedMatch?: TValue; }
export interface IConditionWrapper<TValue> { condition?: TValue; }
export interface IConfirmWrapper { confirm?: boolean; }
export interface IConnectedWrapper<TValue = boolean> { connected?: TValue; }
export interface IContainerSectionWrapper<TValue = string> { containerSection?: TValue; }
export interface IContainerWrapper<TValue> { container?: TValue; }
export interface IContentBorderWrapper<TValue = boolean> { contentBorder?: TValue; }
export interface IContentWrapper<TValue = React.ReactNode> { content?: TValue; }
export interface IContentWrapperElementWrapper<TValue> { contentWrapperElement?: TValue; }
export interface IConverterWrapper<TValue> { converter?: TValue; }
export interface ICountryAbbrWrapper<TValue = string> { countryAbbr?: TValue; }
export interface ICountryWrapper<TValue = string> { country?: TValue; }
export interface ICronDayWrapper<TValue = number> { cronDay?: TValue; }
export interface ICurrentWrapper<TValue> { current?: TValue; }
export interface ICursorPositionWrapper<TValue = number> { cursorPosition?: TValue; }
export interface ICursorWrapper<TValue> { cursor?: TValue; }
export interface ICustomActionsWrapper<TValue> { customActions?: TValue; }
export interface IDataProviderWrapper<TValue> { dataProvider?: TValue; }
export interface IDataWrapper<TValue = AnyT[]> { data?: TValue; }
export interface IDateNowWrapper<TValue = number> { dateNow?: TValue; }
export interface IDateWrapper<TValue = string> { date?: TValue; }
export interface IDaysLabelsWrapper<TValue> { daysLabels?: TValue; }
export interface IDaysWrapper<TValue> { days?: TValue; }
export interface IDayWrapper<TValue = number> { day?: TValue; }
export interface IDecoratedWrapper { decorated?: boolean; }
export interface IDefaultChangesWrapper<TChanges = {}> { defaultChanges?: TChanges; }
export interface IDefaultLayoutConfigurationWrapper<TValue> { defaultLayoutConfiguration?: TValue; }
export interface IDefaultLayoutPropsWrapper<TValue> { defaultLayoutProps?: TValue; }
export interface IDefaultSrcWrapper<TDefaultSrc = string> { defaultScr?: TDefaultSrc; }
export interface IDefaultValueWrapper<TDefaultValue = AnyT> { defaultValue?: TDefaultValue; }
export interface IDefaultWrapper { default?: boolean; }
export interface IDegreeWrapper<TValue = number> { degree?: TValue; }
export interface IDelayTimeoutWrapper<TValue = number> { delayTimeout?: TValue; }
export interface IDepthWrapper { depth?: number; }
export interface IDestroySectionsWrapper<TValue = string[]> { destroySections?: TValue; }
export interface IDestroyWrapper<TValue = string> { destroy?: TValue; }
export interface IDetectFileTypeTransportConfigurationWrapper<TValue> { detectFileTypeTransportConfiguration?: TValue; }
export interface IDetectFileTypeWrapper { detectFileType?: boolean; }
export interface IDialogClassNameWrapper { dialogClassName?: string; }
export interface IDialogConfigurationWrapper<TValue> { dialogConfiguration?: TValue; }
export interface IDialogOpenedWrapper<TValue = boolean> { dialogOpened?: TValue; }
export interface IDictionariesWrapper<TValue> { dictionaries?: TValue; }
export interface IDictionaryWrapper<TValue = string> { dictionary?: TValue; }
export interface IDiffWrapper<TValue> { diff?: TValue; }
export interface IDirectionsWrapper<TValue> { directions?: TValue; }
export interface IDirectionWrapper<TValue = string> { direction?: TValue; }
export interface IDirtyWrapper { dirty?: boolean; }
export interface IDisabledWrapper<TValue = boolean> { disabled?: TValue; }
export interface IDisableLabelWrapper { disableLabel?: string; }
export interface IDispatchWrapper<TValue = unknown> { dispatch?(value: TValue): void; }
export interface IDisplayMessageWrapper<TValue = string> { displayMessage?: TValue; }
export interface IDisplayNameWrapper { displayName?: string; }
export interface IDisplayValueRenderedOnlyWrapper { displayValueRenderedOnly?: boolean; }
export interface IDisplayValueWrapper<TValue = string> { displayValue?: TValue; }
export interface IDrawerHeaderLogoRenderedWrapper { drawerHeaderLogoRendered?: boolean; }
export interface IDrawerHeaderRenderedWrapper { drawerHeaderRendered?: boolean; }
export interface IDurationWrapper<TValue> { duration?: TValue; }
export interface IEastWrapper<TValue = JSX.Element> { east?: TValue; }
export interface IEditApiWrapper { editApi?: string; }
export interface IEditedWrapper { edited?: boolean; }
export interface IEditWrapper<TValue> { edit?: TValue; }
export interface IElementWrapper<TValue = Element> { element?: TValue; }
export interface IEmptyDataMessageWrapper<TValue = string> { emptyDataMessage?: TValue; }
export interface IEmptyDataWrapper<TValue = boolean> { emptyData?: TValue; }
export interface IEmptyMessageWrapper<TValue = string> { emptyMessage?: TValue; }
export interface IEmptyValueWrapper<TValue = AnyT> { emptyValue?: TValue; }
export interface IEntity extends IEntityIdTWrapper, IKeyValue {}
export interface IEntityIdTWrapper extends IIdWrapper<EntityIdT> {}
export interface IEntityIdWrapper<TValue = EntityIdT> { entityId?: TValue; }
export interface IEntityWrapper<TEntity = IEntity> { entity?: TEntity; }
export interface IErrorMessageRenderedWrapper { errorMessageRendered?: boolean; }
export interface IErrorWrapper<TValue = boolean> { error?: TValue; }
export interface IEventNameWrapper { eventName?: string; }
export interface IEventWrapper<TValue = Event> { event?: TValue; }
export interface IExactWrapper { exact?: boolean; }
export interface IExpandActionRenderedWrapper { expandActionRendered?: boolean; }
export interface IExpandedGroupsWrapper<TValue = {}> { expandedGroups?: TValue; }
export interface IExtraActionsWrapper<TValue> { extraActions?: TValue; }
export interface IExtraParamsWrapper<TValue> { extraParams?: TValue; }
export interface IFactorWrapper<TValue = number> { factor?: TValue; }
export interface IFieldConfigurationWrapper<TValue> { fieldConfiguration?: TValue; }
export interface IFieldRenderedWrapper { fieldRendered?: boolean; }
export interface IFieldsWrapper<TValue = {}> { fields?: TValue; }
export interface IFieldWrapper<TValue> { field?: TValue; }
export interface IFilePathWrapper { filePath?: string; }
export interface IFilesWrapper<TValue> { files?: TValue; }
export interface IFilterPlaceholderWrapper { filterPlaceholder?: string; }
export interface IFilterRendererWrapper<TPayload> { filterRenderer?(payload: TPayload): JSX.Element; }
export interface IFiltersSectionsWrapper<TValue> { filtersSections?: TValue; }
export interface IFilterWrapper<TValue = string> { filter?: TValue; }
export interface IFirstAllowedWrapper { firstAllowed?: boolean; }
export interface IFirstWrapper<TValue = boolean> { first?: TValue; }
export interface IFocusedWrapper { focused?: boolean; }
export interface IFooterRenderedWrapper { footerRendered?: boolean; }
export interface IFooterWrapper<TValue = JSX.Element> { footer?: TValue; }
export interface IForceReloadWrapper { forceReload?: boolean; }
export interface IFormattedNameWrapper { formattedName?: string; }
export interface IFormatWrapper<TValue = string> { format?: TValue; }
export interface IFormConfigurationWrapper<TFormConfiguration> { formConfiguration?: TFormConfiguration; }
export interface IFormDataContentTypeWrapper { formDataContentType?: string; }
export interface IFormDataWrapper<TValue = FormData> { formData?: TValue; }
export interface IFormIdWrapper { formId?: string; }
export interface IFormSectionWrapper<TValue = string> { formSection?: TValue; }
export interface IFormsSectionsWrapper<TValue> { formsSections?: TValue; }
export interface IFormWrapper<TValue> { form?: TValue; }
export interface IForwardActionConfigurationWrapper<TValue> { forwardActionConfiguration?: TValue; }
export interface IForwardedRefWrapper<TValue> { forwardedRef?: TValue; }
export interface IFromToEntity<TValue> extends IToWrapper<TValue>, IFromWrapper<TValue> {}
export interface IFromWrapper<TValue = string> { from?: TValue; }
export interface IFullscreenEnabledWrapper { fullscreenEnabled?: boolean; }
export interface IFullSizeWrapper { fullSize?: boolean; }
export interface IFullWrapper<TValue = boolean> { full?: TValue; }
export interface IGetSelfWrapper<TValue = Element> { getSelf(): TValue; }
export interface IGoBackWrapper { goBack?(depth?: number): void; }
export interface IGoogleMapsConfigurationWrapper<TValue> { googleMapsConfiguration?: TValue; }
export interface IGridConfigurationWrapper<TValue> { gridConfiguration?: TValue; }
export interface IGroupByWrapper<TValue> { groupBy?: TValue; }
export interface IGroupedDataSorterWrapper<T1, T2> { groupedDataSorter?(t1?: T1, t2?: T1, t3?: T2, t4?: T2): number; }
export interface IGroupedRowsWrapper<TValue> { groupedRows?: TValue; }
export interface IGroupExpandedWrapper { groupExpanded?: boolean; }
export interface IGroupNameWrapper { groupName?: string; }
export interface IGroupValueWrapper<TValue> { groupValue?: TValue; }
export interface IGroupWrapper { group?: boolean; }
export interface IHasPreviousWrapper { hasPrevious?: boolean; }
export interface IHeaderClassNameWrapper<TValue = string> { headerClassName?: TValue; }
export interface IHeaderColSpanWrapper { headerColSpan?: number; }
export interface IHeaderColumnClassNameWrapper<TValue = string> { headerColumnClassName?: TValue; }
export interface IHeaderConfigurationWrapper<TValue> { headerConfiguration?: TValue; }
export interface IHeaderRenderedWrapper { headerRendered?: boolean; }
export interface IHeaderRendererWrapper<TPayload> { headerRenderer?(payload: TPayload): React.ReactNode; }
export interface IHeaderStyleWrapper<TValue> { headerStyle?: TValue; }
export interface IHeadersWrapper<THeaders = IKeyValue> { headers?: THeaders; }
export interface IHeaderWidthWrapper<TValue = number> { headerWidth?: TValue; }
export interface IHeaderWrapper<TValue = JSX.Element> { header?: TValue; }
export interface IHeightRestrictedWrapper { heightRestricted?: boolean; }
export interface IHeightWrapper { height?: number; }
export interface IHighlightOddWrapper { highlightOdd?: boolean; }
export interface IHintWrapper { hint?: string; }
export interface IHistoryWrapper<TValue> { history?: TValue; }
export interface IHomeWrapper<THome> { home?: THome; }
export interface IHoveredWrapper { hovered?: boolean; }
export interface IIconLeftAlignedWrapper { iconLeftAligned?: boolean; }
export interface IIconWrapper<TValue = string> { icon?: TValue; }
export interface IIdWrapper<TValue = number> { id?: TValue; }
export interface IIgnoreEnterKeyWrapper { ignoreEnterKey?: boolean; }
export interface IIndexedWrapper { indexed?: boolean; }
export interface IIndexWrapper<TValue = number> { index?: TValue; }
export interface IInfoWrapper<TValue = string> { info?: TValue; }
export interface IInitialMarkersWrapper<TValue> { initialMarkers?: TValue; }
export interface IInitialStateWrapper<TValue = {}> { initialState?: TValue; }
export interface IInlineOptionsRenderedWrapper { inlineOptionsRendered?: boolean; }
export interface IInlineOptionsWrapper<TValue = boolean> { inlineOptions?: TValue; }
export interface IInlineWrapper { inline?: boolean; }
export interface IInputFormatWrapper { inputFormat?: string; }
export interface IInputTimeFormatWrapper { inputTimeFormat?: string; }
export interface IIpWrapper<TValue = string> { ip?: TValue; }
export interface IIsFirstSelectedWrapper<TValue> { isFirstSelected?(payload?: TValue): boolean; }
export interface IIsLastSelectedWrapper<TValue> { isLastSelected?(payload?: TValue): boolean; }
export interface IIsMiddleSelectedWrapper<TValue> { isMiddleSelected?(payload?: TValue): boolean; }
export interface IIsoWeekWrapper { isoWeek?: boolean; }
export interface IIsSelectedWrapper<TValue> { isSelected?(payload?: TValue): boolean; }
export interface IItemConfigurationWrapper<TValue> { itemConfiguration?: TValue; }
export interface IItemPropsWrapper<TValue> { itemProps?: TValue; }
export interface IItemsWrapper<TValue> { items?: TValue; }
export interface IItemWrapper<TValue> { item?: TValue; }
export interface IJustifyContentCenterWrapper { justifyContentCenter?: boolean; }
export interface IJustifyContentEndWrapper { justifyContentEnd?: boolean; }
export interface IJustifyContentSpaceBetweenWrapper { justifyContentSpaceBetween?: boolean; }
export interface IKeepChangesWrapper { keepChanges?: boolean; }
export interface IKeyboardConfigurationWrapper<TValue> { keyboardConfiguration?: TValue; }
export interface IKeyboardKeyConfigurationWrapper<TValue> { keyboardKeyConfiguration?: TValue; }
export interface IKeyboardOpenWrapper { keyboardOpen?: boolean; }
export interface IKeyValue { [index: string]: AnyT; }
export interface IKeyWrapper<TValue = string> { key?: TValue; }
export interface ILabelWrapper<TValue = string> { label?: TValue; }
export interface ILastAllowedWrapper { lastAllowed?: boolean; }
export interface ILastWrapper<TValue = boolean> { last?: TValue; }
export interface ILatWrapper<TValue = number> { lat?: TValue; }
export interface ILayoutWrapper<TValue> { layout?: TValue; }
export interface ILazyLoadingWrapper { lazyLoading?: boolean; }
export interface ILeftContentWrapper<TValue> { leftContent?: TValue; }
export interface ILinkedSectionsWrapper { linkedSections?: string[]; }
export interface ILinkWrapper<TValue = string> { link?: TValue; }
export interface IListAccessorWrapper<TValue> { listAccessor?: TValue; }
export interface IListConfigurationWrapper<TValue> { listConfiguration?: TValue; }
export interface IListSectionWrapper<TValue = string> { listSection?: TValue; }
export interface IListsSectionsWrapper<TValue> { listsSections?: TValue; }
export interface IListWrapper<TValue> { list?: TValue; }
export interface ILngWrapper<TValue = number> { lng?: TValue; }
export interface ILoadingWrapper { loading?: boolean; }
export interface ILocaleWrapper { locale?: string; }
export interface ILocalFilterWrapper<TValue = {}> { localFilter?(payload?: TValue): boolean; }
export interface ILocalPaginationWrapper<TValue = boolean> { localPagination?: TValue; }
export interface ILocalSortingWrapper { localSorting?: boolean; }
export interface ILocationWrapper<TValue> { location?: TValue; }
export interface ILockPageWrapper<TValue = boolean> { lockPage?: TValue; }
export interface ILockWrapper { lock?: boolean; }
export interface ILoginWrapper<TValue = string> { login?: TValue; }
export interface ILogoutWrapper<TValue = string> { logout?: TValue; }
export interface IMainConfigurationWrapper<TValue> { mainConfiguration?: TValue; }
export interface IMappersWrapper<TValue> { mappers?: TValue; }
export interface IMaskGuideWrapper<TValue = boolean> { maskGuide?: TValue; }
export interface IMaskWrapper<TValue = (string | RegExp)[]> { mask?: TValue; }
export interface IMaxCountWrapper { maxCount?: number; }
export interface IMaxDateWrapper<TValue = string> { maxDate?: TValue; }
export interface IMaxLengthWrapper { maxLength?: number; }
export interface IMaxWrapper<TValue = number> { max?: TValue; }
export interface IMenuActionConfigurationWrapper<TValue> { menuActionConfiguration?: TValue; }
export interface IMenuAnchorElementWrapper<TValue> { menuAnchorElement?: TValue; }
export interface IMenuConfigurationWrapper<TValue> { menuConfiguration?: TValue; }
export interface IMenuOptionsWrapper<TValue> { menuOptions?: TValue; }
export interface IMenuRenderedWrapper { menuRendered?: boolean; }
export interface IMergeStrategyWrapper<TValue> { mergeStrategy?: TValue; }
export interface IMessagesWrapper<TValue> { messages?: TValue; }
export interface IMessageWrapper<TValue = string> { message?: TValue; }
export interface IMethodWrapper { method?: string; }
export interface IMiddleWrapper<TValue = boolean> { middle?: TValue; }
export interface IMinDateWrapper<TValue = string> { minDate?: TValue; }
export interface IMiniWrapper { mini?: boolean; }
export interface IMinLengthWrapper { minLength?: number; }
export interface IMinWrapper<TValue = number> { min?: TValue; }
export interface IModeWrapper<TValue = string> { mode?: TValue; }
export interface IMonthWrapper<TValue = number> { month?: TValue; }
export interface IMultiWrapper { multi?: boolean; }
export interface INameWrapper<TValue = string> { name?: TValue; }
export interface INavigateBackWrapper { navigateBack?: boolean; }
export interface INavigationActionConfigurationWrapper<TValue> { navigationActionConfiguration?: TValue; }
export interface INavigationActionRenderedWrapper { navigationActionRendered?: boolean; }
export interface INewEntityWrapper<TValue = boolean> { newEntity?: TValue; }
export interface INextFormChangesWrapper<TValue> { nextFormChanges?: TValue; }
export interface INextFormRouteWrapper { nextFormRoute?: string; }
export interface INextFormSectionWrapper { nextFormSection?: string; }
export interface INextIconWrapper { nextIcon?: string; }
export interface INextListSectionWrapper { nextListSection?: string; }
export interface INextSectionWrapper<TValue = string> { nextSection?: TValue; }
export interface INextWrapper<TValue> { next?: TValue; }
export interface INoAuthWrapper { noAuth?: boolean; }
export interface INoCacheWrapper { noCache?: boolean; }
export interface INoMergedPropsWrapper { noMergedProps?: boolean; }
export interface INoShrinkWrapper { noShrink?: boolean; }
export interface IOnAcceptWrapper { onAccept?(...args: AnyT[]): void; }
export interface IOnActivateWrapper { onActivate?(): void; }
export interface IOnApplyWrapper<TValue = {}> { onApply?(value?: TValue): void; }
export interface IOnBeforeAcceptWrapper { onBeforeAccept?(...args: AnyT[]): void; }
export interface IOnBeforeDialogShowWrapper<TValue = {}> { onBeforeDialogShow?(value: TValue): void; }
export interface IOnBeforeSubmitWrapper<TValue = {}, TResult = void> { onBeforeSubmit?(value?: TValue): TResult; }
export interface IOnBlurWrapper<TValue = {}> { onBlur?(value?: TValue): void; }
export interface IOnChangeLayoutModeWrapper<TValue = {}> { onChangeLayoutMode?(value?: TValue): void; }
export interface IOnChangeManuallyWrapper<TValue = AnyT> { onChangeManually?(value?: TValue): void; }
export interface IOnChangeWrapper<TValue = AnyT> { onChange?(value?: TValue): void; }
export interface IOnClearWrapper<TValue = void> { onClear?(): TValue; }
export interface IOnClickWrapper<TValue = unknown> { onClick?(value?: TValue): void; }
export interface IOnClosePreviewWrapper { onClosePreview?(): void; }
export interface IOnCloseWrapper<TValue = {}> { onClose?(value?: TValue): void; }
export interface IOnColumnClickWrapper<TValue = {}> { onColumnClick?(value?: TValue): void; }
export interface IOnColumnContentClickWrapper<TValue = {}> { onColumnContentClick?(value?: TValue): void; }
export interface IOnCommentClickWrapper { onCommentClick?(): void; }
export interface IOnDeactivateWrapper<TValue = {}> { onDeactivate?(value?: TValue): void; }
export interface IOnDelayWrapper { onDelay?(): void; }
export interface IOnDictionaryChangeWrapper<TValue1, TValue2> { onDictionaryChange?(value1?: TValue1, value2?: TValue2): void; }
export interface IOnDictionaryLoadWrapper<TValue1 = {}, TValue2 = {}> { onDictionaryLoad?(value1?: TValue1, value2?: TValue2): void; }
export interface IOnDownloadFileClickWrapper<TValue = {}> { onDownloadFileClick?(value?: TValue): void; }
export interface IOnDrawerHeaderClickWrapper { onDrawerHeaderClick?(): void; }
export interface IOnEnterWrapper<TOnEnter> { onEnter?: TOnEnter; }
export interface IOnFilterChangeWrapper<TValue = {}> { onFilterChange?(value?: TValue): void; }
export interface IOnFilterClickWrapper<TValue = {}> { onFilterClick?(value?: TValue): void; }
export interface IOnFirstWrapper<TValue = AnyT> { onFirst?(value?: TValue): void; }
export interface IOnFocusWrapper<TValue = {}> { onFocus?(value?: TValue): void; }
export interface IOnFormChangeWrapper<TValue1 = string, TValue2 = AnyT> { onFormChange?(value1?: TValue1, value?: TValue2): void; }
export interface IOnGroupClickWrapper<TValue = {}> { onGroupClick?(value?: TValue): void; }
export interface IOnInitWrapper<TValue = {}> { onInit?(value?: TValue): void; }
export interface IOnInlineOptionCloseWrapper<TValue = {}> { onInlineOptionClose?(value?: TValue): void; }
export interface IOnKeyEnterWrapper<TValue = IBaseEvent> { onKeyEnter?(value?: TValue): void; }
export interface IOnLastWrapper<TValue = AnyT> { onLast?(value?: TValue): void; }
export interface IOnMarkerClickWrapper<TValue = {}> { onMarkerClick?(value?: TValue): void; }
export interface IOnMarkerDragEndWrapper<TValue = {}> { onMarkerDragEnd?(value?: TValue): void; }
export interface IOnMarkerDragStartWrapper<TValue = {}> { onMarkerDragStart?(value?: TValue): void; }
export interface IOnMarkerEnterWrapper<TValue = {}> { onMarkerEnter?(value?: TValue): void; }
export interface IOnMarkerLeaveWrapper<TValue = {}> { onMarkerLeave?(value?: TValue): void; }
export interface IOnMouseEnterWrapper<TValue = IBaseEvent> { onMouseEnter?(value?: TValue): void; }
export interface IOnMouseLeaveWrapper<TValue = IBaseEvent> { onMouseLeave?(value?: TValue): void; }
export interface IOnNextWrapper<TValue = {}> { onNext?(value?: TValue): void; }
export interface IOnPreviousWrapper<TValue = {}> { onPrevious?(value?: TValue): void; }
export interface IOnRefreshClickWrapper<TValue = {}> { onRefreshClick?(value?: TValue): void; }
export interface IOnResetWrapper { onReset?(): void; }
export interface IOnScrollWrapper<TValue = {}> { onScroll?(value?: TValue): void; }
export interface IOnSelectWrapper<TValue = {}> { onSelect?(value?: TValue): void; }
export interface IOnShowPreviewWrapper { onShowPreview?(): void; }
export interface IOnSortingDirectionChangeWrapper<TValue> { onSortingDirectionChange?(payload: TValue): void; }
export interface IOnSubmitWrapper<TValue = {}> { onSubmit?(value?: TValue): void; }
export interface IOnValidWrapper<TValue = boolean> { onValid?(value?: TValue): void; }
export interface IOpenedWrapper<TValue = boolean> { opened?: TValue; }
export interface IOperationIdWrapper { operationId?: string; }
export interface IOperationWrapper<TValue = IIdWrapper<string>> { operation?: TValue; }
export interface IOptionClassNameWrapper<TValue = string> { optionClassName?: TValue; }
export interface IOptionsWrapper<TValue> { options?: TValue; }
export interface IOptionWrapper<TValue> { option?: TValue; }
export interface IOrderWrapper<TValue = number> { order?: TValue; }
export interface IOriginalDataWrapper<TValue = IEntity[]> { originalData?: TValue; }
export interface IOriginalEntityWrapper<TValue> { originalEntity?: TValue; }
export interface IOriginalValueWrapper<TValue = AnyT> { originalValue?: TValue; }
export interface IOutlinedWrapper { outlined?: boolean; }
export interface IOutputFormatWrapper { outputFormat?: string; }
export interface IOutputTimeFormatWrapper { outputTimeFormat?: string; }
export interface IOverlayWrapper<TValue = boolean> { overlay?: TValue; }
export interface IPagesCountWrapper { pagesCount?: number; }
export interface IPageSizeWrapper<TValue = number> { pageSize?: TValue; }
export interface IPageWrapper<TValue = number> { page?: TValue; }
export interface IParamsWrapper<TValue = {}> { params?: TValue; }
export interface IParentClassNameWrapper<TValue = string> { parentClassName?: TValue; }
export interface IParentElementWrapper<TValue = Element> { parentElement?: TValue; }
export interface IParentWrapper<TValue> { parent?: TValue; }
export interface IPartOfGroupWrapper { partOfGroup?: boolean; }
export interface IPartsWrapper<TValue = string[]> { parts?: TValue; }
export interface IPasswordWrapper<TValue = string> { password?: TValue; }
export interface IPathWrapper<TValue = string> { path?: TValue; }
export interface IPatternWrapper<TValue = string> { pattern?: TValue; }
export interface IPayloadWrapper<TValue = {}> { payload?: TValue; }
export interface IPerfectScrollWrapper<TValue> { perfectScroll?: TValue; }
export interface IPeriodModeWrapper<TValue> { periodMode?: TValue; }
export interface IPeriodStepWrapper { periodStep?: number; }
export interface IPeriodTypeWrapper<TValue> { periodType?: TValue; }
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
export interface IPosUseKeyboardOnMobilePlatformOnlyWrapper { useKeyboardOnMobilePlatformOnly?: boolean; }
export interface IPrefixLabelWrapper { prefixLabel?: string; }
export interface IPrefixWrapper { prefix?: string; }
export interface IPreventEffectsWrapper<TValue = boolean> { preventEffects?: TValue; }
export interface IPreventFocusWrapper { preventFocus?: boolean; }
export interface IPreventManualChangesWrapper { preventManualChanges?: boolean; }
export interface IPreviewDegreeWrapper<TValue = number> { previewDegree?: TValue; }
export interface IPreviewDialogConfigurationWrapper<TValue> { previewDialogConfiguration?: TValue; }
export interface IPreviewPageWrapper<TValue = number> { previewPage?: TValue; }
export interface IPreviewScaleWrapper<TValue = number> { previewScale?: TValue; }
export interface IPreviousActionWrapper<TValue> { previousAction?: TValue; }
export interface IPreviousFormSectionWrapper { previousFormSection?: string; }
export interface IPreviousIconWrapper { previousIcon?: string; }
export interface IPreviousWrapper<TValue> { previous?: TValue; }
export interface IPrimaryFilterWrapper<TValue> { primaryFilter?: TValue; }
export interface IProfileWrapper<TValue> { profile?: TValue; }
export interface IProgressMessageWrapper<TValue = string> { progressMessage?: TValue; }
export interface IProgressWrapper<TValue = boolean> { progress?: TValue; }
export interface IProjectIdWrapper<TValue = number> { projectId?: TValue; }
export interface IProxyContainerWrapper<TValue> { proxyContainer?: TValue; }
export interface IQueryFilterWrapper<TValue> { queryFilter?: TValue; }
export interface IQueryParamsWrapper<TValue> { queryParams?: TValue; }
export interface IQueryWrapper<TValue = string> { query?: TValue; }
export interface IQueueWrapper<TValue> { queue?: TValue; }
export interface IRaisedWrapper { raised?: boolean; }
export interface IRangeEnabledWrapper { rangeEnabled?: boolean; }
export interface IRawDataWrapper<TValue = AnyT> { rawData?: TValue; }
export interface IReadOnlyWrapper { readOnly?: boolean; }
export interface IReadyWrapper { ready?: boolean; }
export interface IRefreshOnUpdateWrapper { refreshOnUpdate?: boolean; }
export interface IRegionWrapper<TValue = string> { region?: TValue; }
export interface IRelatedLinksWrapper<TValue> { relatedLinks?: TValue; }
export interface IRemoteFilterWrapper { remoteFilter?: boolean; }
export interface IRemoteSorterWrapper { remoteSorter?: boolean; }
export interface IRemovedFilesWrapper<TValue> { removedFiles?: TValue; }
export interface IRemoveWrapper<TValue> { remove?: TValue; }
export interface IRenderedWrapper { rendered?: boolean; }
export interface IRendererWrapper<T1 = AnyT, T2 = AnyT, T3 = AnyT> { renderer?(t1: T1, t2?: T2, t3?: T3): JSX.Element; }
export interface IReplacedWrapper<TValue = {}> { replaced?: TValue; }
export interface IReplaceRouteWrapper { replaceRoute?: boolean; }
export interface IReplaceWrapper<TValue = string> { replace?: TValue; }
export interface IRequestDataFactoryWrapper<TValue> { requestDataFactory?: TValue; }
export interface IRequestProviderWrapper<TValue> { requestProvider?: TValue; }
export interface IRequiredWrapper<TValue = boolean> { required?: TValue; }
export interface IResetActionRenderedWrapper { resetActionRendered?: boolean; }
export interface IResetConfigurationWrapper<TValue> { resetConfiguration?: TValue; }
export interface IResetIconWrapper<TValue = string> { resetIcon?: TValue; }
export interface IResetTextWrapper { resetText?: string; }
export interface IResponseFactoryWrapper<TValue> { responseFactory?: TValue; }
export interface IResponseReaderWrapper<TValue> { responseReader?: TValue; }
export interface IResponseTypeWrapper { responseType?: string; }
export interface IResultWrapper<TValue = {}> { result?: TValue; }
export interface IReturnNeverExecutablePeriodAsEmptyValueWrapper { returnNeverExecutablePeriodAsEmptyValue?: boolean; }
export interface IReturnUndefWrapper { returnUndef?: boolean; }
export interface IRightContentWrapper<TValue> { rightContent?: TValue; }
export interface IRobotDetectionMinSymbolsCountWrapper { robotDetectionMinSymbolsCount?: number; }
export interface IRootPathWrapper { rootPath?: string; }
export interface IRouteConfigurationWrapper<TValue> { routeConfiguration?: TValue; }
export interface IRouteParamsWrapper<TValue = IKeyValue> { routeParams?: TValue; }
export interface IRowNumWrapper { rowNum?: number; }
export interface IRowsWrapper<TValue> { rows?: TValue; }
export interface IRowWrapper<TValue = boolean> { row?: TValue; }
export interface IScaleWrapper<TValue = number> { scale?: TValue; }
export interface IScrollableWrapper { scrollable?: boolean; }
export interface ISecondaryFilterWrapper<TValue> { secondaryFilter?: TValue; }
export interface ISectionNameWrapper { sectionName?: string; }
export interface ISectionWrapper<TValue = string> { section?: TValue; }
export interface ISelectableWrapper<TValue = boolean> { selectable?: TValue; }
export interface ISelectedByDefaultWrapper { selectedByDefault?: boolean; }
export interface ISelectedDaysWrapper<TValue> { selectedDays?: TValue; }
export interface ISelectedElementClassNameWrapper { selectedElementClassName?: string; }
export interface ISelectedValueIgnoredWrapper { selectedValueIgnored?: boolean; }
export interface ISelectedWrapper<TValue = boolean> { selected?: TValue; }
export interface ISelectWrapper<TValue = string> { select?: TValue; }
export interface ISelfPropsWrapper<TValue> { selfProps?: TValue; }
export interface ISelfWrapper<TValue> { self?: TValue; }
export interface ISeparatorWrapper<TValue = string> { separator?: TValue; }
export interface ISettingsWrapper<TValue> { settings?: TValue; }
export interface IShowOnlyCurrentDaysWrapper { showOnlyCurrentDays?: boolean; }
export interface ISignInWrapper<TValue> { signIn?: TValue; }
export interface ISliderClassNameWrapper<TValue = string> { sliderClassName?: TValue; }
export interface ISortableWrapper { sortable?: boolean; }
export interface ISorterWrapper<TValue = IEntity> { sorter?(entity1: TValue, entity2: TValue): number; }
export interface ISourceWrapper<TValue> { source?: TValue; }
export interface ISrcWrapper<TValue = string> { src?: TValue; }
export interface IStackWrapper<TValue> { stack?: TValue; }
export interface IStateWrapper<TValue> { state?: TValue; }
export interface IStatusTextWrapper { statusText?: string; }
export interface IStatusWrapper<TValue = number> { status?: TValue; }
export interface IStepWrapper<TValue = number> { step?: TValue; }
export interface IStickyElementClassNameWrapper { stickyElementClassName?: string; }
export interface IStickyHeadWrapper { stickyHead?: boolean; }
export interface IStreetNumberWrapper<TValue = string> { streetNumber?: TValue; }
export interface IStreetWrapper<TValue = string> { street?: TValue; }
export interface IStrictWrapper { strict?: boolean; }
export interface IStyleWrapper<TValue> { style?: TValue; }
export interface ISubBorderWrapper<TValue = boolean> { subBorder?: TValue; }
export interface ISubHeaderConfigurationWrapper<TValue> { subHeaderConfiguration?: TValue; }
export interface ISubHeaderRenderedWrapper { subHeaderRendered?: boolean; }
export interface ISubmitConfigurationWrapper<TValue> { submitConfiguration?: TValue; }
export interface ISubmitIconWrapper<TValue = string> { submitIcon?: TValue; }
export interface ISubmitTextWrapper { submitText?: string; }
export interface ISucceedTextWrapper<TValue = string> { succeedText?: TValue; }
export interface ITabIndexWrapper { tabIndex?: number; }
export interface ITabPanelConfigurationWrapper<TValue> { tabPanelConfiguration?: TValue; }
export interface ITabPanelSectionWrapper<TValue = string> { tabPanelSection?: TValue; }
export interface ITabPanelsSectionsWrapper<TValue> { tabPanelsSections?: TValue; }
export interface ITabPanelWrapper<TValue> { tabPanel?: TValue; }
export interface ITagsWrapper<TValue> { tags?: TValue; }
export interface ITextWrapper<TValue = string> { text?: TValue; }
export interface IThumbClassNameWrapper<TValue = string> { thumbClassName?: TValue; }
export interface ITimeoutWrapper { timeout?: number; }
export interface ITimeWrapper<TValue = string> { time?: TValue; }
export interface ITitleRendererWrapper<TValue> { titleRenderer?(value?: TValue): JSX.Element; }
export interface ITitleWrapper<TValue = string> { title?: TValue; }
export interface ITodayWrapper<TValue> { today?: TValue; }
export interface ITokenWrapper<TToken = string> { token?: TToken; }
export interface IToolbarConfigurationWrapper<TValue> { toolbarConfiguration?: TValue; }
export interface IToolbarToolsConfigurationWrapper<TValue> { toolbarToolsConfiguration?: TValue; }
export interface ITopTotalWrapper { topTotal?: boolean; }
export interface ITotalAmountWrapper<TValue = number> { totalAmount?: TValue; }
export interface ITotalCountWrapper<TValue = number> { totalCount?: TValue; }
export interface ITotalEntityWrapper<TValue = AnyT> { totalEntity?: TValue; }
export interface ITotalWrapper<TValue = boolean> { total?: TValue; }
export interface ITouchedWrapper { touched?: boolean; }
export interface IToWrapper<TValue = string> { to?: TValue; }
export interface ITplWrapper<T1 = {}, T2 = {}, T3 = {}> { tpl?(value1?: T1, value2?: T2, value3?: T3): StringNumberT; }
export interface ITrackableWrapper { trackable?: boolean; }
export interface ITransportFactoryWrapper<TValue> { transportFactory?: TValue; }
export interface ITransportWrapper<TValue> { transport?: TValue; }
export interface IUniqueParamNameWrapper { uniqueParamName?: string; }
export interface IUnitWrapper<TValue> { unit?: TValue; }
export interface IUpdatedWrapper<TValue = boolean> { updated?: TValue; }
export interface IUpdateWrapper<TValue = string> { update?: TValue; }
export interface IUrlFactoryWrapper<TValue> { urlFactory?: TValue; }
export interface IUrlProviderWrapper<TValue> { urlProvider?: TValue; }
export interface IUrlWrapper<TValue = string> { url?: TValue; }
export interface IUseActionsWrapper { useActions?: boolean; }
export interface IUseCameraWrapper { useCamera?: boolean; }
export interface IUseCursorWrapper<TValue = boolean> { useCursor?: TValue; }
export interface IUseDownloadWrapper { useDownload?: boolean; }
export interface IUseFilterWrapper { useFilter?: boolean; }
export interface IUseKeyboardWrapper { useKeyboard?: boolean; }
export interface IUsePeriodNavigatorWrapper { usePeriodNavigator?: boolean; }
export interface IUsePreviewWrapper { usePreview?: boolean; }
export interface IUserWrapper<TValue = string> { user?: TValue; }
export interface IUseShortDigitFormatWrapper { useShortDigitFormat?: boolean; }
export interface IUseShortFormatWrapper { useShortFormat?: boolean; }
export interface IUseSyntheticCalendarWrapper { useSyntheticCalendar?: boolean; }
export interface IUseUppercaseWrapper { useUppercase?: boolean; }
export interface IUseVideoWrapper { useVideo?: boolean; }
export interface IUseZipCodeWrapper { useZipCode?: boolean; }
export interface IUuidWrapper { uuid?: string; }
export interface IValidateAfterResetWrapper { validateAfterReset?: boolean; }
export interface IValidateOnMountWrapper { validateOnMount?: boolean; }
export interface IValidWrapper { valid?: boolean; }
export interface IValueWrapper<TValue = AnyT> { value?: TValue; }
export interface IViewerClassNameWrapper { viewerClassName?: string; }
export interface IViewerConfigurationWrapper<TValue> { viewerConfiguration?: TValue; }
export interface IViewerWrapper<TValue> { viewer?: TValue; }
export interface IWaitingForOptionsWrapper { waitingForOptions?: boolean; }
export interface IWestWrapper<TValue = JSX.Element> { west?: TValue; }
export interface IWideWrapper { wide?: boolean; }
export interface IWidthWrapper<TValue = number> { width?: TValue; }
export interface IWithCredentialsWrapper { withCredentials?: boolean; }
export interface IWrappedWrapper { wrapped?: boolean; }
export interface IWrapperClassNameWrapper<TValue = string> { wrapperClassName?: TValue; }
export interface IWrapperWrapper<TValue> { wrapper?: TValue; }
export interface IWrapWrapper { wrap?: boolean; }
export interface IXWrapper<TX = number> { x?: any; }
export interface IYearMonthFormatWrapper<TValue = string> { yearMonthFormat?: TValue; }
export interface IYearWrapper<TValue = number> { year?: TValue; }
export interface IYWrapper<TY = number> { y?: TY; }
export interface IZipCodeWrapper<TValue = string> { zipCode?: TValue; }
export interface IZoneWrapper<TValue = string> { zone?: TValue; }

/**
 * @stable [07.06.2018]
 */
export interface IFilterChangesWrapper<TChanges extends IKeyValue = IKeyValue> {
  filterChanges?: TChanges;
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
 * @stable [01.02.2019]
 */
export interface IErrorMessageWrapper<TErrorMessage = string> {
  errorMessage?: TErrorMessage;
}

/**
 * @stable [29.05.2018]
 */
export interface ICustomErrorWrapper<TCustomError = boolean> {
  customError?: TCustomError;
}

/**
 * @stable [28.06.2018]
 */
export interface IFileNameWrapper {
  fileName?: string;
}

/**
 * @stable [29.05.2018]
 */
export interface IFilterFormWrapper<TFilterForm> {
  filterForm?: TFilterForm;
}

/**
 * @stable [22.08.2018]
 */
export interface IAfterShowWrapper<TAfterShow = () => void> {
  afterShow?: TAfterShow;
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
export interface IColumnColSpanWrapper {
  columnColSpan?: number;
}

/* @stable - 15.04.2018 */
export interface INotificationWrapper<TNotification> {
  notification?: TNotification;
}

/**
 * @stable [10.09.2019]
 */
export enum UniCodesEnum {
  ARROW_RIGHT = '\u27f6',
  DASH = '\u2014',
  N_DASH = '\u2013',
  NO_BREAK_SPACE = '\u00a0',
  NO_BREAK_SPACE_x3 = '\u00a0\u00a0\u00a0',
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
