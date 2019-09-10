import * as React from 'react';
import * as URLSearchParams from 'url-search-params';
import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';
import JQuery from 'jquery';

export type AnyT = any;
export type StringNumberT = number | string;
export type EntityIdT = StringNumberT;
export const FIRST_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 50;
export const DEFAULT_MAX_PAGE_SIZE = 1000000;
export const DEFAULT_TIME_FROM = '00:00:00';
export const DEFAULT_TIME_TO = '23:59:59';
export const NEW_OPTION = 'new';
export const UNDEF = void 0;
export const UNDEF_SYMBOL = Symbol('UNDEF');
export const CLEAR_DIRTY_CHANGES_VALUE = UNDEF;
export const ACTION_PREFIX = '$$-RAC-';
export const UNIVERSAL_SELECTED_ELEMENT_SELECTOR = 'rac-universal-selected-element';
export const UNIVERSAL_STICKY_ELEMENT_SELECTOR = 'rac-sticky-element';
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
export const AUTH_FIELD_NAME = 'auth';
export const FROM_DATE_FIELD_NAME = 'fromDate';
export const TO_DATE_FIELD_NAME = 'toDate';
export const FROM_TIME_FIELD_NAME = 'fromTime';
export const TO_TIME_FIELD_NAME = 'toTime';
export const TIME_FIELD_NAME = 'time';
export const FILTER_FIELD_NAME =  'filter';
export const EFFECTOR_FIELD_NAME = 'effector';                                                  /* @stable [28.03.2018] */
export const NAME_FIELD_NAME = 'name';                                                          /* @stable [16.08.2018] */
export const REGION_FIELD_NAME = 'region';                                                      /* @stable [01.08.2018] */
export const CITY_FIELD_NAME = 'city';                                                          /* @stable [04.08.2018] */
export const DISPLAY_MESSAGE_FIELD_NAME = 'displayMessage';                                     /* @stable [29.10.2018] */

export interface IActiveValueWrapper<TActiveValue = number> { activeValue?: TActiveValue; }
export interface IDefaultSrcWrapper<TDefaultSrc = string> { defaultScr?: TDefaultSrc; }
export interface IEntity extends IEntityIdTWrapper, IKeyValue {}
export interface IEntityIdTWrapper extends IIdWrapper<EntityIdT> {}
export interface IIdWrapper<TId = number> { id?: TId; }
export interface IIndexWrapper<TIndex = number> { index?: TIndex; }
export interface IIpWrapper<TIp = string> { ip?: TIp; }
export interface IKeyValue extends Record<string, AnyT> {}
export interface IPopupClassNameWrapper<TPopupClassName = string> { popupClassName?: TPopupClassName; }
export interface IPreviewAttachmentWrapper<TPreviewAttachment = string> { previewAttachment?: TPreviewAttachment; }
export interface IPreviewScaleWrapper<TScale = number> { previewScale?: TScale; }
export interface IScaleFactorWrapper<TScaleFactor = number> { scaleFactor?: TScaleFactor; }
export interface IScaleWrapper<TScale = number> { scale?: TScale; }
export interface ISrcWrapper<TSrc = string> { src?: TSrc; }
export interface ITransportWrapper<TTransport> { transport?: TTransport; }
export interface IUserWrapper<TUser = string> { user?: TUser; }
export interface IActionsRenderedWrapper { actionsRendered?: boolean; }

/**
 * @stable [22.06.2018]
 */
export interface IActionedWrapper {
  actioned?: boolean;
}

/* @stable [23.04.2018] */
export interface IEmptyDataWrapper<TEmptyData> {
  emptyData?: TEmptyData;
}

export interface IGroupByWrapper<TGroupBy> { groupBy?: TGroupBy; }

/* @stable [23.04.2018] */
export interface IBooleanEmptyDataWrapper extends IEmptyDataWrapper<boolean> {
}

export interface IMappersWrapper<TMappers> { mappers?: TMappers; }

/* @stable - 14.04.2018 */
export interface IRouteParamsWrapper<TRouteParams> {
  routeParams?: TRouteParams;
}

/* @stable - 14.04.2018 */
export interface IKeyValueRouteParamsWrapper extends IRouteParamsWrapper<IKeyValue> {
}

/* @stable - 14.04.2018 */
export interface IQueryParamsWrapper<TQueryParams> {
  queryParams?: TQueryParams;
}

/* @stable - 14.04.2018 */
export interface IURLSearchQueryParamsWrapper extends IQueryParamsWrapper<URLSearchParams> {
}
export interface ILocationWrapper<TLocation> { location?: TLocation; }

/* @stable - 14.04.2018 */
export interface IBrowserLocationWrapper extends ILocationWrapper<Location> {
}

/**
 * @stable [04.02.2019]
 */
export interface IProgressMessageWrapper<TProgressMessage = string> {
  progressMessage?: TProgressMessage;
}
export interface ILeftSlotWrapper<TLeftSlot> { leftSlot?: TLeftSlot; }
export interface IListWrapper<TList> { list?: TList; }
export interface IOnClickWrapper<TOnClick = () => void> { onClick?: TOnClick; }
export interface IOnDownloadFileClickWrapper<TOnDownloadFileClick> { onDownloadFileClick?: TOnDownloadFileClick; }
export interface IOnFilterClickWrapper<TOnFilterClick> { onFilterClick?: TOnFilterClick; }
export interface IOnRefreshClickWrapper<TOnRefreshClick> { onRefreshClick?: TOnRefreshClick; }
export interface IResultWrapper<TResult = AnyT> { result?: TResult; }
export interface IRightSlotWrapper<TRightSlot> { rightSlot?: TRightSlot; }
export interface ITabPanelWrapper<TTabPanel = JSX.Element> { tabPanel?: TTabPanel; }

/**
 * @stable [15.05.2018]
 */
export interface IToolbarWrapper<TToolbar = JSX.Element> {
  toolbar?: TToolbar;
}

/* @stable - 11.04.2018 */
export interface IApplicationWrapper<TApplication> {
  application?: TApplication;
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
 * @stable [27.11.2018]
 */
export interface IWithCredentialsWrapper {
  withCredentials?: boolean;
}

export interface IModeWrapper<TMode = string> { mode?: TMode; }

/**
 * @stable [25.01.2019]
 */
export interface IParamsWrapper<TParams = IKeyValue> {
  params?: TParams;
}

/**
 * @stable [02.02.2019]
 */
export interface IHeadersWrapper<THeaders = IKeyValue> {
  headers?: THeaders;
}

/**
 * @stable [02.02.2019]
 */
export interface IMethodWrapper {
  method?: string;
}

export interface IAlignWrapper<TAlign = string> { align?: TAlign; }
export interface IChannelWrapper<TChannel = string> { channel?: TChannel; }
export interface IColumnStylesWrapper<TColumnStyles> { columnStyles?: TColumnStyles; }
export interface IFlexWrapper<TFlex> { flex?: TFlex; }
export interface ILayoutWrapper<TLayout> { layout?: TLayout; }
export interface IUrlWrapper<TUrl = string> { url?: TUrl; }

/**
 * @stable [10.09.2018]
 */
export interface ITextAlignWrapper<TTextAlign = string> {
  textAlign?: TTextAlign;
}

/**
 * @stable [16.12.2018]
 */
export interface IChannelsWrapper<TChannels = string> {
  channels?: TChannels;
}

export interface INoCacheWrapper { noCache?: boolean; }

/**
 * @stable [02.02.2019]
 */
export interface INoAuthWrapper {
  noAuth?: boolean;
}

/**
 * @stable [02.02.2019]
 */
export interface IAuthWrapper<TAuth = string> {
  auth?: TAuth;
}

/* @stable - 01.04.2018 */
export interface ISignInWrapper<TSignIn> {
  signIn?: TSignIn;
}

/* @stable - 01.04.2018 */
export interface ISignUpWrapper<TSignUp> {
  signUp?: TSignUp;
}

/* @stable - 14.04.2018 */
export interface IAccessDeniedWrapper<TAccessDenied> {
  accessDenied?: TAccessDenied;
}

/* @stable - 14.04.2018 */
export interface ILogoutWrapper<TLogout> {
  logout?: TLogout;
}

/* @stable - 14.04.2018 */
export interface IProfileWrapper<TProfile> {
  profile?: TProfile;
}

/* @stable - 14.04.2018 */
export interface IHomeWrapper<THome> {
  home?: THome;
}

/* @stable - 14.04.2018 */
export interface IRestoreAuthWrapper<TRestoreAuth> {
  restoreAuth?: TRestoreAuth;
}

/**
 * @stable [03.05.2018]
 */
export interface IPhotoUrlWrapper<TUrl = string> {
  photoUrl?: TUrl;
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
export interface IOnSubmitWrapper<TOnSubmit = () => void> {
  onSubmit?: TOnSubmit;
}

/**
 * @stable [13.05.2018]
 */
export interface IOnRemoveWrapper<TItem = AnyT, TOnRemove = (item?: TItem) => void> {
  onRemove?: TOnRemove;
}

/**
 * @stable [15.05.2018]
 */
export interface IOnResetWrapper<TOnReset = () => void> {
  onReset?: TOnReset;
}

/* @stable - 01.04.2018 */
export interface IOnValidWrapper<TOnValid> {
  onValid?: TOnValid;
}

/* @stable - 01.04.2018 */
export interface IDefaultOnValidWrapper extends IOnValidWrapper<(valid: boolean) => void> {
}

export interface IOnDictionaryFilterChangeWrapper<TOnDictionaryFilterChange> { onDictionaryFilterChange?: TOnDictionaryFilterChange; }
export interface IOnFilterChangeWrapper<TOnFilterChange> { onFilterChange?: TOnFilterChange; }

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
export interface IOnChangeGroupingWrapper<TChangedValue = AnyT, TOnChangeGrouping = (value?: TChangedValue) => void> {
  onChangeGrouping?: TOnChangeGrouping;
}

/**
 * @stable [07.06.2018]
 */
export interface IOnChangeSortingWrapper<TPayload, TOnChangeSorting = (payload: TPayload) => void> {
  onChangeSorting?: TOnChangeSorting;
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

export interface IOperationWrapper<TOperation = IIdWrapper<string>> { operation?: TOperation; }
export interface IOperationIdWrapper { operationId?: string; }
export interface IItemsWrapper<TItems> { items?: TItems; }

/**
 * @stable [01.12.2018]
 */
export interface IOnScrollWrapper<TPayload = AnyT> {
  onScroll?(payload?: TPayload): void;
}

export interface IItemWrapper<TItem> { item?: TItem; }

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

export interface IConnectedWrapper<TConnected = boolean> { connected?: TConnected; }

/**
 * @stable [01.06.2018]
 */
export interface IKeyboardOpenedWrapper {
  keyboardOpened?: boolean;
}

/**
 * @stable [20.08.2018]
 */
export interface INeedToOpenMenuWrapper {
  needToOpenMenu?: boolean;
}

export interface ICroppedCanvasOptionsWrapper<TCroppedCanvasOptions> { croppedCanvasOptions?: TCroppedCanvasOptions; }
export interface IDataWrapper<TData = AnyT[]> { data?: TData; }
export interface IForceReloadWrapper { forceReload?: boolean; }
export interface IMenuOptionsWrapper<TMenuOptions> { menuOptions?: TMenuOptions; }
export interface IOptionsWrapper<TOptions> { options?: TOptions; }
export interface IOriginalDataWrapper<TOriginalData = IEntity[]> { originalData?: TOriginalData; }

/**
 * @stable [04.05.2018]
 */
export interface IOnLoadDictionaryWrapper {
  onLoadDictionary?(items: AnyT, dictionary?: string): void;
}

/**
 * @stable [04.08.2018]
 */
export interface IOnEmptyDictionaryWrapper<TPayload> {
  onEmptyDictionary?(dictionary?: string, payload?: TPayload): void;
}

/* @stable - 22.04.2018 */
export interface ILoadingWrapper {
  loading?: boolean;
}

/**
 * @stable [22.12.2018]
 */
export interface IMenuPropsWrapper<TMenuProps> {
  menuProps?: TMenuProps;
}

export interface IBindDictionaryWrapper<TBindDictionary = string> { bindDictionary?: TBindDictionary; }
export interface IDictionaryParamsWrapper<TParams> { dictionaryParams?: TParams; }

/**
 * @stable [30.05.2018]
 */
export interface IDictionariesWrapper<TDictionaries> {
  dictionaries?: TDictionaries;
}

export interface IDisplayNameWrapper { displayName?: string; }
export interface ILabelWrapper<TLabel = string> { label?: TLabel; }
export interface IPatternWrapper<TPattern = string> { pattern?: TPattern; }
export interface IPlaceholderWrapper { placeholder?: string; }

/**
 * @stable [01.08.2018]
 */
export interface IPrefixLabelWrapper {
  prefixLabel?: string;
}

export interface IMessagesWrapper<TMessages> { messages?: TMessages; }

/* @stable - 23.04.2018 */
export interface IPluginsWrapper<TPlugins> {
  plugins?: TPlugins;
}

/**
 * @stable [14.05.2018]
 */
export interface IFilterPlaceholderWrapper {
  filterPlaceholder?: string;
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

export interface ICenteredMenuWrapper { centeredMenu?: boolean; }
export interface IOverlayBackgroundClassNameWrapper { overlayBackgroundClassName?: string; }

/**
 * @stable [14.05.2018]
 */
export interface IUseFilterWrapper {
  useFilter?: boolean;
}

/**
 * @stable [13.01.2019]
 */
export interface IKeyboardConfigurationWrapper<TKeyboardConfiguration> {
  keyboardConfiguration?: TKeyboardConfiguration;
}

/**
 * @stable [31.07.2018]
 */
export interface IRenderToXWrapper {
  renderToX?: number | (() => number);
}

/**
 * @stable [11.12.2018]
 */
export interface IMaxCountWrapper {
  maxCount?: number;
}

/**
 * @stable [31.07.2018]
 */
export interface IRenderToYWrapper {
  renderToY?: number | (() => number);
}

/**
 * @stable [07.06.2018]
 */
export interface IMultiWrapper {
  multi?: boolean;
}

/**
 * @stable [14.08.2018]
 */
export interface ISectionWrapper<TSection = string> {
  section?: TSection;
}

/* @stable - 15.04.2018 */
export interface ILinkedToSectionsWrapper {
  linkedToSections?: string[];
}

/**
 * @stable - 15.04.2018
 */
export interface ILinkWrapper<TLink = string> {
  link?: TLink;
}

/* @stable - 15.04.2018 */
export interface INeedToDestroySectionsWrapper {
  needToDestroySections?: string[];
}

/* @stable - 15.04.2018 */
export interface ILockWrapper {
  lock?: boolean;
}

/* @stable - 15.04.2018 */
export interface IStackWrapper<TStack> {
  stack?: TStack;
}

export interface IPayloadWrapper<TPayload = AnyT> { payload?: TPayload; }

/**
 * @stable [18.05.2018]
 */
export interface IChangesWrapper<TChanges extends IKeyValue = IKeyValue> {
  changes?: TChanges;
}

/**
 * @stable [07.06.2018]
 */
export interface IFilterChangesWrapper<TChanges extends IKeyValue = IKeyValue> {
  filterChanges?: TChanges;
}

/**
 * @stable [04.07.2018]
 */
export interface IExpandedGroupsWrapper<TExpandedGroups extends IKeyValue = IKeyValue> {
  expandedGroups?: TExpandedGroups;
}

/**
 * @stable [13.05.2018]
 */
export interface ILoginWrapper<TLogin = string> {
  login?: TLogin;
}

/**
 * @stable [03.07.2018]
 */
export interface IColumnNameWrapper {
  columnName?: string;
}

/**
 * @stable [14.05.2018]
 */
export interface IListRoutePathWrapper {
  listRoutePath?: string;
}

export interface IColumnRenderedWrapper { columnRendered?: boolean; }
export interface ICustomActionsWrapper<TValue> { customActions?: TValue; }
export interface IDisabledWrapper<TValue = boolean> { disabled?: TValue; }
export interface IFilterSectionWrapper { filterSection?: string; }
export interface IFormSectionWrapper<TFormSection = string> { formSection?: TFormSection; }
export interface IFormsSectionsWrapper<TFormsSections> { formsSections?: TFormsSections; }
export interface IHeaderRenderedWrapper { headerRendered?: boolean; }
export interface IListSectionWrapper<TListSection = string> { listSection?: TListSection; }
export interface IListsSectionsWrapper<TListsSections> { listsSections?: TListsSections; }
export interface INextFormChangesWrapper<TChanges> { nextFormChanges?: TChanges; }
export interface INextFormRouteWrapper { nextFormRoute?: string; }
export interface INextFormSectionWrapper { nextFormSection?: string; }
export interface INextListSectionWrapper { nextListSection?: string; }
export interface IPreviousFormSectionWrapper { previousFormSection?: string; }
export interface IQueryWrapper<TQuery = string> { query?: TQuery; }
export interface IRawDataWrapper<TRawData = AnyT> { rawData?: TRawData; }
export interface IRenderedWrapper { rendered?: boolean; }
export interface IReplaceRouteWrapper { replaceRoute?: boolean; }

/* @stable - 24.04.2018 */
export interface ISeparatorsWrapper<TSeparators> {
  separators?: TSeparators;
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

export interface IActionsDisabledWrapper { actionsDisabled?: boolean; }

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
 * @stable [17.05.2018]
 */
export interface IClosableWrapper {
  closable?: boolean;
}

/**
 * @stable [17.05.2018]
 */
export interface IAcceptableWrapper {
  acceptable?: boolean;
}

/* @stable - 19.04.2018 */
export interface IBorderedWrapper {
  bordered?: boolean;
}

/* @stable - 19.04.2018 */
export interface IRoundedWrapper {
  rounded?: boolean;
}

/**
 * @stable [29.05.2018]
 */
export interface IAlwaysDirtyWrapper {
  alwaysDirty?: boolean;
}

/**
 * @stable [04.05.2018]
 */
export interface IDelayTimeoutWrapper<TDelayTimeout = number> {
  delayTimeout?: TDelayTimeout;
}

/**
 * @stable [04.05.2018]
 */
export interface IOnDelayWrapper<TValue = AnyT, TOnDelay = (value?: TValue) => void> {
  onDelay?: TOnDelay;
}

/**
 * @stable [29.05.2018]
 */
export interface IEditableWrapper {
  editable?: boolean;
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

export interface IAuthorizedWrapper { authorized?: boolean; }
export interface IBarcodeWrapper<TBarcode = string> { barcode?: TBarcode; }
export interface IBlobWrapper<TBlob = Blob> { blob?: TBlob; }
export interface IChangeEvent<TTarget = IValueWrapper> extends React.ChangeEvent<TTarget> {}
export interface IFloatLabelWrapper { floatLabel?: boolean; }
export interface IFocusEvent<TTarget = {}> extends React.FocusEvent<TTarget> {}
export interface IFormDataWrapper<TFormData = FormData> { formData?: TFormData; }
export interface IKeyboardEvent<TTarget = {}> extends React.KeyboardEvent<TTarget> { }
export interface IProgressWrapper { progress?: boolean; }
export interface IReadyWrapper { ready?: boolean; }
export interface IVisibleWrapper { visible?: boolean; }

/**
 * @stable [28.06.2018]
 */
export interface IOutlinedWrapper {
  outlined?: boolean;
}

/* @stable - 20.04.2018 */
export interface IRaisedWrapper {
  raised?: boolean;
}

/**
 * @stable [09.05.2018]
 */
export interface ITotalCountWrapper<TTotalCount = number> {
  totalCount?: TTotalCount;
}

/**
 * @stable [18.05.2018]
 */
export interface ITouchedWrapper {
  touched?: boolean;
}

/**
 * @stable [11.06.2018]
 */
export interface IHeightWrapper {
  height?: number;
}

/**
 * @stable [11.06.2018]
 */
export interface IFontSizeWrapper {
  fontSize?: number;
}

export interface IValueWrapper<TValue = AnyT> { value?: TValue; }
export interface IRippledWrapper<TRippled = boolean> { rippled?: TRippled; }

/**
 * @stable [18.06.2018]
 */
export interface IDisplayValueWrapper<TDisplayValue = AnyT> {
  displayValue?: TDisplayValue;
}

/**
 * @stable [10.11.2018]
 */
export interface ICodeWrapper<TCode = string> {
  code?: TCode;
}

export interface IEmptyValueWrapper<TValue = AnyT> { emptyValue?: TValue; }
export interface INameWrapper<TName = string> { name?: TName; }
export interface ITabIndexWrapper { tabIndex?: number; }

export interface IReaderWrapper<TReader> {
  reader?: TReader;
}

/**
 * @stable [29.05.2018]
 */
export interface IDirectionWrapper<TDirection> {
  direction?: TDirection;
}

/**
 * @stable [29.05.2018]
 */
export interface IDirectionsWrapper<TDirections> {
  directions?: TDirections;
}

/**
 * @stable [04.05.2018]
 */
export interface IMaskWrapper<TMask = Array<string|RegExp>> {
  mask?: TMask;
}

export interface IUsePreviewWrapper { usePreview?: boolean; }

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
 * @stable [04.05.2018]
 */
export interface IRequiredWrapper<TRequired = boolean | (() => boolean)> {
  required?: TRequired;
}

export interface IStringRequiredWrapper extends IRequiredWrapper<string> {
}

/**
 * @stable [04.05.2018]
 */
export interface IRobotModeWrapper {
  useRobotMode?: boolean;
}

export interface IRemovedWrapper<TRemoved = boolean> { removed?: TRemoved; }
export interface ISelectedWrapper<TSelected = boolean> { selected?: TSelected; }
export interface IUpdatedWrapper<TUpdated = boolean> { updated?: TUpdated; }
export interface IReplacedWrapper<TReplaced = AnyT> { replaced?: TReplaced; }
export interface ISelectedEntityWrapper<TEntity extends IEntity = IEntity> extends ISelectedWrapper<TEntity> {}

/**
 * @stable [17.05.2018]
 */
export interface IRemovedEntityWrapper<TEntity extends IEntity = IEntity> extends IRemovedWrapper<TEntity> {
}

export interface IFieldsWrapper<TFields> { fields?: TFields; }
export interface IFieldWrapper<TField> { field?: TField; }
export interface IPageWrapper<TPage = number> { page?: TPage; }
export interface IViewerWrapper<TViewer> { viewer?: TViewer; }

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

export interface IChangeableWrapper { changeable?: boolean; }
export interface ICloseWrapper<TClose> { close?: TClose; }
export interface IDirtyWrapper { dirty?: boolean; }
export interface ITotalAmountWrapper<TTotalAmount = number> { totalAmount?: TTotalAmount; }
export interface IValidWrapper { valid?: boolean; }

/**
 * @stable [10.08.2018]
 */
export interface IXWrapper<TX = number> {
  x?: TX;
}

/**
 * @stable [10.08.2018]
 */
export interface IYWrapper<TY = number> {
  y?: TY;
}

/**
 * @stable [27.04.2018]
 */
export interface IOpenWrapper<TOpen = boolean> {
  open?: TOpen;
}

export interface IActionsWrapper<TActions> { actions?: TActions; }
export interface IActiveActionsWrapper<TActions> { activeActions?: TActions; }
export interface IDialogOpenedWrapper<TOpened = boolean> { dialogOpened?: TOpened; }
export interface IHideWrapper<THide> { hide?: THide; }
export interface IOpenedWrapper<TOpened = boolean> { opened?: TOpened; }

/**
 * @stable [02.06.2018]
 */
export interface IErrorMessageRenderedWrapper {
  errorMessageRendered?: boolean;
}

/**
 * @stable [18.06.2018]
 */
export interface IAutoCompleteWrapper<TAutoComplete = string> {
  autoComplete?: TAutoComplete;
}

export interface IActionTextWrapper { actionText?: string; }
export interface IFieldRenderedWrapper { fieldRendered?: boolean; }
export interface IReadOnlyWrapper { readOnly?: boolean; }
export interface IResetActionRenderedWrapper { resetActionRendered?: boolean; }

/**
 * @stable [15.09.2018]
 */
export interface IExpandActionRenderedWrapper {
  expandActionRendered?: boolean;
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
 * @stable [22.10.2018]
 */
export interface ICompactWrapper<TCompact = boolean> {
  compact?: TCompact;
}

export interface IActionIconWrapper<TActionIcon = string> { actionIcon?: TActionIcon; }
export interface IResetIconWrapper<TResetIcon = string> { resetIcon?: TResetIcon; }
export interface IResetTextWrapper { resetText?: string; }

/**
 * @stable [14.05.2018]
 */
export interface IIconWrapper<TIcon = string> {
  icon?: TIcon;
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
 * @stable [01.12.2018]
 */
export interface IGetSelfWrapper {
  getSelf(): Element;
}

/**
 * @stable [10.01.2019]
 */
export interface IAvatarWrapper<TAvatar> {
  avatar?: TAvatar;
}

/**
 * @stable [12.08.2018]
 */
export interface IUseAddActionWrapper {
  useAddAction?: boolean;
}

/**
 * @stable [03.06.2018]
 */
export interface IActionWrapper<TAction> {
  action?: TAction;
}

/**
 * @stable [03.06.2018]
 */
export interface IEffectsActionWrapper extends IActionWrapper<IEffectsAction> {
}

/**
 * @stable [02.06.2018]
 */
export interface IEmptyMessageWrapper<TEmptyMessage = string> {
  emptyMessage?: TEmptyMessage;
}

/**
 * @stable [02.06.2018]
 */
export interface IEmptyDataMessageWrapper<TEmptyDataMessage = string> {
  emptyDataMessage?: TEmptyDataMessage;
}

export interface ITplWrapper<TTpl> { tpl?: TTpl; }

/**
 * @stable [07.06.2018]
 */
export interface ITplFnWrapper<TItem = IEntity, TResult = StringNumberT> extends ITplWrapper<(item: TItem) => TResult> {
}

/**
 * @stable [14.05.2018]
 */
export interface IRendererWrapper<TItem = IEntity, TContext = AnyT, TRenderer = (item: TItem,
                                                                                 context?: TContext,
                                                                                 items?: IEntity[]) => JSX.Element> {
  renderer?: TRenderer;
}

export interface IWarningWrapper<TWarning = boolean> { warning?: TWarning; }

/**
 * @stable [06.06.2018]
 */
export interface IHeaderRendererWrapper<TItem, TRenderer = (item: TItem) => JSX.Element> {
  headerRenderer?: TRenderer;
}

/**
 * @stable [04.10.2018]
 */
export interface ITitleRendererWrapper<TItem = string, TRenderer = (item?: TItem) => JSX.Element> {
  titleRenderer?: TRenderer;
}

/**
 * @stable [06.06.2018]
 */
export interface IFilterRendererWrapper<TItem, TRenderer = (item: TItem) => JSX.Element> {
  filterRenderer?: TRenderer;
}

/* @stable - 31.03.2018 */
export interface IToClassNameWrapper<TItem> {
  toClassName?(entity: TItem): string;
}

/* @stable - 31.03.2018 */
export interface IEntityToClassNameWrapper extends IToClassNameWrapper<IEntity> {
}
export interface IUseGroupingWrapper { useGrouping?: boolean; }

/**
 * @stable [22.10.2018]
 */
export interface ISubBorderWrapper<TSubBorder = boolean> {
  subBorder?: TSubBorder;
}

/**
 * @stable [29.05.2018]
 */
export interface IUseLazyLoadingWrapper {
  useLazyLoading?: boolean;
}

/**
 * @stable [14.05.2018]
 */
export interface IUseSortingWrapper {
  useSorting?: boolean;
}

/**
 * @stable [21.12.2018]
 */
export interface IUseLocalizationWrapper {
  useLocalization?: boolean;
}

/**
 * @stable [14.05.2018]
 */
export interface ISorterFnWrapper<TSortedItem = IEntity, TSorter = (item1: TSortedItem, item2: TSortedItem) => number>
  extends ISorterWrapper<TSorter> {
}

export interface IFilterWrapper<TFilter = string> { filter?: TFilter; }
export interface IPopupWrapper<TPopup = boolean> { popup?: TPopup; }
export interface ISorterWrapper<TSorter> { sorter?: TSorter; }
export interface ITitleWrapper { title?: string; }

/**
 * @stable [14.05.2018]
 */
export interface IFilterFnWrapper<TFilteredItem = IEntity, TFilter = (item: TFilteredItem) => boolean>
  extends IFilterWrapper<TFilter> {
}

/**
 * @stable [07.06.2018]
 */
export interface ILocalFilterWrapper<TLocalFilter> {
  localFilter?: TLocalFilter;
}

/**
 * @stable [07.06.2018]
 */
export interface ILocalFilterFnWrapper<TFilteredItem = IEntity, TFilter = (item: TFilteredItem) => boolean>
  extends ILocalFilterWrapper<TFilter> {
}

/**
 * @stable [07.08.2018]
 */
export interface ITopTitleWrapper<TTopTitle = string> {
  topTitle?: TTopTitle;
}

/**
 * @stable [10.09.2018]
 */
export interface IColumnTitleWrapper<TColumnTitle = string> {
  columnTitle?: TColumnTitle;
}

/**
 * @stable [15.09.2018]
 */
export interface IClearActionWrapper {
  clearActionRendered?: boolean;
}

export interface IClassNameWrapper<TClassName = string> { className?: TClassName; }
export interface IWrapperClassNameWrapper<TWrapperClassName = string> { wrapperClassName?: TWrapperClassName; }

/**
 * @stable [10.09.2018]
 */
export interface IColumnClassNameWrapper<TColumnClassName = string> {
  columnClassName?: TColumnClassName;
}

/**
 * @stable [10.09.2018]
 */
export interface IHeaderClassNameWrapper {
  headerClassName?: string;
}

/**
 * @stable [08.05.2018]
 */
export interface IPositionWrapper<TPosition = number> {
  position?: TPosition;
}

export interface IAreaWrapper<TArea = string> { area?: TArea; }
export interface IBindStoreWrapper<TValue> { bindStore?: TValue; }
export interface ICityWrapper<TCity = string> { city?: TCity; }
export interface ICountryWrapper<TCountry = string> { country?: TCountry; }
export interface IDestroyWrapper<TValue = string> { destroy?: TValue; }
export interface IInitialStateWrapper<TValue> { initialState?: TValue; }
export interface ILatWrapper<TLat = number> { lat?: TLat; }
export interface ILngWrapper<TLng = number> { lng?: TLng; }
export interface IMarkerWrapper<TMarker> { marker?: TMarker; }
export interface IPlaceEntityWrapper<TPlaceEntity> { placeEntity?: TPlaceEntity; }
export interface IPlaceIdWrapper<TPlaceId = string> { placeId?: TPlaceId; }
export interface IPlaceWrapper<TPlace = string> { place?: TPlace; }
export interface IPointsWrapper<TPoints> { points?: TPoints; }
export interface IRefreshMapWrapper { refreshMap?: boolean; }
export interface IRegionWrapper<TRegion = string> { region?: TRegion; }
export interface ISelectWrapper<TValue = string> { select?: TValue; }
export interface IStreetNumberWrapper<TStreetNumber = string> { streetNumber?: TStreetNumber; }
export interface IStreetWrapper<TStreet = string> { street?: TStreet; }
export interface IUpdateWrapper<TValue = string> { update?: TValue; }
export interface IReplaceWrapper<TValue = string> { replace?: TValue; }
export interface IZipCodeWrapper<TZipCode = string> { zipCode?: TZipCode; }
export interface IZoomWrapper { zoom?: number; }

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
 * @stable [15.05.2018]
 */
export interface IMessageWrapper<TMessage = string> {
  message?: TMessage;
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

/* @stable - 11.04.2018 */
export interface IAutoFocusWrapper {
  autoFocus?: boolean;
}

/**
 * @stable [06.06.2018]
 */
export interface IRegisterWrapper<TRegister> {
  register?: TRegister;
}

/**
 * @stable [06.06.2018]
 */
export interface IUnregisterWrapper<TUnregister> {
  unregister?: TUnregister;
}

/**
 * @stable [01.02.2019]
 */
export interface IErrorMessageWrapper<TErrorMessage = string> {
  errorMessage?: TErrorMessage;
}
export interface IStatusTextWrapper { statusText?: string; }
export interface IStatusWrapper<TStatus = number> { status?: TStatus; }
export interface IErrorWrapper<TError = boolean> { error?: TError; }

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

export interface IEntityIdWrapper<TEntityId = EntityIdT> { entityId?: TEntityId; }
export interface IEntityWrapper<TEntity = IEntity> { entity?: TEntity; }
export interface IListAccessorWrapper<TListAccessor> { listAccessor?: TListAccessor; }
export interface INewEntityWrapper<TNewEntity = boolean> { newEntity?: TNewEntity; }
export interface IOriginalEntityWrapper<TOriginalEntity> { originalEntity?: TOriginalEntity; }

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
 * @stable [04.07.2018]
 */
export interface ICanComeBackWrapper<TCanComeBack = boolean> {
  canComeBack?: TCanComeBack;
}

/**
 * @stable [07.07.2018]
 */
export interface ICanUpdateWrapper<TCanUpdate = boolean> {
  canUpdate?: TCanUpdate;
}

/**
 * @stable [21.08.2018]
 */
export interface ISaveMessageWrapper {
  saveMessage?: string;
}

/**
 * @stable [11.09.2018]
 */
export interface ITightGridWrapper {
  tightGrid?: boolean;
}

/**
 * @stable [27.12.2018]
 */
export interface ITotalEntityWrapper<TTotalEntity> {
  totalEntity?: TTotalEntity;
}

export interface IStickyHeadWrapper { stickyHead?: boolean; }
export interface IApplyOddWrapper { applyOdd?: boolean; }
export interface IApplyGroupWrapper { applyGroup?: boolean; }

/**
 * @stable [04.10.2018]
 */
export interface IHoveredWrapper {
  hovered?: boolean;
}

/**
 * @stable [04.10.2018]
 */
export interface ISelectableWrapper {
  selectable?: boolean;
}

/* @stable - 12.04.2018 */
export interface IExtraParamsWrapper<TExtraParams> {
  extraParams?: TExtraParams;
}

export interface IQueueWrapper<TQueue> { queue?: TQueue; }
export interface ISectionNameWrapper { sectionName?: string; }

/* @stable - 12.04.2018 */
export interface IEditApiWrapper {
  editApi?: string;
}

/* @stable - 12.04.2018 */
export interface IAddApiWrapper {
  addApi?: string;
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

/* @stable - 19.04.2018 */
export interface ISuccessWrapper<TSuccess> {
  success?: TSuccess;
}

/* @stable - 19.04.2018 */
export interface IBooleanSuccessWrapper extends ISuccessWrapper<boolean> {
}

/**
 * @stable [16.06.2018]
 */
export interface IBlockWrapper<TBlock = boolean> {
  block?: TBlock;
}

export interface IParentWrapper<TParent> { parent?: TParent; }
export interface IRowWrapper<TRow = boolean> { row?: TRow; }
export interface ITooltipWrapper<TTooltip = string> { tooltip?: TTooltip; }

/* @stable - 19.04.2018 */
export interface ISmallWrapper<TSmall> {
  small?: TSmall;
}

/* @stable - 19.04.2018 */
export interface IBooleanSmallWrapper extends ISmallWrapper<boolean> {
}

export interface ILargeWrapper<TLarge = boolean> { large?: TLarge; }

/* @stable - 04.04.2018 */
export interface IStyleWrapper<TStyle> {
  style?: TStyle;
}

/* @stable - 19.04.2018 */
export interface ITextStyleWrapper<TTextStyle> {
  textStyle?: TTextStyle;
}

/* @stable - 20.04.2018 */
export interface IShadowStyleWrapper<TShadowStyle> {
  shadowStyle?: TShadowStyle;
}

/* @stable - 20.04.2018 */
export interface ICenterAlignmentWrapper {
  centerAlignment?: boolean;
}

/* @stable - 20.04.2018 */
export interface IHasContentWrapperWrapper {
  hasContentWrapper?: boolean;
}

/* @stable - 20.04.2018 */
export interface IModalWrapper<TModal> {
  modal?: TModal;
}

export interface IContentWrapper<TContent = JSX.Element> { content?: TContent; }

/* @stable [27.04.2018] */
export interface IDrawerContentWrapper<TDrawerContent = JSX.Element> {
  drawerContent?: TDrawerContent;
}

/* @stable [27.04.2018] */
export interface IHeaderContentWrapper<THeaderContent = JSX.Element> {
  headerContent?: THeaderContent;
}

/* @stable - 20.04.2018 */
export interface IBooleanModalWrapper extends IModalWrapper<boolean> {
}

export interface INoShrinkWrapper { noShrink?: boolean; }
export interface IResponsiveWrapper<TResponsive = boolean> { responsive?: TResponsive; }
export interface IFullWrapper<TFull = boolean> { full?: TFull; }

/**
 * @stable [20.09.2018]
 */
export interface ISeparatorWrapper<TSeparator = boolean> {
  separator?: TSeparator;
}

export interface IFullSizeWrapper { fullSize?: boolean; }
export interface IWrapWrapper { wrap?: boolean; }

/* @stable [27.04.2018] */
export interface IHeaderStyleWrapper<THeaderStyle = IKeyValue> {
  headerStyle?: THeaderStyle;
}

/* @stable [27.04.2018] */
export interface IContentStyleWrapper<TContentStyle  = IKeyValue> {
  contentStyle?: TContentStyle;
}

/* @stable [27.04.2018] */
export interface IDrawerContentStyleWrapper<TDrawerContentStyle = IKeyValue> {
  drawerContentStyle?: TDrawerContentStyle;
}

/* @stable [27.04.2018] */
export interface IUseDrawerWrapper {
  useDrawer?: boolean;
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

/* @stable [27.04.2018] */
export interface IUseHeaderWrapper {
  useHeader?: boolean;
}

/* @stable [27.04.2018] */
export interface IHeaderBackActionEnabledWrapper {
  headerBackActionEnabled?: boolean;
}

/* @stable [27.04.2018] */
export interface IHeaderMenuActionEnabledWrapper {
  headerMenuActionEnabled?: boolean;
}

/* @stable [27.04.2018] */
export interface IHeaderActionStyleWrapper<THeaderActionStyle = IKeyValue> {
  headerActionStyle?: THeaderActionStyle;
}

/* @stable [27.04.2018] */
export interface IHeaderTitleStyleWrapper<THeaderTitleStyle = IKeyValue> {
  headerTitleStyle?: THeaderTitleStyle;
}

/* @stable [27.04.2018] */
export interface IHeaderActionIconStyleWrapper<THeaderActionIconStyle = IKeyValue> {
  headerActionIconStyle?: THeaderActionIconStyle;
}

/* @stable - 19.04.2018 */
export interface IIconStyleWrapper<TIconStyle = IKeyValue> {
  iconStyle?: TIconStyle;
}

/* @stable - 04.04.2018 */
export interface ICssStyleWrapper extends IStyleWrapper<React.CSSProperties> {
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

export interface IAutoResetWrapper { autoReset?: boolean; }
export interface IFormatWrapper<TFormat = string> { format?: TFormat; }
export interface IFormWrapper<TForm> { form?: TForm; }
export interface IForwardedRefWrapper<TForwardedRef> { forwardedRef?: TForwardedRef; }

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

/* @stable - 05.04.2018 */
export interface IExcludeTargetsClassesWrapper<TExcludeTargetsClasses> {
  excludeTargetsClasses?: TExcludeTargetsClasses;
}

/* @stable - 05.04.2018 */
export interface IStringArrayExcludeTargetsClassesWrapper extends IExcludeTargetsClassesWrapper<string[]> {
}

/**
 * @stable [29.05.2018]
 */
export interface IOnBeforeSubmitWrapper<TOnBeforeSubmit> {
  onBeforeSubmit?: TOnBeforeSubmit;
}

/**
 * @stable [29.05.2018]
 */
export interface ISubmitWrapper<TPayload = AnyT, TSubmit = (payload?: TPayload) => void> {
  submit?: TSubmit;
}

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

export interface IIsOpenWrapper<TIsOpen> { isOpen?: TIsOpen; }
export interface IShowWrapper<TShow> { show?: TShow; }

/**
 * @stable [08.05.2018]
 */
export interface IOnCloseWrapper<TPayload = IEntity, TOnClose = (payload?: TPayload) => void> {
  onClose?: TOnClose;
}

/**
 * @stable [17.05.2018]
 */
export interface IOnAcceptWrapper<TOnAccept = (...args: AnyT[]) => void> {
  onAccept?: TOnAccept;
}

/**
 * @stable [08.05.2018]
 */
export interface IOnSelectWrapper<TSelectedObject = IEntity, TOnSelect = (object?: TSelectedObject) => void> {
  onSelect?: TOnSelect;
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

export interface IActivateWrapper<TActivate> { activate?: TActivate; }
export interface IMiniWrapper { mini?: boolean; }
export interface IOnDeactivateWrapper<TDeactivate> { onDeactivate?: TDeactivate; }
export interface IPreventFocusWrapper { preventFocus?: boolean; }

/**
 * @stable [21.09.2018]
 */
export interface IIgnoreEnterKeyCodeWrapper {
  ignoreEnterKey?: boolean;
}

export interface IActionsPosition<TActionsPosition> { actionsPosition?: TActionsPosition; }
export interface IMaxFilesWrapper { maxFiles?: number; }

/**
 * @stable [22.12.2018]
 */
export interface IDefaultDndMessageWrapper {
  defaultDndMessage?: string;
}

/**
 * @stable [22.12.2018]
 */
export interface IDefaultDndMessageFactoryWrapper<TDefaultDndMessageFactory> {
  defaultDndMessageFactory?: TDefaultDndMessageFactory;
}

/**
 * @stable [22.12.2018]
 */
export interface IPlaceholderFactoryWrapper<TPlaceholderFactory> {
  placeholderFactory?: TPlaceholderFactory;
}

export interface IUseKeyboardWrapper { useKeyboard?: boolean; }

/**
 * @stable [14.01.2019]
 */
export interface IUseSyntheticCursorWrapper {
  useSyntheticCursor?: boolean;
}

export interface IWidthWrapper<TWidth = number> { width?: TWidth; }

/**
 * @stable [10.09.2018]
 */
export interface IHeaderWidthWrapper {
  headerWidth?: number;
}

/**
 * @stable [10.09.2018]
 */
export interface IColumnWidthWrapper {
  columnWidth?: number;
}

export interface IMergerWrapper<TMerger> { merger?: TMerger; }

/**
 * @stable [02.02.2019]
 */
export interface ITokenWrapper<TToken = string> {
  token?: TToken;
}

export interface IActiveWrapper<TActive = boolean> { active?: TActive; }
export interface INavigateBackWrapper { navigateBack?: boolean; }
export interface IOriginalValueWrapper<TOriginalValue = AnyT> { originalValue?: TOriginalValue; }

/**
 * @stable [11.08.2018]
 */
export interface ICanReturnClearDirtyChangesValueWrapper {
  canReturnClearDirtyChangesValue?: boolean;
}

/**
 * @stable [02.02.2019]
 */
export interface IFormConfigurationWrapper<TFormConfiguration> {
  formConfiguration?: TFormConfiguration;
}

/**
 * @stable [13.04.2018]
 */
export interface ITypeWrapper<TType = string> {
  type?: TType;
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
export interface IHeaderColSpanWrapper {
  headerColSpan?: number;
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

export interface IStateWrapper<TState> { state?: TState; }

/**
 * @stable [03.06.2018]
 */
export interface IPathWrapper<TPath = string> {
  path?: TPath;
}

/**
 * @stable [17.06.2018]
 */
export interface IAppVersionWrapper {
  appVersion?: string;
}

/**
 * @stable [18.06.2018]
 */
export interface IStepWrapper<TStep = number> {
  step?: TStep;
}

/**
 * @stable [22.10.2018]
 */
export interface IDefaultValue<TDefaultValue = AnyT> {
  defaultValue?: TDefaultValue;
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

/**
 * @stable [03.05.2018]
 */
export interface IPasswordWrapper<TPassword = string> {
  password?: TPassword;
}

export interface IFactorWrapper<TFactor = number> { factor?: TFactor; }

/* @stable - 16.04.2018 */
export interface IChildrenWrapper<TChildren> {
  children?: TChildren;
}

/**
 * @stable [06.07.2018]
 */
export interface IInfoWrapper<TInfo = string> {
  info?: TInfo;
}

/* @stable - 15.04.2018 */
export interface INotificationWrapper<TNotification> {
  notification?: TNotification;
}

export interface IToWrapper<TTo = string> { to?: TTo; }

/**
 * @stable [09.12.2018]
 */
export interface IDisplayFileNameWrapper<TDisplayFileName = string> {
  displayFileName?: TDisplayFileName;
}

export interface IOpenViewerPopupOnFileSelectWrapper { openViewerPopupOnFileSelect?: boolean; }

/**
 * @stable [06.01.2019]
 */
export interface IDisplayFileFormatWrapper<TDisplayFileFormat = string> {
  displayFileFormat?: TDisplayFileFormat;
}

/* @stable - 20.04.2018 */
export interface IStringToWrapper extends IToWrapper<string> {
}

/**
 * @stable [09.12.2018]
 */
export type EntityCallbackWrapperT<TResult = string> = (entity: IEntity) => TResult;

/**
 * @stable [01.12.2018]
 */
export interface IJQueryElement<TElement extends Element = Element> extends JQuery<TElement> {
}

/**
 * @stable [07.01.2019]
 */
export interface IJQueryInputElement extends IJQueryElement<HTMLElement> {
  caret?(position?: number): number;
}

/**
 * @stable [10.09.2019]
 */
export enum UniCodesEnum {
  ARROW_RIGHT = '\u27f6',
  DASH = '\u2014',
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

export type ReactElementT = React.SFCElement<{ children: React.ReactChild[] }>;
export type ChangeEventT = React.ChangeEvent<{ value: AnyT, name?: string }>;
