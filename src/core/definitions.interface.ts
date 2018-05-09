import * as React from 'react';
import * as URLSearchParams from 'url-search-params';

export type AnyT = any;
export type StringNumberT = number | string;
export type EntityIdT = StringNumberT;
export const FIRST_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_TIME_FROM = '00:00:00';
export const DEFAULT_TIME_TO = '23:59:59';
export const NEW_OPTION = 'new';
export const UNDEF = void 0;
export const ACTION_PREFIX = '$$-RAC-';
export enum SortDirectionEnum {
  ASC,
  DESC,
}

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
export const EFFECTOR_FIELD_NAME = 'effector';    /* @stable - 28.03.2018 */
export const PASSWORD_FIELD_NAME = 'password';
export const EMAIL_FIELD_NAME = 'email';
export const NAME_FIELD_NAME = 'name';
export const VALUE_FIELD_NAME = 'value';
export const TIMES_FIELDS = [TIME_FIELD_NAME, FROM_TIME_FIELD_NAME, TO_TIME_FIELD_NAME];

/* @stable - 01.04.2018 */
export interface IKeyValue {
  [index: string]: AnyT;
}

/* @stable - 31.03.2018 */
export interface IIdWrapper<TId> {
  id?: TId;
}

/* @stable - 31.03.2018 */
export interface IStringIdWrapper extends IIdWrapper<string> {
}

/* @stable - 31.03.2018 */
export interface INumberIdWrapper extends IIdWrapper<number> {
}

/* @stable - 31.03.2018 */
export interface IEntityIdTWrapper extends IIdWrapper<EntityIdT> {
}

/* @stable - 01.04.2018 */
export interface IEntity extends IEntityIdTWrapper,
                                 IKeyValue {
}

/* @stable - 01.04.2018 */
export interface INamedEntity extends IEntityIdTWrapper,
                                      INameWrapper {
}

/* @stable - 01.04.2018 */
export interface IUserWrapper<TUser> {
  user?: TUser;
}

/* @stable - 01.04.2018 */
export interface INumberUserWrapper extends IUserWrapper<number> {
}

/* @stable - 01.04.2018 */
export interface IFilterWrapper<TFilter> {
  filter?: TFilter;
}

/* @stable - 10.04.2018 */
export interface ITransportWrapper<TTransport> {
  transport?: TTransport;
}

/* @stable - 31.03.2018 */
export interface IIpWrapper {
  ip?: string;
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

/* @stable - 26.04.2018 */
export interface ICodeIdWrapper<TCodeId> {
  codeId?: TCodeId;
}

/* @stable - 26.04.2018 */
export interface INumberCodeIdWrapper extends ICodeIdWrapper<number> {
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

/* @stable - 31.03.2018 */
export interface IListWrapper<TList> {
  list?: TList;
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

export interface IFnReaderWrapper<TRequest, TResult> extends IReaderWrapper<(request: TRequest) => TResult> {
}

/**********************
 * Uuid's wrapper
 **********************/
export interface IUuidWrapper {
  uuid?: string;
}

/**********************
 * Command's wrappers
 **********************/
export interface ICommandWrapper<TCommand> {
  command?: TCommand;
}

export interface IStringCommandWrapper extends ICommandWrapper<string> {
}

/* @stable - 04.04.2018 */
export interface IAlignWrapper {
  align?: string;
}

/* @stable - 31.03.2018 */
export interface IChannelWrapper<TChannel> {
  channel?: TChannel;
}

/* @stable - 31.03.2018 */
export interface IStringChannelWrapper extends IChannelWrapper<string> {
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

/* @stable - 01.04.2018 */
export interface IOnSubmitWrapper<TOnSubmit> {
  onSubmit?: TOnSubmit;
}

/* @stable - 01.04.2018 */
export interface IOnResetWrapper<TOnReset> {
  onReset?: TOnReset;
}

/* @stable - 01.04.2018 */
export interface IDefaultOnResetWrapper extends IOnResetWrapper<() => void> {
}

/* @stable - 01.04.2018 */
export interface IOnValidWrapper<TOnValid> {
  onValid?: TOnValid;
}

/* @stable - 01.04.2018 */
export interface IDefaultOnValidWrapper extends IOnValidWrapper<(valid: boolean) => void> {
}

/* @stable - 04.04.2018 */
export interface IOnChangeSortDirectionWrapper<TOnChangeSortDirection> {
  onChangeSortDirection?: TOnChangeSortDirection;
}

/**
 * @stable [04.05.2018]
 */
export interface IOnChangeWrapper<TChangedValue = AnyT, TOnChange = (value: TChangedValue) => void> {
  onChange?: TOnChange;
}

/* @stable - 01.04.2018 */
export interface IOperationWrapper<TOperation> {
  operation?: TOperation;
}

/* @stable - 01.04.2018 */
export interface IDefaultOperationWrapper extends IOperationWrapper<IStringIdWrapper> {
}

/* @stable - 06.04.2018 */
export interface IItemsWrapper<TItems> {
  items?: TItems;
}

/* @stable [31.03.2018] */
export interface IDataWrapper<TData> {
  data?: TData;
}

/* @stable - 31.03.2018 */
export interface IAnyDataWrapper extends IDataWrapper<AnyT> {
}

/* @stable [31.03.2018] */
export interface IEntitiesDataWrapper extends IDataWrapper<IEntity[]> {
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

/* @stable - 22.04.2018 */
export interface IDictionariesWrapper<TDictionaries> {
  dictionaries?: TDictionaries;
}

/* @stable - 11.04.2018 */
export interface ILabelWrapper {
  label?: string;
}

/* @stable - 11.04.2018 */
export interface IPrefixLabelWrapper {
  prefixLabel?: string;
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

/* @stable - 11.04.2018 */
export interface IPatternWrapper<TPattern> {
  pattern?: TPattern;
}

/* @stable - 11.04.2018 */
export interface IStringPatternWrapper extends IPatternWrapper<string> {
}

/* @stable - 11.04.2018 */
export interface IPlaceholderWrapper {
  placeholder?: string;
}

export interface IFilterPlaceholderWrapper {
  filterPlaceholder?: string;
}

/**********************
 * RenderToBody's wrappers
 **********************/
export interface IRenderToBodyWrapper {
  renderToBody?: boolean;
}

export interface IRenderToCenterOfBodyWrapper {
  renderToCenterOfBody?: boolean;
}

export interface IRenderToBodyEntity extends IRenderToBodyWrapper,
                                             IRenderToCenterOfBodyWrapper {
}

/* @stable - 15.04.2018 */
export interface IUseFilterWrapper {
  useFilter?: boolean;
}

/**********************
 * FilterFn's wrapper
 **********************/
export interface IFilterFnWrapper<TFilteredItem> {
  filterFn?: (valueToFilter: string, item: TFilteredItem) => boolean;
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

/* @stable - 15.04.2018 */
export interface IPayloadWrapper<TPayload> {
  payload?: TPayload;
}

/* @stable - 31.03.2018 */
export interface IChangesWrapper<TChanges extends IKeyValue> {
  changes?: TChanges;
}

/* @stable - 11.04.2018 */
export interface IKeyValueChangesWrapper extends IChangesWrapper<IKeyValue> {
}

/* @stable - 15.04.2018 */
export interface IEmailWrapper<TEmail> {
  email?: TEmail;
}

/* @stable - 15.04.2018 */
export interface IStringEmailWrapper extends IEmailWrapper<string> {
}

/* @stable - 15.04.2018 */
export interface ILoginWrapper<TLogin> {
  login?: TLogin;
}

/* @stable - 15.04.2018 */
export interface IStringLoginWrapper extends ILoginWrapper<string> {
}

/* @stable - 01.04.2018 */
export interface IQueryWrapper<TQuery> {
  query?: TQuery;
}

/* @stable - 01.04.2018 */
export interface IStringQueryWrapper extends IQueryWrapper<string> {
}

/* @stable - 01.04.2018 */
export interface IListRoutePathWrapper {
  listRoutePath?: string;
}

/* @stable - 01.04.2018 */
export interface IListSectionWrapper {
  listSection?: string;
}

/* @stable - 01.04.2018 */
export interface IFormFilterSectionWrapper {
  formFilterSection?: string;
}

/* @stable - 31.03.2018 */
export interface IRawDataWrapper<TRawData> {
  rawData?: TRawData;
}

/* @stable - 24.04.2018 */
export interface ISeparatorsWrapper<TSeparators> {
  separators?: TSeparators;
}

/* @stable - 31.03.2018 */
export interface IEntityRawDataWrapper extends IRawDataWrapper<IEntity> {
}

/* @stable - 31.03.2018 */
export interface IDisabledWrapper {
  disabled?: boolean;
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

/* @stable - 31.03.2018 */
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
export interface IOnDelayWrapper<TOnDelay = () => void> {
  onDelay?: TOnDelay;
}

/* @stable - 31.03.2018 */
export interface ISubmittableWrapper {
  submittable?: boolean;
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

/* @stable - 01.04.2018 */
export interface IDateWrapper<TDate> {
  date?: TDate;
}

/* @stable - 01.04.2018 */
export interface IStringDateWrapper extends IDateWrapper<string> {
}

/* @stable - 01.04.2018 */
export interface ITimeWrapper<TTime> {
  time?: TTime;
}

/* @stable - 01.04.2018 */
export interface IStringTimeWrapper extends ITimeWrapper<string> {
}

/* @stable - 01.04.2018 */
export interface IFromDateWrapper<TFromDate> {
  fromDate?: TFromDate;
}

/* @stable - 01.04.2018 */
export interface IStringFromDateWrapper extends IFromDateWrapper<string> {
}

/* @stable - 01.04.2018 */
export interface IToDateWrapper<TToDate> {
  toDate?: TToDate;
}

/* @stable - 01.04.2018 */
export interface IStringToDateWrapper extends IToDateWrapper<string> {
}

export interface IStringFromTimeWrapper {
  fromTime?: string;
}

export interface IStringToTimeWrapper {
  toTime?: string;
}

export interface IDateTimeEntity extends IStringDateWrapper,
                                         IStringTimeWrapper {
}

export interface IFromDateFromTimeEntity extends IStringFromDateWrapper,
                                                 IStringFromTimeWrapper {
}

export interface IToDateToTimeEntity extends IStringToDateWrapper,
                                             IStringToTimeWrapper {
}

export interface IFromDateToDateEntity extends IStringFromDateWrapper,
                                               IStringToDateWrapper {
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

/* @stable [23.04.2018] */
export interface IBasicEvent extends React.SyntheticEvent<{}> {
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

/* @stable - 31.03.2018 */
export interface IProgressWrapper {
  progress?: boolean;
}

/* @stable - 11.04.2018 */
export interface IReadyWrapper {
  ready?: boolean;
}

/* @stable - 25.04.2018 */
export interface IAuthorizedWrapper {
  authorized?: boolean;
}

/* @stable - 20.04.2018 */
export interface IAccentWrapper {
  accent?: boolean;
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

/* @stable - 31.03.2018 */
export interface ITouchedWrapper {
  touched?: boolean;
}

/* @stable - 07.04.2018 */
export interface IEffectorWrapper<TEffector> {
  effector?: TEffector;
}

/* @stable - 07.04.2018 */
export interface IStringEffectorWrapper extends IEffectorWrapper<string> {
}

/**
 * @stable [07.04.2018]
 */
export interface IValueWrapper<TValue = AnyT> {
  value?: TValue;
}

/* @stable - 07.04.2018 */
export interface INumberValueWrapper extends IValueWrapper<number> {
}

/* @stable - 07.04.2018 */
export interface IStringValueWrapper extends IValueWrapper<string> {
}

/* @stable - 31.03.2018 */
export interface INameWrapper {
  name?: string;
}

/* @stable - 04.04.2018 */
export interface IDirectionWrapper<TDirection> {
  direction?: TDirection;
}

/* @stable - 04.04.2018 */
export interface IDirectionsWrapper<TDirection> {
  directions?: { [name: string]: TDirection };
}

/* @stable - 04.04.2018 */
export interface ISortDirectionWrapper extends IDirectionWrapper<SortDirectionEnum> {
}

/* @stable - 04.04.2018 */
export interface ISortDirectionsWrapper extends IDirectionsWrapper<SortDirectionEnum> {
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
 * @stable [31.03.2018]
 */
export interface ISelectedEntityWrapper extends ISelectedWrapper<IEntity> {
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
 * @stable [09.05.2018]
 */
export interface IPageSizeWrapper<TPageSize = number> {
  pageSize?: TPageSize;
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

/* @stable - 31.03.2018 */
export interface IDirtyWrapper {
  dirty?: boolean;
}

/* @stable - 31.03.2018 */
export interface IValidWrapper {
  valid?: boolean;
}

/* @stable - 02.05.2018 */
export interface IPriceWrapper<TPrice = number> {
  price?: TPrice;
}

/**********************
 * Priority's wrapper
 **********************/
export interface IPriorityWrapper {
  priority?: number;
}

/* @stable [27.04.2018] */
export interface ICloseWrapper<TClose> {
  close?: TClose;
}

/* @stable [27.04.2018] */
export interface IOpenWrapper<TOpen> {
  open?: TOpen;
}

/* @stable [27.04.2018] */
export interface IBooleanOpenWrapper extends IOpenWrapper<boolean> {
}

/* @stable - 31.03.2018 */
export interface IReadOnlyWrapper {
  readOnly?: boolean;
}

/* @stable - 31.03.2018 */
export interface IUseResetButtonWrapper {
  useResetButton?: boolean;
}

/* @stable - 31.03.2018 */
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

/* @stable - 31.03.2018 */
export interface IActionIconWrapper {
  actionIcon?: string;
}

/* @stable - 31.03.2018 */
export interface IIconWrapper<TIcon = string> {
  icon?: TIcon;
}

/* @stable - 15.04.2018 */
export interface IResolverWrapper<TResolver> {
  resolver?: TResolver;
}

/* @stable - 07.04.2018 */
export interface ISimpleWrapper {
  simple?: boolean;
}

/* @stable - 08.04.2018 */
export interface ISelfWrapper<TSelf> {
  self?: TSelf;
}

/* @stable - 08.04.2018 */
export interface IAnySelfWrapper extends ISelfWrapper<AnyT> {
}

/* @stable - 08.04.2018 */
export interface IHtmlElementSelfWrapper extends ISelfWrapper<HTMLElement> {
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

/* @stable - 31.03.2018 */
export interface IEmptyMessageWrapper<TEmptyMessage> {
  emptyMessage?: TEmptyMessage;
}

/* @stable - 31.03.2018 */
export interface IStringEmptyMessageWrapper extends IEmptyMessageWrapper<string> {
}

/* @stable - 15.04.2018 */
export interface IEmptyDataMessageWrapper<TEmptyDataMessage> {
  emptyDataMessage?: TEmptyDataMessage;
}

/* @stable - 15.04.2018 */
export interface IStringEmptyDataMessageWrapper extends IEmptyDataMessageWrapper<string> {
}

/* @stable - 31.03.2018 */
export interface ITplWrapper<TTpl> {
  tpl?: TTpl;
}

/* @stable - 31.03.2018 */
export interface IItemTplWrapper<TItem> extends ITplWrapper<(item: TItem) => React.ReactNode> {
}

/* @stable - 31.03.2018 */
export interface IEntityTplWrapper extends IItemTplWrapper<IEntity> {
}

/**
 * @stable [04.05.2018]
 */
export interface IRendererWrapper<TItem, TRenderer = (item: TItem) => JSX.Element> {
  renderer?: TRenderer;
}

/**
 * @stable [04.05.2018]
 */
export interface IEntityRendererWrapper extends IRendererWrapper<IEntity> {
}

/* @stable - 31.03.2018 */
export interface IToClassNameWrapper<TItem> {
  toClassName?(entity: TItem): string;
}

/* @stable - 31.03.2018 */
export interface IEntityToClassNameWrapper extends IToClassNameWrapper<IEntity> {
}

/* @stable - 04.04.2018 */
export interface IUseGroupingWrapper {
  useGrouping?: boolean;
}

/* @stable - 04.04.2018 */
export interface IUseLocalFilteringWrapper {
  useLocalFiltering?: boolean;
}

/* @stable - 04.04.2018 */
export interface IUseSortingWrapper {
  useSorting?: boolean;
}

/* @stable - 31.03.2018 */
export interface ISorterWrapper<TSorter> {
  sorter?: TSorter;
}

/* @stable - 31.03.2018 */
export interface IEntitySorterWrapper extends ISorterWrapper<(item1: IEntity, item2: IEntity) => number> {
}

/* @stable - 31.03.2018 */
export interface ITitleWrapper<TTitle> {
  title?: TTitle;
}

/* @stable - 31.03.2018 */
export interface IStringTitleWrapper extends ITitleWrapper<string> {
}

/* @stable - 31.03.2018 */
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

/* @stable - 15.04.2018 */
export interface IMessageWrapper<TMessage> {
  message?: TMessage;
}

/* @stable - 15.04.2018 */
export interface IStringMessageWrapper extends IMessageWrapper<string> {
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

/* @stable - 15.04.2018 */
export interface IErrorMessageWrapper<TErrorMessage> {
  errorMessage?: TErrorMessage;
}

/* @stable - 15.04.2018 */
export interface IStringErrorMessageWrapper extends IErrorMessageWrapper<string> {
}

/**********************
 * Menu's wrappers
 **********************/
export interface IMenuActionEntity<TValue> extends ILabelWrapper,
                                                   IIconWrapper,
                                                   IValueWrapper<TValue>,
                                                   IDisabledWrapper {
}

export interface IStringMenuActionEntity extends IMenuActionEntity<string> {
}

export interface IAnyMenuActionEntity extends IMenuActionEntity<AnyT> {
}

/* @stable - 31.03.2018 */
export interface IErrorWrapper<TError> {
  error?: TError;
}

/* @stable - 31.03.2018 */
export interface ICustomErrorWrapper<TCustomError> {
  customError?: TCustomError;
}

/* @stable - 31.03.2018 */
export interface IBooleanCustomErrorWrapper extends ICustomErrorWrapper<boolean> {
}

/* @stable - 31.03.2018 */
export interface INewEntityWrapper<TNewEntity> {
  newEntity?: TNewEntity;
}

/* @stable - 31.03.2018 */
export interface IBooleanNewEntityWrapper extends INewEntityWrapper<boolean> {
}

/* @stable - 31.03.2018 */
export interface IOriginalEntityWrapper<TOriginalEntity> {
  originalEntity?: TOriginalEntity;
}

/* @stable - 31.03.2018 */
export interface IEntityIdWrapper<TEntityId> {
  entityId?: TEntityId;
}

/* @stable - 31.03.2018 */
export interface IEntityWrapper<TEntity extends IEntity> {
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

/* @stable - 12.04.2018 */
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

/* @stable - 19.04.2018 */
export interface ITextWrapper<TText> {
  text?: TText;
}

/* @stable - 19.04.2018 */
export interface IStringTextWrapper extends ITextWrapper<string> {
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

/* @stable - 19.04.2018 */
export interface IBlockWrapper<TBlock> {
  block?: TBlock;
}

/* @stable - 19.04.2018 */
export interface IBooleanBlockWrapper extends IBlockWrapper<boolean> {
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

/* @stable - 31.03.2018 */
export interface IFormWrapper<TForm> {
  form?: TForm;
}

/* @stable - 05.04.2018 */
export interface IExcludeTargetsClassesWrapper<TExcludeTargetsClasses> {
  excludeTargetsClasses?: TExcludeTargetsClasses;
}

/* @stable - 05.04.2018 */
export interface IStringArrayExcludeTargetsClassesWrapper extends IExcludeTargetsClassesWrapper<string[]> {
}

/* @stable - 01.04.2018 */
export interface IOnBeforeSubmitWrapper<TOnBeforeSubmit> {
  onBeforeSubmit?: TOnBeforeSubmit;
}

/* @stable - 31.03.2018 */
export interface ISubmitWrapper<TSubmit> {
  submit?: TSubmit;
}

/* @stable - 31.03.2018 */
export interface IDefaultSubmitWrapper extends ISubmitWrapper<() => void> {
}

/* @stable - 19.04.2018 */
export interface IOnPressWrapper<TOnPress> {
  onPress?: TOnPress;
}

/* @stable - 19.04.2018 */
export interface IDefaultOnPressWrapper extends IOnPressWrapper<() => void> {
}

/* @stable - 31.03.2018 */
export interface IOnClickWrapper<TOnClick = () => void> {
  onClick?: TOnClick;
}

/* @stable - 04.04.2018 */
export interface IDefaultOnClickWrapper extends IOnClickWrapper<() => void> {
}

/* @stable - 04.04.2018 */
export interface IEventOnClickWrapper extends IOnClickWrapper<(event: IBasicEvent) => void> {
}

/* @stable - 31.03.2018 */
export interface IPayloadOnClickWrapper<TClickPayload> extends IOnClickWrapper<(payload: TClickPayload) => void> {
}

/* @stable - 31.03.2018 */
export interface IEntityOnClickWrapper extends IPayloadOnClickWrapper<IEntity> {
}

/**
 * @stable [08.05.2018]
 */
export interface IOnCloseWrapper<TOnClose = () => void> {
  onClose?: TOnClose;
}

/**
 * @stable [08.05.2018]
 */
export interface IOnSelectWrapper<TSelectedObject, TOnSelect = (object: TSelectedObject) => void> {
  onSelect?: TOnSelect;
}

/**
 * @stable [08.05.2018]
 */
export interface IEntityOnSelectWrapper extends IOnSelectWrapper<IEntity> {
}

/* @stable - 31.03.2018 */
export interface IOnCreateWrapper<TOnCreate = () => void> {
  onCreate?: TOnCreate;
}

/**
 * @stable [05.05.2018]
 */
export interface IActivateWrapper<TActivate = () => void> {
  activate?: TActivate;
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

/* @stable - 03.04.2018 */
export interface IWidthWrapper {
  width?: number;
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

/* @stable - 11.04.2018 */
export interface IOriginalValueWrapper<TOriginalValue> {
  originalValue?: TOriginalValue;
}

/* @stable - 11.04.2018 */
export interface ITypeWrapper<TType> {
  type?: TType;
}

/* @stable - 11.04.2018 */
export interface IStringTypeWrapper extends ITypeWrapper<string> {
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

/* @stable - 11.04.2018 */
export interface IDisplayMessageWrapper {
  displayMessage?: string;
}

/* @stable - 15.04.2018 */
export interface ICallbackWrapper<TCallback> {
  callback?: TCallback;
}

/* @stable - 15.04.2018 */
export interface IStateWrapper<TState> {
  state?: TState;
}

/* @stable - 14.04.2018 */
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

export interface IDisplayValueWrapper<TDisplay> {
  displayValue?: TDisplay;
}

export const IMAGE_FIELD_NAME = 'image';

export const LOGIN_FIELD_NAME = 'login';

export const PROGRESS_FIELD_NAME = 'progress';

export interface IStepable {
  step?: number;
}

export interface IOnBaseClickWrapper extends IPayloadOnClickWrapper<BasicEventT> {
}

export const UNI_CODES = {
  dash: '\u2014',
  space: '\u0020',
  noBreakSpace: '\u00a0',
};

export type ReactElementT = React.SFCElement<{ children: React.ReactChild[] }>;
export type BasicEventT = React.SyntheticEvent<{}>;
export type FocusEventT = React.FocusEvent<{}>;
export type KeyboardEventT = React.KeyboardEvent<{}>;
export type ChangeEventT = React.ChangeEvent<{ value: AnyT, name?: string }>;

export const INITIAL_DIRTY_STATE: IDirtyWrapper = {
  dirty: true,
};
