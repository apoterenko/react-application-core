import * as React from 'react';
import * as URLSearchParams from 'url-search-params';
import { IEffectsAction } from 'redux-effects-promise';

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
export const ACTION_PREFIX = '$$-RAC-';

/**
 * Core fields
 */
export const ID_FIELD_NAME = 'id';
export const KEY_FIELD_NAME = 'key';
export const TYPE_FIELD_NAME = 'type';
export const BODY_FIELD_NAME = 'body';
export const AUTH_FIELD_NAME = 'auth';
export const PARAMETERS_FIELD_NAME = 'parameters';
export const PRIORITY_FIELD_NAME = 'priority';
export const FROM_DATE_FIELD_NAME = 'fromDate';
export const TO_DATE_FIELD_NAME = 'toDate';
export const FROM_TIME_FIELD_NAME = 'fromTime';
export const TO_TIME_FIELD_NAME = 'toTime';
export const TIME_FIELD_NAME = 'time';
export const DATE_FIELD_NAME = 'date';
export const FILTER_FIELD_NAME =  'filter';
export const URL_FIELD_NAME = 'url';
export const EFFECTOR_FIELD_NAME = 'effector';                                            /* @stable [28.03.2018] */
export const PASSWORD_FIELD_NAME = 'password';
export const EMAIL_FIELD_NAME = 'email';
export const NAME_FIELD_NAME = 'name';
export const VALUE_FIELD_NAME = 'value';
export const TITLE_FIELD_NAME = 'title';
export const TIMES_FIELDS = [TIME_FIELD_NAME, FROM_TIME_FIELD_NAME, TO_TIME_FIELD_NAME];

/* @stable - 01.04.2018 */
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

/* @stable [23.04.2018] */
export interface IEmptyDataWrapper<TEmptyData> {
  emptyData?: TEmptyData;
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

/* @stable - 14.04.2018 */
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

/* @stable - 01.04.2018 */
export interface IResultWrapper<TResult> {
  result?: TResult;
}

/* @stable - 01.04.2018 */
export interface IAnyResultWrapper extends IResultWrapper<AnyT> {
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

/* @stable - 15.04.2018 */
export interface ILayoutWrapper<TLayout> {
  layout?: TLayout;
}

/* @stable - 15.04.2018 */
export interface IModeWrapper<TMode> {
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
export interface IUuidWrapper {
  uuid?: string;
}

/**
 * @stable [21.05.2018]
 */
export interface ICommandWrapper<TCommand = string> {
  command?: TCommand;
}

/**
 * @stable [21.05.2018]
 */
export interface IAlignWrapper {
  align?: string;
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
export interface IOnRemoveWrapper<TOnRemove> {
  onRemove?: TOnRemove;
}

/**
 * @stable [15.05.2018]
 */
export interface IOnResetWrapper<TOnReset = () => void> {
  onReset?: TOnReset;
}

/**
 * @stable [15.05.2018]
 */
export interface IOnInfoWrapper<TEntity = IEntity, TOnInfo = (entity?: TEntity) => void> {
  onInfo?: TOnInfo;
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

/* @stable - 01.04.2018 */
export interface IOperationWrapper<TOperation> {
  operation?: TOperation;
}

/* @stable - 01.04.2018 */
export interface IDefaultOperationWrapper extends IOperationWrapper<IStringIdWrapper> {
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
export interface IOnNavigationActionClickWrapper<TPayload = IBasicEvent, TOnNavigationActionClick = (payload?: TPayload) => void> {
  onNavigationActionClick?: TOnNavigationActionClick;
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
 * @stable [01.06.2018]
 */
export interface IEmptyOptionsWrapper {
  emptyOptions?: boolean;
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
 * @stable [04.05.2018]
 */
export interface IOnEmptyDictionaryWrapper {
  onEmptyDictionary?(dictionary?: string): void;
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

/* @stable - 11.04.2018 */
export interface IPrefixLabelWrapper {
  prefixLabel?: string;
}

/**
 * @stable [16.05.2018]
 */
export interface IDisplayWrapper<TDisplay = boolean> {
  display?: TDisplay;
}

/* @stable - 11.04.2018 */
export interface IDisplayNameWrapper {
  displayName?: string;
}

/* @stable - 31.03.2018 */
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
 * @stable [14.05.2018]
 */
export interface IRenderToBodyWrapper {
  renderToBody?: boolean;
}

/**
 * @stable [16.06.2018]
 */
export interface IAdjustWidthWrapper<TAdjustWidth = boolean> {
  adjustWidth?: TAdjustWidth;
}

/**
 * @stable [16.06.2018]
 */
export interface IAnchorWrapper<TAnchor = Element> {
  anchor?: TAnchor;
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
 * @stable [29.06.2018]
 */
export interface IUseFooterWrapper {
  useFooter?: boolean;
}

/**
 * @stable [07.06.2018]
 */
export interface IMultiWrapper {
  multi?: boolean;
}

/* @stable - 15.04.2018 */
export interface ISectionWrapper<TSection> {
  section?: TSection;
}

/* @stable - 15.04.2018 */
export interface IStringSectionWrapper extends ISectionWrapper<string> {
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
 * @stable [13.05.2018]
 */
export interface IEmailWrapper<TEmail = string> {
  email?: TEmail;
}

/**
 * @stable [13.05.2018]
 */
export interface IPhoneWrapper<TPhone = string> {
  phone?: TPhone;
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
 * @stable [02.06.2018]
 */
export interface IListSectionWrapper {
  listSection?: string;
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
 * @stable [04.05.2018]
 */
export interface IComponentPropsWrapper<TComponentProps> {
  componentProps?: TComponentProps;
}

/**
 * @stable [04.05.2018]
 */
export interface IComponentWrapper<TComponent> {
  component?: TComponent;
}

/**
 * @stable [09.05.2018]
 */
export interface IInputWrapper<TInput> {
  input?: TInput;
}

/**
 * @stable [09.05.2018]
 */
export interface IHTMLInputWrapper extends IInputWrapper<HTMLInputElement | HTMLTextAreaElement> {
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

export interface IStringFromTimeWrapper {
  fromTime?: string;
}

export interface IStringToTimeWrapper {
  toTime?: string;
}

export interface IFromDateFromTimeEntity extends IFromDateWrapper,
                                                 IStringFromTimeWrapper {
}

export interface IToDateToTimeEntity extends IToDateWrapper,
                                             IStringToTimeWrapper {
}

export interface IFromDateToDateEntity extends IFromDateWrapper,
                                               IToDateWrapper {
}

export interface IFromDateFromTimeToDateToTimeEntity extends IFromDateFromTimeEntity,
                                                             IToDateToTimeEntity {
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
 * @stable [23.04.2018]
 */
export interface IBasicEvent<TElement = {}> extends React.SyntheticEvent<TElement> {
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
 * @stable [23.06.2018]
 */
export interface IFocusedWrapper {
  focused?: boolean;
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
export interface IRequiredWrapper<TRequired = boolean> {
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
 * @stable [06.05.2018]
 */
export interface ISeparatedWrapper<TSeparated = boolean> {
  separated?: TSeparated;
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
 * @stable [27.04.2018]
 */
export interface IOpenFnWrapper extends IOpenWrapper<() => void> {
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
export interface INotUseErrorMessageWrapper {
  notUseErrorMessage?: boolean;
}

/**
 * @stable [18.06.2018]
 */
export interface IAutoCompleteWrapper<TAutoComplete = string> {
  autoComplete?: TAutoComplete;
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

/* @stable - 31.03.2018 */
export interface IActionTextWrapper {
  actionText?: string;
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

/* @stable - 15.04.2018 */
export interface IResolverWrapper<TResolver> {
  resolver?: TResolver;
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

/* @stable [23.04.2018] */
export interface IStopEventWrapper<TStopEvent> {
  stopEvent?: TStopEvent;
}

/* @stable - 31.03.2018 */
export interface INonInteractiveWrapper {
  nonInteractive?: boolean;
}

/* @stable - 31.03.2018 */
export interface IUseTwoLineWrapper {
  useTwoLine?: boolean;
}

/* @stable - 24.04.2018 */
export interface IAvatarWrapper<TAvatar> {
  avatar?: TAvatar;
}

/* @stable - 31.03.2018 */
export interface IUseAvatarWrapper {
  useAvatar?: boolean;
}

/* @stable - 31.03.2018 */
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
export interface IRendererWrapper<TItem = IEntity, TRenderer = (item: TItem) => JSX.Element> {
  renderer?: TRenderer;
}

/**
 * @stable [06.06.2018]
 */
export interface IHeaderRendererWrapper<TItem, TRenderer = (item: TItem) => JSX.Element> {
  headerRenderer?: TRenderer;
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
 * @stable [29.05.2018]
 */
export interface IUseLazyLoading {
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
export interface ITitleWrapper<TTitle = string> {
  title?: TTitle;
}

/**
 * @stable [06.06.2018]
 */
export interface IClearActionWrapper<TClearAction = boolean> {
  clearAction?: TClearAction;
}

/**
 * @stable [15.05.2018]
 */
export interface IClassNameWrapper {
  className?: string;
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
 * @stable [09.05.2018]
 */
export interface IUseDigitalWrapper {
  useDigital?: boolean;
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

/**
 * @stable [04.05.2018]
 */
export interface INotApplyFrameworkClassNameWrapper {
  notApplyFrameworkClassName?: boolean;
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

/* @stable - 31.03.2018 */
export interface IApiEntityWrapper<TApiEntity> {
  apiEntity?: TApiEntity;
}

/* @stable - 12.04.2018 */
export interface IExtraParamsWrapper<TExtraParams> {
  extraParams?: TExtraParams;
}

/**
 * @stable [17.05.2018]
 */
export interface IDispatchWrapper<TDispatch> {
  dispatch?: TDispatch;
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
 * @stable [16.06.2018]
 */
export interface IParentsWrapper<TParents> {
  parents?: TParents;
}

/**
 * @stable [16.06.2018]
 */
export interface IParentWrapper<TParent> {
  parent?: TParent;
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
export interface IRowWrapper<TRow> {
  row?: TRow;
}

/* @stable - 19.04.2018 */
export interface ISmallWrapper<TSmall> {
  small?: TSmall;
}

/* @stable - 19.04.2018 */
export interface IBooleanSmallWrapper extends ISmallWrapper<boolean> {
}

/* @stable - 19.04.2018 */
export interface ILargeWrapper<TLarge> {
  large?: TLarge;
}

/* @stable - 19.04.2018 */
export interface IBooleanLargeWrapper extends ILargeWrapper<boolean> {
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

/* @stable [27.04.2018] */
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

/* @stable - 20.04.2018 */
export interface IFullWrapper<TFull> {
  full?: TFull;
}

/* @stable - 20.04.2018 */
export interface IBooleanFullWrapper extends IFullWrapper<boolean> {
}

/* @stable - 20.04.2018 */
export interface IOpacityWrapper {
  opacity?: number;
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
 * @stable [15.05.2018]
 */
export interface IOnClickWrapper<TPayload = IBasicEvent, TOnClick = (payload?: TPayload) => void> {
  onClick?: TOnClick;
}

/**
 * @stable [09.06.2018]
 */
export interface IOnEmptyMessageClickWrapper<TPayload = IBasicEvent, TOnClick = (payload?: TPayload) => void> {
  onEmptyMessageClick?: TOnClick;
}

/**
 * @stable [15.05.2018]
 */
export interface IEntityOnClickWrapper extends IOnClickWrapper<IEntity> {
}

/**
 * @stable [17.05.2018]
 */
export interface IShowWrapper<TShow = () => void> {
  show?: TShow;
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
export interface IOnAcceptWrapper<TOnAccept = () => void> {
  onAccept?: TOnAccept;
}

/**
 * @stable [14.05.2018]
 */
export interface IOnSearchWrapper<TOnSearch = () => void> {
  onSearch?: TOnSearch;
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
export interface IOnDeactivateWrapper<TOnDeactivate = () => void> {
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
 * @stable [05.05.2018]
 */
export interface IActivateWrapper<TActivate = () => void> {
  activate?: TActivate;
}

/**
 * @stable [09.05.2018]
 */
export interface IEmptyMessageActionWrapper {
  emptyMessageAction?: boolean;
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
export interface IWidthWrapper {
  width?: number;
}

/**
 * @stable [10.06.2018]
 */
export interface IMinWidthWrapper {
  minWidth?: number;
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
 * @stable [15.05.2018]
 */
export interface IOriginalValueWrapper<TOriginalValue = AnyT> {
  originalValue?: TOriginalValue;
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
export interface IPathWrapper<TPath> {
  path?: TPath;
}

/* @stable - 14.04.2018 */
export interface IStringPathWrapper extends IPathWrapper<string> {
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

/* @stable - 15.04.2018 */
export interface IKeyWrapper<TKey> {
  key?: TKey;
}

/* @stable - 15.04.2018 */
export interface IStringKeyWrapper extends IKeyWrapper<string> {
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

/* @stable - 15.04.2018 */
export interface IInfoWrapper<TInfo> {
  info?: TInfo;
}

/* @stable - 15.04.2018 */
export interface IStringInfoWrapper extends IInfoWrapper<string> {
}

/* @stable - 15.04.2018 */
export interface INotificationWrapper<TNotification> {
  notification?: TNotification;
}

/* @stable - 20.04.2018 */
export interface IToWrapper<TTo> {
  to?: TTo;
}

/* @stable - 20.04.2018 */
export interface IStringToWrapper extends IToWrapper<string> {
}

export const IMAGE_FIELD_NAME = 'image';

export const LOGIN_FIELD_NAME = 'login';

export const PROGRESS_FIELD_NAME = 'progress';

export const UNI_CODES = {
  dash: '\u2014',
  space: '\u0020',
  noBreakSpace: '\u00a0',
};

export type ReactElementT = React.SFCElement<{ children: React.ReactChild[] }>;
export type BasicEventT = React.SyntheticEvent<{}>;
export type KeyboardEventT = React.KeyboardEvent<{}>;
export type ChangeEventT = React.ChangeEvent<{ value: AnyT, name?: string }>;

export const INITIAL_DIRTY_STATE: IDirtyWrapper = {
  dirty: true,
};
