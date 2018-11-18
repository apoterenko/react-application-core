import * as React from 'react';
import * as URLSearchParams from 'url-search-params';
import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

export type AnyT = any;
export type StringNumberT = number | string;
export type EntityIdT = StringNumberT;
export const FIRST_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 50;
export const DEFAULT_MAX_PAGE_SIZE = 100000;
export const DEFAULT_TIME_FROM = '00:00:00';
export const DEFAULT_TIME_TO = '23:59:59';
export const NEW_OPTION = 'new';
export const UNDEF = void 0;
export const CLEAR_DIRTY_CHANGES_VALUE = UNDEF;
export const ACTION_PREFIX = '$$-RAC-';

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
export const DAYS_OF_WEEK_MAP = R.mergeAll<{[id: number]: boolean}>(DAYS_OF_WEEK.map((day) => ({[day.id]: true})));
export const DAYS_OF_WEEK_SHORT_ARRAY = DAYS_OF_WEEK.map((day) => day.name.substr(0, 2).toUpperCase());

/**
 * Core fields
 */
export const ID_FIELD_NAME = 'id';                                                              /* @stable [02.07.2018] */
export const TYPE_FIELD_NAME = 'type';
export const BODY_FIELD_NAME = 'body';
export const AUTH_FIELD_NAME = 'auth';
export const PARAMETERS_FIELD_NAME = 'parameters';
export const FROM_DATE_FIELD_NAME = 'fromDate';
export const TO_DATE_FIELD_NAME = 'toDate';
export const FROM_TIME_FIELD_NAME = 'fromTime';
export const TO_TIME_FIELD_NAME = 'toTime';
export const TIME_FIELD_NAME = 'time';
export const DATE_FIELD_NAME = 'date';
export const FILTER_FIELD_NAME =  'filter';
export const URL_FIELD_NAME = 'url';
export const EFFECTOR_FIELD_NAME = 'effector';                                                  /* @stable [28.03.2018] */
export const PASSWORD_FIELD_NAME = 'password';
export const EMAIL_FIELD_NAME = 'email';
export const NAME_FIELD_NAME = 'name';                                                          /* @stable [16.08.2018] */
export const TITLE_FIELD_NAME = 'title';
export const ZIP_CODE_FIELD_NAME = 'zipCode';                                                   /* @stable [01.08.2018] */
export const AREA_FIELD_NAME = 'area';                                                          /* @stable [01.08.2018] */
export const REGION_FIELD_NAME = 'region';                                                      /* @stable [01.08.2018] */
export const CITY_FIELD_NAME = 'city';                                                          /* @stable [04.08.2018] */
export const DISPLAY_MESSAGE_FIELD_NAME = 'displayMessage';                                     /* @stable [29.10.2018] */

/**
 * @stable [31.07.2018]
 */
export interface IKeyValue {
  [index: string]: AnyT;
}

/**
 * @stable [13.05.2018]
 */
export interface IIdWrapper<TId = number> {
  id?: TId;
}

/**
 * @stable [13.05.2018]
 */
export interface IStringIdWrapper extends IIdWrapper<string> {
}

/**
 * @stable [13.05.2018]
 */
export interface IEntityIdTWrapper extends IIdWrapper<EntityIdT> {
}

/* @stable - 01.04.2018 */
export interface IEntity extends IEntityIdTWrapper,
                                 IKeyValue {
}

/**
 * @stable [14.08.2018]
 */
export interface IActiveValueWrapper<TActiveValue = number> {
  activeValue?: TActiveValue;
}

/**
 * @stable [14.05.2018]
 */
export interface IUserWrapper<TUser = string> {
  user?: TUser;
}

/**
 * @stable [14.05.2018]
 */
export interface INumberUserWrapper extends IUserWrapper<number> {
}

/* @stable - 10.04.2018 */
export interface ITransportWrapper<TTransport> {
  transport?: TTransport;
}

/**
 * @stable [20.05.2018]
 */
export interface IIpWrapper<TIp = string> {
  ip?: TIp;
}

/**
 * @stable [27.06.2018]
 */
export interface ISrcWrapper<TSrc = string> {
  src?: TSrc;
}

/**
 * @stable [27.06.2018]
 */
export interface IScaleWrapper<TScale = number> {
  scale?: TScale;
}

/**
 * @stable [30.06.2018]
 */
export interface IPreviewScaleWrapper<TScale = number> {
  previewScale?: TScale;
}

/**
 * @stable [27.06.2018]
 */
export interface IDefaultSrcWrapper<TDefaultSrc = string> {
  defaultScr?: TDefaultSrc;
}

/**
 * @stable [22.06.2018]
 */
export interface IActionedWrapper {
  actioned?: boolean;
}

/**
 * @stable [15.09.2018]
 */
export interface IIndexWrapper<TIndex = number> {
  index?: TIndex;
}

/* @stable [23.04.2018] */
export interface IEmptyDataWrapper<TEmptyData> {
  emptyData?: TEmptyData;
}

/**
 * @stable [02.07.2018]
 */
export interface IGroupByWrapper<TGroupBy> {
  groupBy?: TGroupBy;
}

/* @stable [23.04.2018] */
export interface IBooleanEmptyDataWrapper extends IEmptyDataWrapper<boolean> {
}

/* @stable - 14.04.2018 */
export interface IMappersWrapper<TMappers> {
  mappers?: TMappers;
}

/* @stable - 14.04.2018 */
export interface IRouteParamsWrapper<TRouteParams> {
  routeParams?: TRouteParams;
}

/**
 * @stable [13.05.2018]
 */
export interface ICodeIdWrapper<TCodeId = number> {
  codeId?: TCodeId;
}

/**
 * @stable [13.05.2018]
 */
export interface IBlockedWrapper<TBlocked = boolean> {
  blocked?: TBlocked;
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

/**
 * @stable [29.07.2018]
 */
export interface ILocationWrapper<TLocation> {
  location?: TLocation;
}

/* @stable - 14.04.2018 */
export interface IBrowserLocationWrapper extends ILocationWrapper<Location> {
}

/* @stable - 08.04.2018 */
export interface IProgressMessageWrapper<TProgressMessage> {
  progressMessage?: TProgressMessage;
}

/* @stable - 08.04.2018 */
export interface IStringProgressMessageWrapper extends IProgressMessageWrapper<string> {
}

/**
 * @stable [17.08.2018]
 */
export interface IResultWrapper<TResult = AnyT> {
  result?: TResult;
}

/* @stable - 01.04.2018 */
export interface IResponseWrapper<TResponse> {
  response?: TResponse;
}

/* @stable - 01.04.2018 */
export interface IAnyResponseWrapper extends IResponseWrapper<AnyT> {
}

/**
 * @stable [15.05.2018]
 */
export interface IListWrapper<TList = JSX.Element> {
  list?: TList;
}

/**
 * @stable [30.08.2018]
 */
export interface ITabPanelWrapper<TTabPanel = JSX.Element> {
  tabPanel?: TTabPanel;
}

/**
 * @stable [16.05.2018]
 */
export interface IMutatedListWrapper<TMutatedList> {
  mutatedList?: TMutatedList;
}

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
 * @stable [11.08.2018]
 */
export interface ILayoutWrapper<TLayout> {
  layout?: TLayout;
}

/**
 * @stable [10.08.2018]
 */
export interface IModeWrapper<TMode = string> {
  mode?: TMode;
}

/* @stable - 04.04.2018 */
export interface IParamsWrapper<TParams> {
  params?: TParams;
}

/* @stable - 04.04.2018 */
export interface IKeyValueParamsWrapper extends IParamsWrapper<IKeyValue> {
}

/* @stable - 04.04.2018 */
export interface IHeadersWrapper<THeaders> {
  headers?: IKeyValue;
}

/* @stable - 04.04.2018 */
export interface IKeyValueHeadersWrapper extends IHeadersWrapper<IKeyValue> {
}

/**********************
 * Method's wrapper
 **********************/
export interface IMethodWrapper {
  method?: string;
}

/**********************
 * Reader's wrapper
 **********************/
export interface IReaderWrapper<TReader> {
  reader?: TReader;
}

export interface IReaderFnWrapper<TRequest, TResult> extends IReaderWrapper<(request: TRequest) => TResult> {
}

/**
 * @stable [21.05.2018]
 */
export interface IAlignWrapper<TAlign = string> {
  align?: TAlign;
}

/**
 * @stable [10.09.2018]
 */
export interface ITextAlignWrapper<TTextAlign = string> {
  textAlign?: TTextAlign;
}

/**
 * @stable [20.05.2018]
 */
export interface IChannelWrapper<TChannel = string> {
  channel?: TChannel;
}

/**********************
 * NoCache's wrapper
 **********************/
export interface INoCacheWrapper {
  noCache?: boolean;
}

/* @stable - 05.04.2018 */
export interface INotApplyAuthWrapper {
  notApplyAuth?: boolean;
}

/* @stable - 01.04.2018 */
export interface IAuthWrapper<TAuth> {
  auth?: TAuth;
}

/* @stable - 01.04.2018 */
export interface IStringAuthWrapper extends IAuthWrapper<string> {
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
export interface IUrlWrapper<TUrl = string> {
  url?: TUrl;
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
 * @stable [07.07.2018]
 */
export interface IOperationWrapper<TOperation = IStringIdWrapper> {
  operation?: TOperation;
}

/**
 * @stable [17.08.2018]
 */
export interface IOperationIdWrapper {
  operationId?: string;
}

/**
 * @stable [30.05.2018]
 */
export interface IItemsWrapper<TItems> {
  items?: TItems;
}

/**
 * @stable [30.05.2018]
 */
export interface IItemWrapper<TItem> {
  item?: TItem;
}

/**
 * @stable [02.06.2018]
 */
export interface IItemIdWrapper<TItemId = EntityIdT> {
  itemId?: TItemId;
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
 * @stable [20.05.2018]
 */
export interface IConnectedWrapper<TConnected = boolean> {
  connected?: TConnected;
}

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

/**
 * @stable [20.08.2018]
 */
export interface IForceReloadWrapper {
  forceReload?: boolean;
}

/**
 * @stable [31.07.2018]
 */
export interface IOptionsWrapper<TOptions> {
  options?: TOptions;
}

/**
 * @stable [17.05.2018]
 */
export interface IOriginalDataWrapper<TOriginalData = IEntity[]> {
  originalData?: TOriginalData;
}

/**
 * @stable [17.05.2018]
 */
export interface IDataWrapper<TData = IEntity[]> {
  data?: TData;
}

/**
 * @stable [17.05.2018]
 */
export interface IAnyDataWrapper extends IDataWrapper<AnyT> {
}

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
 * @stable [04.05.2018]
 */
export interface IBindDictionaryWrapper<TBindDictionary = string> {
  bindDictionary?: TBindDictionary;
}

/**
 * @stable [30.05.2018]
 */
export interface IDictionariesWrapper<TDictionaries> {
  dictionaries?: TDictionaries;
}

/**
 * @stable [14.05.2018]
 */
export interface ILabelWrapper {
  label?: string;
}

/**
 * @stable [01.08.2018]
 */
export interface IPrefixLabelWrapper {
  prefixLabel?: string;
}

/**
 * @stable [01.08.2018]
 */
export interface IDisplayNameWrapper {
  displayName?: string;
}

/**
 * @stable [29.10.2018]
 */
export interface IMessagesWrapper<TMessages> {
  messages?: TMessages;
}

/* @stable - 23.04.2018 */
export interface IPluginsWrapper<TPlugins> {
  plugins?: TPlugins;
}

/**
 * @stable [17.06.2018]
 */
export interface IPatternWrapper<TPattern = string> {
  pattern?: TPattern;
}

/* @stable - 11.04.2018 */
export interface IPlaceholderWrapper {
  placeholder?: string;
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
 * @stable [14.05.2018]
 */
export interface IRenderToCenterOfBodyWrapper {
  renderToCenterOfBody?: boolean;
}

/**
 * @stable [14.05.2018]
 */
export interface IUseFilterWrapper {
  useFilter?: boolean;
}

/**
 * @stable [31.07.2018]
 */
export interface IRenderToXWrapper {
  renderToX?: number | (() => number);
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

/**
 * @stable [21.05.2018]
 */
export interface IPayloadWrapper<TPayload = AnyT> {
  payload?: TPayload;
}

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
export interface IEmailWrapper<TEmail = string> {
  email?: TEmail;
}

/**
 * @stable [13.05.2018]
 */
export interface ILoginWrapper<TLogin = string> {
  login?: TLogin;
}

/**
 * @stable [14.05.2018]
 */
export interface IQueryWrapper<TQuery = string> {
  query?: TQuery;
}

/**
 * @stable [06.07.2018]
 */
export interface IActivateQueryFilterWrapper {
  activateQueryFilter?: boolean;
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

/**
 * @stable [09.06.2018]
 */
export interface IFilterRoutePathWrapper {
  filterRoutePath?: string;
}

/**
 * @stable [22.08.2018]
 */
export interface IListSectionWrapper<TListSection = string> {
  listSection?: TListSection;
}

/**
 * @stable [11.06.2018]
 */
export interface IFormSectionWrapper<TFormSection = string> {
  formSection?: TFormSection;
}

/**
 * @stable [02.06.2018]
 */
export interface IFilterSectionWrapper {
  filterSection?: string;
}

/**
 * @stable [14.05.2018]
 */
export interface IRawDataWrapper<TRawData = IEntity> {
  rawData?: TRawData;
}

/* @stable - 24.04.2018 */
export interface ISeparatorsWrapper<TSeparators> {
  separators?: TSeparators;
}

/**
 * @stable [18.06.2018]
 */
export interface IRenderedWrapper {
  rendered?: boolean;
}

/**
 * @stable [23.09.2018]
 */
export interface IAvatarRenderedWrapper {
  avatarRendered?: boolean;
}

/**
 * @stable [10.09.2018]
 */
export interface IHeaderRenderedWrapper {
  headerRendered?: boolean;
}

/**
 * @stable [10.09.2018]
 */
export interface IColumnRenderedWrapper {
  columnRendered?: boolean;
}

/**
 * @stable [14.05.2018]
 */
export interface IDisabledWrapper {
  disabled?: boolean;
}

/**
 * @stable [29.05.2018]
 */
export interface IEnabledWrapper {
  enabled?: boolean;
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
export interface IActionsDisabledWrapper {
  actionsDisabled?: boolean;
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

/**
 * @stable [06.05.2018]
 */
export interface IOrderWrapper<TOrder = number> {
  order?: TOrder;
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
export interface I$DateWrapper<TDate = string> {
  $date?: TDate;
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

/**********************
 * Blob's wrappers
 **********************/
export interface IBlobWrapper {
  blob?: Blob;
}

export interface IBlobEntity extends IStringIdWrapper,
                                     IBlobWrapper {
}

/**
 * @stable [04.05.2018]
 */
export interface IKeyboardEvent<TTarget = {}> extends React.KeyboardEvent<TTarget> {
}

/**
 * @stable [09.05.2018]
 */
export interface IFocusEvent<TTarget = {}> extends React.FocusEvent<TTarget> {
}

/**
 * @stable [04.05.2018]
 */
export interface IChangeEvent<TTarget = IValueWrapper> extends React.ChangeEvent<TTarget> {
}

/**
 * @stable [18.05.2018]
 */
export interface IProgressWrapper {
  progress?: boolean;
}

/**
 * @stable [11.06.2018]
 */
export interface IBarcodeWrapper {
  barcode?: string;
}

/**
 * @stable [29.05.2018]
 */
export interface IReadyWrapper {
  ready?: boolean;
}

/**
 * @stable [29.05.2018]
 */
export interface IAuthorizedWrapper {
  authorized?: boolean;
}

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

/**
 * @stable [13.05.2018]
 */
export interface IEffectorWrapper<TEffector = string> {
  effector?: TEffector;
}

/**
 * @stable [07.04.2018]
 */
export interface IValueWrapper<TValue = AnyT> {
  value?: TValue;
}

/**
 * @stable [18.06.2018]
 */
export interface IDisplayValueWrapper<TDisplayValue = AnyT> {
  displayValue?: TDisplayValue;
}

/**
 * @stable [17.06.2018]
 */
export interface IEmptyValueWrapper<TValue = AnyT> {
  emptyValue?: TValue;
}

/**
 * @stable [13.05.2018]
 */
export interface INumberValueWrapper extends IValueWrapper<number> {
}

/**
 * @stable [13.05.2018]
 */
export interface IStringValueWrapper extends IValueWrapper<string> {
}

/**
 * @stable [10.11.2018]
 */
export interface ICodeWrapper<TCode = string> {
  code?: TCode;
}

/**
 * @stable [13.05.2018]
 */
export interface INameWrapper<TName = string> {
  name?: TName;
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

/* @stable - 11.04.2018 */
export interface IPreventValueBindingWrapper {
  preventValueBinding?: boolean;
}

/**
 * @stable [04.05.2018]
 */
export interface IMaskWrapper<TMask = Array<string|RegExp>> {
  mask?: TMask;
}

/**
 * @stable [30.06.2018]
 */
export interface IUsePreviewWrapper {
  usePreview?: boolean;
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

/**
 * @stable [04.05.2018]
 */
export interface ISelectedWrapper<TSelected = boolean> {
  selected?: TSelected;
}

/**
 * @stable [17.05.2018]
 */
export interface IRemovedWrapper<TRemoved = boolean> {
  removed?: TRemoved;
}

/**
 * @stable [17.05.2018]
 */
export interface IRemovedEntityWrapper<TEntity extends IEntity = IEntity> extends IRemovedWrapper<TEntity> {
}

/**
 * @stable [17.05.2018]
 */
export interface ISelectedEntityWrapper<TEntity extends IEntity = IEntity> extends ISelectedWrapper<TEntity> {
}

/* @stable - 09.04.2018 */
export interface IFieldWrapper<TField> {
  field?: TField;
}

/* @stable - 09.04.2018 */
export interface IFieldsWrapper<TFields> {
  fields?: TFields;
}

/**
 * @stable [09.05.2018]
 */
export interface IPageWrapper<TPage = number> {
  page?: TPage;
}

/**
 * @stable [27.06.2018]
 */
export interface IViewerWrapper<TViewer> {
  viewer?: TViewer;
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
 * @stable [06.05.2018]
 */
export interface ITotalAmountWrapper<TTotalAmount = number> {
  totalAmount?: TTotalAmount;
}

/**
 * @stable [06.05.2018]
 */
export interface IMainWrapper<TMain> {
  main?: TMain;
}

/**
 * @stable [18.05.2018]
 */
export interface IDirtyWrapper {
  dirty?: boolean;
}

/**
 * @stable [18.05.2018]
 */
export interface IValidWrapper {
  valid?: boolean;
}

/**
 * @stable [06.10.2018]
 */
export interface IChangeableWrapper {
  changeable?: boolean;
}

/**
 * @stable [22.06.2018]
 */
export interface IPriorityWrapper {
  priority?: number;
}

/* @stable [27.04.2018] */
export interface ICloseWrapper<TClose> {
  close?: TClose;
}

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

/**
 * @stable [14.06.2018]
 */
export interface IOpenedWrapper<TOpened = boolean> {
  opened?: TOpened;
}

/**
 * @stable [17.05.2018]
 */
export interface IHideWrapper<THide = boolean> {
  hide?: THide;
}

/**
 * @stable [17.05.2018]
 */
export interface IHideFnWrapper extends IHideWrapper<() => void> {
}

/**
 * @stable [18.05.2018]
 */
export interface IActionsWrapper<TActions> {
  actions?: TActions;
}

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

/**
 * @stable [02.08.2018]
 */
export interface IAutoWidthWrapper<TAutoWidth = boolean> {
  autoWidth?: TAutoWidth;
}

/**
 * @stable [02.06.2018]
 */
export interface IUseServiceWrapper {
  useService?: boolean;
}

/* @stable - 31.03.2018 */
export interface IReadOnlyWrapper {
  readOnly?: boolean;
}

/**
 * @stable [29.05.2018]
 */
export interface IUseResetButtonWrapper {
  useResetButton?: boolean;
}

/**
 * @stable [29.05.2018]
 */
export interface INotUseActionsWrapper {
  notUseActions?: boolean;
}

/**
 * @stable [22.08.2018]
 */
export interface IActionTextWrapper {
  actionText?: string;
}

/**
 * @stable [15.09.2018]
 */
export interface IFieldRenderedWrapper {
  fieldRendered?: boolean;
}

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

/* @stable - 31.03.2018 */
export interface IResetTextWrapper {
  resetText?: string;
}

/**
 * @stable [29.05.2018]
 */
export interface IActionIconWrapper<TActionIcon = string> {
  actionIcon?: TActionIcon;
}

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
 * @stable [17.05.2018]
 */
export interface ISelfWrapper<TSelf = Element> {
  self?: TSelf;
}

/**
 * @stable [17.05.2018]
 */
export interface IAnySelfWrapper extends ISelfWrapper<AnyT> {
}

/* @stable - 24.04.2018 */
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
 * @stable [12.08.2018]
 */
export interface IOnPlusClickWrapper<TOnPlusClick = () => void> {
  onPlusClick?: TOnPlusClick;
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

/* @stable - 31.03.2018 */
export interface ITplWrapper<TTpl> {
  tpl?: TTpl;
}

/**
 * @stable [07.06.2018]
 */
export interface ITplFnWrapper<TItem = IEntity, TResult = string | number> extends ITplWrapper<(item: TItem) => TResult> {
}

/**
 * @stable [14.05.2018]
 */
export interface IRendererWrapper<TItem = IEntity, TContext = AnyT, TRenderer = (item: TItem, context?: TContext) => JSX.Element> {
  renderer?: TRenderer;
}

/**
 * @stable [04.08.2018]
 */
export interface IWarningWrapper<TWarning = boolean> {
  warning?: TWarning;
}

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

/**
 * @stable [14.05.2018]
 */
export interface IUseGroupingWrapper {
  useGrouping?: boolean;
}

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
 * @stable [07.06.2018]
 */
export interface IUseLocalFilteringWrapper {
  useLocalFiltering?: boolean;
}

/**
 * @stable [14.05.2018]
 */
export interface ISorterWrapper<TSorter> {
  sorter?: TSorter;
}

/**
 * @stable [14.11.2018]
 */
export interface IDispatchFormChangesWrapper {
  dispatchFormChanges?<TChanges extends IKeyValue = IKeyValue>(changes: TChanges): void;
}

/**
 * @stable [18.11.2018]
 */
export interface IDispatchLoadDictionaryWrapper {
  dispatchLoadDictionary<TData = IKeyValue>(dictionary: string, data?: TData): void;
}

/**
 * @stable [14.05.2018]
 */
export interface ISorterFnWrapper<TSortedItem = IEntity, TSorter = (item1: TSortedItem, item2: TSortedItem) => number>
  extends ISorterWrapper<TSorter> {
}

/**
 * @stable [14.05.2018]
 */
export interface IFilterWrapper<TFilter = string> {
  filter?: TFilter;
}

/**
 * @stable [29.10.2018]
 */
export interface IReturnSerializedValueOnChangeWrapper {
  returnSerializedValueOnChange?: boolean;
}

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
 * @stable [14.05.2018]
 */
export interface ITitleWrapper {
  title?: string;
}

/**
 * @stable [07.08.2018]
 */
export interface ITopTitleWrapper<TTopTitle = string> {
  topTitle?: TTopTitle;
}

/**
 * @stable [07.08.2018]
 */
export interface ISubTitleWrapper<TSubTitle = string> {
  subTitle?: TSubTitle;
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

/**
 * @stable [15.05.2018]
 */
export interface IClassNameWrapper<TClassName = string> {
  className?: TClassName;
}

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

/**
 * @stable [29.07.2018]
 */
export interface ICountryWrapper<TCountry = string> {
  country?: TCountry;
}

/**
 * @stable [29.07.2018]
 */
export interface IPlaceWrapper<TPlace = string> {
  place?: TPlace;
}

/**
 * @stable [01.08.2018]
 */
export interface IPlaceEntityWrapper<TPlaceEntity> {
  placeEntity?: TPlaceEntity;
}

/**
 * @stable [29.07.2018]
 */
export interface IPlaceIdWrapper<TPlaceId = string> {
  placeId?: TPlaceId;
}

/**
 * @stable [01.08.2018]
 */
export interface IZipCodeWrapper<TZipCode = string> {
  zipCode?: TZipCode;
}

/**
 * @stable [29.07.2018]
 */
export interface ILatWrapper<TLat = number> {
  lat?: TLat;
}

/**
 * @stable [29.07.2018]
 */
export interface ILngWrapper<TLng = number> {
  lng?: TLng;
}

/**
 * @stable [01.08.2018]
 */
export interface IRegionWrapper<TRegion = string> {
  region?: TRegion;
}

/**
 * @stable [01.08.2018]
 */
export interface IAreaWrapper<TArea = string> {
  area?: TArea;
}

/**
 * @stable [29.07.2018]
 */
export interface ICityWrapper<TCity = string> {
  city?: TCity;
}

/**
 * @stable [29.07.2018]
 */
export interface IStreetWrapper<TStreet = string> {
  street?: TStreet;
}

/**
 * @stable [29.07.2018]
 */
export interface IStreetNumberWrapper<TStreetNumber = string> {
  streetNumber?: TStreetNumber;
}

/**
 * @stable [31.05.2018]
 */
export interface IMoreOptionsWrapper<TMoreOptions> {
  moreOptions?: TMoreOptions;
}

/**
 * @stable [08.08.2018]
 */
export interface IMoreOptionsConfigurationWrapper<TMoreOptionsConfiguration> {
  moreOptionsConfiguration?: TMoreOptionsConfiguration;
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

/* @stable - 15.04.2018 */
export interface IErrorMessageWrapper<TErrorMessage> {
  errorMessage?: TErrorMessage;
}

/* @stable - 15.04.2018 */
export interface IStringErrorMessageWrapper extends IErrorMessageWrapper<string> {
}

/**
 * @stable [29.05.2018]
 */
export interface IErrorWrapper<TError = boolean> {
  error?: TError;
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
 * @stable [29.05.2018]
 */
export interface INewEntityWrapper<TNewEntity = boolean> {
  newEntity?: TNewEntity;
}

/* @stable - 31.03.2018 */
export interface IOriginalEntityWrapper<TOriginalEntity> {
  originalEntity?: TOriginalEntity;
}

/* @stable - 31.03.2018 */
export interface IEntityIdWrapper<TEntityId> {
  entityId?: TEntityId;
}

/**
 * @stable [16.05.2018]
 */
export interface IEntityWrapper<TEntity = IEntity> {
  entity?: TEntity;
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
 * @stable [04.10.2018]
 */
export interface IApplyOddWrapper {
  applyOdd?: boolean;
}

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

/* @stable - 12.04.2018 */
export interface IQueueWrapper<TQueue> {
  queue?: TQueue;
}

/* @stable - 12.04.2018 */
export interface ISectionNameWrapper {
  sectionName?: string;
}

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

/**
 * @stable [23.09.2018]
 */
export interface IParentWrapper<TParent> {
  parent?: TParent;
}

/**
 * @stable [16.06.2018]
 */
export interface IParentsWrapper<TParents> {
  parents?: TParents;
}

/**
 * @stable [16.06.2018]
 */
export interface IParentIdWrapper {
  parentId?: EntityIdT;
}

/**
 * @stable [16.06.2018]
 */
export interface IParentNameWrapper {
  parentName?: string;
}

/**
 * @stable [17.06.2018]
 */
export interface IRowWrapper<TRow = boolean> {
  row?: TRow;
}

/* @stable - 19.04.2018 */
export interface ISmallWrapper<TSmall> {
  small?: TSmall;
}

/* @stable - 19.04.2018 */
export interface IBooleanSmallWrapper extends ISmallWrapper<boolean> {
}

/**
 * @stable [13.10.2018]
 */
export interface ILargeWrapper<TLarge = boolean> {
  large?: TLarge;
}

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

/**
 * @stable [13.10.2018]
 */
export interface IContentWrapper<TContent = JSX.Element> {
  content?: TContent;
}

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

/**
 * @stable [14.09.2018]
 */
export interface IFullWrapper<TFull = boolean> {
  full?: TFull;
}

/**
 * @stable [27.10.2018]
 */
export interface IOverflowWrapper<TOverflow = boolean> {
  overflow?: TOverflow;
}

/**
 * @stable [27.10.2018]
 */
export interface IOverflowMinContentHeightWrapper<TOverflowMinContentHeight = boolean> {
  overflowMinContentHeight?: TOverflowMinContentHeight;
}

/**
 * @stable [20.09.2018]
 */
export interface ISeparatorWrapper<TSeparator = boolean> {
  separator?: TSeparator;
}

/**
 * @stable [17.09.2018]
 */
export interface IAlignItemsCenterWrapper {
  alignItemsCenter?: boolean;
}

/**
 * @stable [17.09.2018]
 */
export interface IAlignItemsEndWrapper {
  alignItemsEnd?: boolean;
}

/**
 * @stable [17.09.2018]
 */
export interface IJustifyContentEndWrapper {
  justifyContentEnd?: boolean;
}

/**
 * @stable [18.09.2018]
 */
export interface IJustifyContentCenterWrapper {
  justifyContentCenter?: boolean;
}

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

/**
 * @stable [29.05.2018]
 */
export interface IFormWrapper<TForm> {
  form?: TForm;
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
 * @stable [17.05.2018]
 */
export interface IShowWrapper<TShow = () => void> {
  show?: TShow;
}

/**
 * @stable [22.08.2018]
 */
export interface IAfterShowWrapper<TAfterShow = () => void> {
  afterShow?: TAfterShow;
}

/**
 * @stable [02.08.2018]
 */
export interface IIsOpenWrapper<TIsOpen = (...args: AnyT[]) => boolean> {
  isOpen?: TIsOpen;
}

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
 * @stable [18.05.2018]
 */
export interface IOnDeactivateWrapper<TOnDeactivate = (...args: AnyT[]) => void> {
  onDeactivate?: TOnDeactivate;
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
 * @stable [05.05.2018]
 */
export interface IActivateWrapper<TActivate = (...args: AnyT[]) => void> {
  activate?: TActivate;
}

/**
 * @stable [09.05.2018]
 */
export interface IEmptyMessageActionWrapper {
  emptyMessageAction?: boolean;
}

/**
 * @stable [02.07.2018]
 */
export interface IPreventFocusWrapper {
  preventFocus?: boolean;
}

/**
 * @stable [23.09.2018]
 */
export interface IMiniWrapper {
  mini?: boolean;
}

/**
 * @stable [21.09.2018]
 */
export interface IIgnoreEnterKeyCodeWrapper {
  ignoreEnterKeyCodeWrapper?: boolean;
}

/**
 * @stable [09.05.2018]
 */
export interface IEmptyMessageActionConfigurationWrapper<TEmptyMessageActionConfigurationWrapper> {
  emptyMessageActionConfiguration?: TEmptyMessageActionConfigurationWrapper;
}

/**
 * @stable [18.05.2018]
 */
export interface IActionsPosition<TActionsPosition> {
  actionsPosition?: TActionsPosition;
}

/**
 * @stable [08.05.2018]
 */
export interface IUseKeyboardWrapper {
  useKeyboard?: boolean;
}

/* @stable - 01.04.2018 */
export interface IIsNewWrapper {
  isNew?: boolean;
}

/* @stable [05.05.2018] */
export interface ICheckedWrapper<TChecked = boolean> {
  checked?: TChecked;
}

/**
 * @stable [10.06.2018]
 */
export interface IWidthWrapper<TWidth = number> {
  width?: TWidth;
}

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

/* @stable - 01.04.2018 */
export interface IMergerWrapper<TMerger> {
  merger?: TMerger;
}

/* @stable - 31.03.2018 */
export interface ITokenWrapper<TToken> {
  token?: TToken;
}

/* @stable - 31.03.2018 */
export interface IStringTokenWrapper extends ITokenWrapper<string> {
}

/**
 * @stable [04.05.2018]
 */
export interface IActiveWrapper<TActive = boolean> {
  active?: TActive;
}

/**
 * @stable [30.10.2018]
 */
export interface IPassiveWrapper<TPassive = boolean> {
  passive?: TPassive;
}

/**
 * @stable [15.05.2018]
 */
export interface IOriginalValueWrapper<TOriginalValue = AnyT> {
  originalValue?: TOriginalValue;
}

/**
 * @stable [16.11.2018]
 */
export interface ICanReturnWrapper {
  canReturn?: boolean;
}

/**
 * @stable [11.08.2018]
 */
export interface ICanReturnClearDirtyChangesValueWrapper {
  canReturnClearDirtyChangesValue?: boolean;
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

/* @stable - 14.04.2018 */
export interface IInitialChangesWrapper<TInitialChanges> {
  initialChanges?: TInitialChanges;
}

/* @stable - 14.04.2018 */
export interface IStateInitialChangesWrapper<TAppState> extends IInitialChangesWrapper<(state: TAppState) => IKeyValue> {
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
 * @stable [11.06.2018]
 */
export interface IStateWrapper<TState> {
  state?: TState;
}

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

/* @stable - 15.04.2018 */
export interface IRootWrapper<TRoot> {
  root?: TRoot;
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

/* @stable - 16.04.2018 */
export interface IFactorWrapper<TFactor> {
  factor?: TFactor;
}

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

/**
 * @stable [12.10.2018]
 */
export interface IFromWrapper<TFrom = string> {
  from?: TFrom;
}

/**
 * @stable [12.10.2018]
 */
export interface IToWrapper<TTo = string> {
  to?: TTo;
}

/* @stable - 20.04.2018 */
export interface IStringToWrapper extends IToWrapper<string> {
}

/**
 * @stable [11.11.2018]
 */
export interface IBaseEvent {
  nativeEvent?: Event;
  stopPropagation();
  preventDefault();
}

export const IMAGE_FIELD_NAME = 'image';

export const PROGRESS_FIELD_NAME = 'progress';

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
export type BasicEventT = React.SyntheticEvent<{}>;
export type KeyboardEventT = React.KeyboardEvent<{}>;
export type ChangeEventT = React.ChangeEvent<{ value: AnyT, name?: string }>;
