import * as React from 'react';

import { IOperation } from './operation';
import { ApplicationStateT } from './store';

export type AnyT = any;
export type DisplayValueT = number | string;
export type EntityIdT = DisplayValueT;
export const FIRST_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_TIME_FROM = '00:00:00';
export const DEFAULT_TIME_TO = '23:59:59';
export const NEW_OPTION = 'new';
export const UNDEF = void 0;
export const ACTION_PREFIX = '$$-RAC-';

export interface IKeyValue {
  [index: string]: AnyT;
}

/**
 * Core fields
 */
export const ID_FIELD_NAME = 'id';
export const TYPE_FIELD_NAME = 'type';
export const PRIORITY_FIELD_NAME = 'priority';
export const FROM_DATE_FIELD_NAME = 'fromDate';
export const TO_DATE_FIELD_NAME = 'toDate';
export const FROM_TIME_FIELD_NAME = 'fromTime';
export const TO_TIME_FIELD_NAME = 'toTime';
export const TIME_FIELD_NAME = 'time';
export const DATE_FIELD_NAME = 'date';
export const FILTER_FIELD_NAME =  'filter';
export const URL_FIELD_NAME = 'url';
export const FILE_FIELD_NAME = 'file';
export const USER_FIELD_NAME = 'user';
export const EFFECTOR_FIELD_NAME = 'effector';
export const PASSWORD_FIELD_NAME = 'password';
export const EMAIL_FIELD_NAME = 'email';
export const NAME_FIELD_NAME = 'name';
export const VALUE_FIELD_NAME = 'value';
export const TIMES_FIELDS = [TIME_FIELD_NAME, FROM_TIME_FIELD_NAME, TO_TIME_FIELD_NAME];

/**********************
 * Id's wrappers
 **********************/
export interface IIdWrapper<TId> {
  id?: TId;
}

export interface IStringIdWrapper extends IIdWrapper<string> {
}

export interface INumberIdWrapper extends IIdWrapper<number> {
}

export interface IEntityIdWrapper extends IIdWrapper<EntityIdT> {
}

/**********************
 * Named entity
 **********************/
export interface INamedEntity extends IEntityIdWrapper,
                                      INameWrapper {
}

/**********************
 * User's wrappers
 **********************/
export interface IUserWrapper<TUser> {
  user?: TUser;
}

export interface IStringUserWrapper extends IUserWrapper<string> {
}

/**********************
 * Filter's wrapper
 **********************/
export interface IFilterWrapper<TFilter> {
  filter?: TFilter;
}

/**********************
 * Ip's wrapper
 **********************/
export interface IIpWrapper {
  ip?: string;
}

/**********************
 * Results's wrappers
 **********************/
export interface IResultWrapper<TResult> {
  result?: TResult;
}

export interface IAnyResultWrapper extends IResultWrapper<AnyT> {
}

/**********************
 * List's wrapper
 **********************/
export interface IListWrapper<TList> {
  list?: TList;
}

/**********************
 * Filtered list entity
 **********************/
export interface IFilteredListEntity<TFilter, TList> extends IFilterWrapper<TFilter>,
                                                             IListWrapper<TList> {
}

/**********************
 * Params's wrapper
 **********************/
export interface IParamsWrapper {
  params?: IKeyValue;
}

/**********************
 * Headers's wrapper
 **********************/
export interface IHeadersWrapper {
  headers?: IKeyValue;
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

/**********************
 * Channel's wrapper
 **********************/
export interface IChannelWrapper<TChannel> {
  channel?: TChannel;
}

export interface IStringChannelWrapper extends IChannelWrapper<string> {
}

/**********************
 * NoCache's wrapper
 **********************/
export interface INoCacheWrapper {
  noCache?: boolean;
}

/**********************
 * NoAuth's wrapper
 **********************/
export interface INoAuthWrapper {
  noAuth?: boolean;
}

/**********************
 * Auth's wrapper
 **********************/
export interface IAuthWrapper<TAuth> {
  auth?: TAuth;
}

export interface IStringAuthWrapper extends IAuthWrapper<string> {
}

/**********************
 * Sign's wrappers
 **********************/
export interface ISignInWrapper<TSignIn> {
  signIn?: TSignIn;
}

export interface ISignUpWrapper<TSignUp> {
  signUp?: TSignUp;
}

/**********************
 * Url's wrappers
 **********************/
export interface IUrlWrapper<TUrl> {
  url?: TUrl;
}

export interface IStringUrlWrapper extends IUrlWrapper<string> {
}

/**********************
 * Operations's wrappers
 **********************/
export interface IOperationWrapper<TOperation> {
  operation?: TOperation;
}

export interface IDefaultOperationWrapper extends IOperationWrapper<IOperation> {
}

/**********************
 * Data's wrappers
 **********************/
export interface IDataWrapper<TData> {
  data?: TData;
}

export interface IAnyDataWrapper extends IDataWrapper<AnyT> {
}

export interface IEntitiesDataWrapper extends IDataWrapper<IEntity[]> {
}

/**********************
 * Loading's wrapper
 **********************/
export interface ILoadingWrapper {
  loading?: boolean;
}

/**********************
 * Dictionary's wrappers
 **********************/
export interface IBindToDictionaryWrapper {
  bindToDictionary?: string;
}

export interface IOnEmptyDictionaryWrapper {
  onEmptyDictionary?(dictionary?: string): void;
}

export interface IOnLoadDictionaryWrapper {
  onLoadDictionary?(items: AnyT, dictionary?: string): void;
}

export interface IBindToDictionaryEntity extends IBindToDictionaryWrapper,
                                                 IOnEmptyDictionaryWrapper,
                                                 IOnLoadDictionaryWrapper {
}

export interface IDictionaryEntity<TData> extends IDataWrapper<TData[]|TData>,
                                                  ILoadingWrapper {
}

export interface IDictionaries {
  [dictionary: string]: IDictionaryEntity<{}>;
}

export interface IDictionariesWrapper<TDictionaries> {
  dictionaries?: TDictionaries;
}

/**********************
 * Label's wrapper
 **********************/
export interface ILabelWrapper {
  label?: string;
}

/**********************
 * DisplayName's wrapper
 **********************/
export interface IDisplayNameWrapper {
  displayName?: string;
}

/**********************
 * Messages's wrappers
 **********************/
export interface IMessageWrapper<TMessage> {
  messages?: TMessage;
}

export interface IStringMessageWrapper extends IMessageWrapper<string> {
}

export interface IMessagesWrapper<TMessages> {
  messages?: TMessages;
}

/**********************
 * Pattern's wrapper
 **********************/
export interface IPatternWrapper {
  pattern?: string;
}

/**********************
 * Placeholder's wrappers
 **********************/
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

/**********************
 * UseFilter's wrapper
 **********************/
export interface IUseFilterWrapper {
  useFilter?: boolean;
}

/**********************
 * FilterFn's wrapper
 **********************/
export interface IFilterFnWrapper<TFilteredItem> {
  filterFn?: (valueToFilter: string, item: TFilteredItem) => boolean;
}

/**********************
 * Section's wrappers
 **********************/
export interface ISectionWrapper {
  section?: string;
}

export interface ILinkedToSectionsWrapper {
  linkedToSections?: string[];
}

/**********************
 * Lock's wrappers
 **********************/
export interface ILockWrapper {
  lock?: boolean;
}

/**********************
 * Stack's wrapper
 **********************/
export interface IStackWrapper<TStack> {
  stack?: TStack;
}

/**********************
 * Payload's wrapper
 **********************/
export interface IPayloadWrapper<TPayload> {
  payload?: TPayload;
}

/**********************
 * Changes's wrappers
 **********************/
export interface IChangesWrapper<TChanges extends IKeyValue> {
  changes: TChanges;
}

export interface IKeyValueChangesWrapper extends IChangesWrapper<IKeyValue> {
}

/**********************
 * Email's wrapper
 **********************/
export interface IEmailWrapper {
  email?: string;
}

/**********************
 * Login's wrapper
 **********************/
export interface ILoginWrapper {
  login?: string;
}

/**********************
 * Query's wrappers
 **********************/
export interface IQueryWrapper<TQuery> {
  query?: string;
}

export interface IStringQueryWrapper extends IQueryWrapper<string> {
}

/**********************
 * Image's wrapper
 **********************/
export interface IImageWrapper<TImage> {
  image?: TImage;
}

/**********************
 * RawData's wrapper
 **********************/
export interface IRawDataWrapper<TRawData> {
  rawData?: TRawData;
}

/**********************
 * Date and time wrappers
 **********************/
export interface IDateWrapper {
  date?: string;
}

export interface ITimeWrapper {
  time?: string;
}

export interface IFromDateWrapper {
  fromDate?: string;
}

export interface IToDateWrapper {
  toDate?: string;
}

export interface IFromTimeWrapper {
  fromTime?: string;
}

export interface IToTimeWrapper {
  toTime?: string;
}

export interface IDateTimeEntity extends IDateWrapper,
                                         ITimeWrapper {
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

/**********************
 * Progress's wrapper
 **********************/
export interface IProgressWrapper {
  progress?: boolean;
}

/**********************
 * TotalCount's wrapper
 **********************/
export interface ITotalCountWrapper {
  totalCount?: number;
}

/**********************
 * Touched's wrapper
 **********************/
export interface ITouchedWrapper {
  touched?: boolean;
}

/**********************
 * Effector's wrapper
 **********************/
export interface IEffectorWrapper {
  effector?: string;
}

/**********************
 * Values's wrappers
 **********************/
export interface IValueWrapper<TValue> {
  value?: TValue;
}

export interface IStringValueWrapper extends IValueWrapper<string> {
}

export interface IAnyValueWrapper extends IValueWrapper<AnyT> {
}

/**********************
 * Name's wrapper
 **********************/
export interface INameWrapper {
  name?: string;
}

/**********************
 * Selected's wrappers
 **********************/
export interface ISelectedWrapper<TSelected> {
  selected?: TSelected;
}

export interface ISelectedEntityWrapper extends ISelectedWrapper<IEntity> {
}

/**********************
 * Fields's wrappers
 **********************/
export interface IFieldWrapper<TField> {
  field?: TField;
}

export interface IFieldsWrapper<TFields> {
  fields?: TFields;
}

export interface IStringFieldWrapper extends IFieldWrapper<string> {
}

export interface IFieldValueEntity extends IAnyValueWrapper, IStringFieldWrapper {
}

export interface IFieldsValuesEntities extends IFieldsWrapper<IFieldValueEntity[]> {
}

export type FieldValueEntityT = IFieldValueEntity|IFieldsValuesEntities;

/**********************
 * Page's wrapper
 **********************/
export interface IPageWrapper {
  page?: number;
}

/**********************
 * PageSize's wrapper
 **********************/
export interface IPageSizeWrapper {
  pageSize?: number;
}

/**********************
 * TotalAmount's wrapper
 **********************/
export interface ITotalAmountWrapper {
  totalAmount?: number;
}

/**********************
 * Dirty's wrapper
 **********************/
export interface IDirtyWrapper {
  dirty?: boolean;
}

/**********************
 * Valid's wrapper
 **********************/
export interface IValidWrapper {
  valid?: boolean;
}

/**********************
 * Priority's wrapper
 **********************/
export interface IPriorityWrapper {
  priority?: number;
}

/**********************
 * Errors's wrappers
 **********************/
export interface IErrorWrapper<TError> {
  error?: TError;
}

export interface ICustomErrorWrapper {
  customError?: boolean;
}

export interface IErrorEntity<TError> extends IErrorWrapper<TError>,
                                              ICustomErrorWrapper {
}

export interface IStringErrorEntity extends IErrorEntity<string> {
}

/**********************
 * Entity's wrapper
 **********************/
export interface IEntityWrapper<TEntity extends IEntity> {
  entity?: TEntity;
  entityId?: EntityIdT;
  originalEntity?: TEntity;
  isNewEntity?: boolean;
}

/**********************
 * Lists's wrapper
 **********************/
export interface IListEntity<TEntity extends IEntity> extends IPageWrapper,
                                                              ITotalCountWrapper,
                                                              IDataWrapper<TEntity[]> {
}

/**********************
 * Forms's wrappers
 **********************/
export interface IFormWrapper<TForm> {
  form?: TForm;
}

export interface IFormEntity<TChanges extends IKeyValue> extends IChangesWrapper<TChanges>,
                                                                 ITouchedWrapper,
                                                                 IDirtyWrapper,
                                                                 IProgressWrapper,
                                                                 IValidWrapper,
                                                                 IStringErrorEntity {
}

export interface IFormEntityWrapper<TEntity extends IEntity> extends IFormWrapper<IFormEntity<TEntity>>,
                                                                     IEntityWrapper<TEntity> {
}

/**********************
 * Entity
 **********************/
export interface IEntity extends IEntityIdWrapper,
                                 IKeyValue {
}

/**********************
 * Page entity
 **********************/
export interface IPageEntity extends IPageWrapper,
                                     IPageSizeWrapper,
                                     ITotalCountWrapper,
                                     ITotalAmountWrapper {
}

export interface IRendererWrapper<TItem> {
  renderer?(item: TItem): JSX.Element;
}

export interface ITplWrapper<TValue> {
  tpl?(value: TValue): string;
}

export interface ISorter {
  sorter?(item1: IEntity, item2: IEntity): number;
}

export interface IIconWrapper {
  icon?: string;
}

export interface ITokenWrapper<TToken> {
  token?: TToken;
}

export interface IStringTokenWrapper extends ITokenWrapper<string> {
}

export interface IOriginalValueable<TValue> {
  originalValue?: TValue;
}

export interface IDisplayValueWrapper<TDisplay> {
  displayValue?: TDisplay;
}

export interface IDisplayMessageWrapper {
  displayMessage?: string;
}

export interface IPasswordWrapper {
  password?: string;
}

export const IMAGE_FIELD_NAME = 'image';

export interface IReadonlyable {
  readOnly?: boolean;
}

export const LOGIN_FIELD_NAME = 'login';

export interface IStylizable {
  className?: string;
  noClassName?: boolean;
}

export const PROGRESS_FIELD_NAME = 'progress';

export interface IToWrapper {
  to?: string;
}

export interface ISimpleWrapper {
  simple?: boolean;
}

export interface ISaveable {
  saveable?: boolean;
}

export interface IInfoable<Type> {
  info?: Type;
}

export interface IIsNewWrapper {
  isNew?: boolean;
}

export interface ITypeWrapper<TType> {
  type?: TType;
}

export interface IStringTypeWrapper extends ITypeWrapper<string> {
}

export interface IStepable {
  step?: number;
}

export interface IMaskEntity {
  mask?: Array<string|RegExp>;
  maskGuide?: boolean;
  maskPlaceholderChar?: string;
}

export interface ITitleable {
  title?: string;
}

export interface IDisabledWrapper {
  disabled?: boolean;
}

export interface IActiveWrapper {
  active?: boolean;
}

export interface IPathWrapper {
  path?: string;
}

export interface IMergerWrapper<TMerger extends IKeyValue> {
  merger?: TMerger;
}

export interface IRippleable {
  rippled?: boolean;
}

export interface IOnClickWrapper<TEvent> {
  onClick?(event: TEvent): void;
}

export interface IOnBaseClickWrapper extends IOnClickWrapper<BasicEventT> {
}

export interface ISubmittable {
  submit?(): void;
}

export interface IInitialChangesable<TAppState extends ApplicationStateT> {
  initialChanges?(state: TAppState): IKeyValue;
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
