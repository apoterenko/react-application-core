import * as React from 'react';

import { IDefaultApplicationState } from './store';

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

/* @stable - 31.03.2018 */
export interface IIpWrapper {
  ip?: string;
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

/* @stable - 01.04.2018 */
export interface IUrlWrapper<TUrl> {
  url?: TUrl;
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

/* @stable - 01.04.2018 */
export interface IOnChangeWrapper<TOnChange> {
  onChange?: TOnChange;
}

// TODO
export interface IFieldValueOnChangeWrapper extends IOnChangeWrapper<(name: string, value: AnyT) => void> {
}

/* @stable - 01.04.2018 */
export interface IStringUrlWrapper extends IUrlWrapper<string> {
}

/* @stable - 01.04.2018 */
export interface IOperationWrapper<TOperation> {
  operation?: TOperation;
}

/* @stable - 01.04.2018 */
export interface IDefaultOperationWrapper extends IOperationWrapper<IStringIdWrapper> {
}

/* @stable - 31.03.2018 */
export interface IDataWrapper<TData> {
  data?: TData;
}

/* @stable - 31.03.2018 */
export interface IAnyDataWrapper extends IDataWrapper<AnyT> {
}

/* @stable - 31.03.2018 */
export interface IEntitiesDataWrapper extends IDataWrapper<IEntity[]> {
}

/* @stable - 31.03.2018 */
export interface IOnLoadDictionaryWrapper {
  onLoadDictionary?(items: AnyT, dictionary?: string): void;
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

/* @stable - 31.03.2018 */
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
 * Sections's wrappers
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

/* @stable - 31.03.2018 */
export interface IChangesWrapper<TChanges extends IKeyValue> {
  changes?: TChanges;
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

/* @stable - 31.03.2018 */
export interface IEntityRawDataWrapper extends IRawDataWrapper<IEntity> {
}

/* @stable - 31.03.2018 */
export interface IDisabledWrapper {
  disabled?: boolean;
}

/* @stable - 31.03.2018 */
export interface IAlwaysDirtyWrapper {
  alwaysDirty?: boolean;
}

/* @stable - 31.03.2018 */
export interface ISubmittableWrapper {
  submittable?: boolean;
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

/* @stable - 31.03.2018 */
export interface IProgressWrapper {
  progress?: boolean;
}

/* @stable - 31.03.2018 */
export interface ITotalCountWrapper {
  totalCount?: number;
}

/* @stable - 31.03.2018 */
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

/**********************
 * PreventValueBinding's wrapper
 **********************/
export interface IPreventValueBindingWrapper {
  preventValueBinding?: boolean;
}

/**********************
 * Required's wrappers
 **********************/
export interface IRequiredWrapper<TRequired> {
  required?: TRequired;
}

export interface IStringRequiredWrapper extends IRequiredWrapper<string> {
}

/* @stable - 31.03.2018 */
export interface ISelectedWrapper<TSelected> {
  selected?: TSelected;
}

/* @stable - 31.03.2018 */
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

export interface IFieldValueEntity extends IAnyValueWrapper,
                                           IStringFieldWrapper {
}

export interface IFieldsValuesEntities extends IFieldsWrapper<IFieldValueEntity[]> {
}

export type FieldValueEntityT = IFieldValueEntity|IFieldsValuesEntities;

/* @stable - 31.03.2018 */
export interface IPageWrapper {
  page?: number;
}

/* @stable - 31.03.2018 */
export interface IPageSizeWrapper {
  pageSize?: number;
}

/* @stable - 31.03.2018 */
export interface ITotalAmountWrapper {
  totalAmount?: number;
}

/* @stable - 31.03.2018 */
export interface IDirtyWrapper {
  dirty?: boolean;
}

/* @stable - 31.03.2018 */
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
 * Open's wrappers
 **********************/
export interface IOpenWrapper<TOpen> {
  open?: TOpen;
}

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
export interface IIconWrapper<TIcon> {
  icon?: TIcon;
}

/* @stable - 31.03.2018 */
export interface IStringIconWrapper extends IIconWrapper<string> {
}

/**********************
 * Resolver's wrapper
 **********************/
export interface IResolverWrapper<TResolver> {
  resolver?: TResolver;
}

/**********************
 * Simple's wrapper
 **********************/
export interface ISimpleWrapper {
  simple?: boolean;
}

/* @stable - 31.03.2018 */
export interface IItemConfigurationWrapper<TItemConfiguration> {
  itemConfiguration?: TItemConfiguration;
}

/* @stable - 31.03.2018 */
export interface INonInteractiveWrapper {
  nonInteractive?: boolean;
}

/* @stable - 31.03.2018 */
export interface IUseTwoLineWrapper {
  useTwoLine?: boolean;
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

/* @stable - 31.03.2018 */
export interface IRendererWrapper<TRenderer> {
  renderer?: TRenderer;
}

/* @stable - 31.03.2018 */
export interface IItemRendererWrapper<TItem> extends IRendererWrapper<(item: TItem) => JSX.Element> {
}

/* @stable - 31.03.2018 */
export interface IEntityRendererWrapper extends IItemRendererWrapper<IEntity> {
}

/* @stable - 31.03.2018 */
export interface IToClassNameWrapper<TItem> {
  toClassName?(entity: TItem): string;
}

/* @stable - 31.03.2018 */
export interface IEntityToClassNameWrapper extends IToClassNameWrapper<IEntity> {
}

/* @stable - 04.04.2018 */
export interface IColumnsWrapper<TColumns> {
  columns?: TColumns;
}

/* @stable - 04.04.2018 */
export interface IComponentWrapper<TComponent> {
  component?: TComponent;
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

/* @stable - 31.03.2018 */
export interface INotUseClassNameWrapper {
  notUseClassName?: boolean;
}

/**********************
 * Menu's wrappers
 **********************/
export interface IMenuActionEntity<TValue> extends ILabelWrapper,
                                                   IStringIconWrapper,
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

/* @stable - 31.03.2018 */
export interface IRippableWrapper {
  rippable?: boolean;
}

/* @stable - 04.04.2018 */
export interface IStyleWrapper<TStyle> {
  style?: TStyle;
}

/* @stable - 04.04.2018 */
export interface ICssStyleWrapper extends IStyleWrapper<React.CSSProperties> {
}

/* @stable - 31.03.2018 */
export interface IFormWrapper<TForm> {
  form?: TForm;
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

/* @stable - 31.03.2018 */
export interface IOnClickWrapper<TOnClick> {
  onClick?: TOnClick;
}

/* @stable - 04.04.2018 */
export interface IEventOnClickWrapper extends IOnClickWrapper<(event: IDefaultBasicEvent) => void> {
}

/* @stable - 31.03.2018 */
export interface IPayloadOnClickWrapper<TClickPayload> extends IOnClickWrapper<(payload: TClickPayload) => void> {
}

/* @stable - 31.03.2018 */
export interface IEntityOnClickWrapper extends IPayloadOnClickWrapper<IEntity> {
}

/* @stable - 31.03.2018 */
export interface IOnSelectWrapper<TOnSelect> {
  onSelect?: TOnSelect;
}

/* @stable - 31.03.2018 */
export interface IPayloadOnSelectWrapper<TSelectPayload> extends IOnSelectWrapper<(payload: TSelectPayload) => void> {
}

/* @stable - 31.03.2018 */
export interface IEntityOnSelectWrapper extends IPayloadOnSelectWrapper<IEntity> {
}

/* @stable - 31.03.2018 */
export interface IOnSearchWrapper<TOnSearch> {
  onSearch?: TOnSearch;
}

/* @stable - 31.03.2018 */
export interface IDefaultOnSearchWrapper extends IOnSearchWrapper<() => void> {
}

/* @stable - 31.03.2018 */
export interface IOnCreateWrapper<TOnCreate> {
  onCreate?: TOnCreate;
}

/* @stable - 31.03.2018 */
export interface IDefaultOnCreateWrapper extends IOnCreateWrapper<() => void> {
}

/* @stable - 31.03.2018 */
export interface IActivateWrapper<TActivate> {
  activate?: TActivate;
}

/* @stable - 31.03.2018 */
export interface IDefaultActivateWrapper extends IActivateWrapper<() => void> {
}

/* @stable - 01.04.2018 */
export interface IIsNewWrapper {
  isNew?: boolean;
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

/* @stable - 01.04.2018 */
export interface IActiveWrapper<TActive> {
  active?: TActive;
}

/* @stable - 01.04.2018 */
export interface IBooleanActiveWrapper extends IActiveWrapper<boolean> {
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

export const LOGIN_FIELD_NAME = 'login';

export const PROGRESS_FIELD_NAME = 'progress';

export interface IToWrapper {
  to?: string;
}

export interface IInfoable<Type> {
  info?: Type;
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

export interface IPathWrapper {
  path?: string;
}

export interface IOnBaseClickWrapper extends IPayloadOnClickWrapper<BasicEventT> {
}

export interface IInitialChangesable<TAppState extends IDefaultApplicationState> {
  initialChanges?(state: TAppState): IKeyValue;
}

export const UNI_CODES = {
  dash: '\u2014',
  space: '\u0020',
  noBreakSpace: '\u00a0',
};

export interface IDefaultBasicEvent extends React.SyntheticEvent<{}> {
}
export type ReactElementT = React.SFCElement<{ children: React.ReactChild[] }>;
export type BasicEventT = React.SyntheticEvent<{}>;
export type FocusEventT = React.FocusEvent<{}>;
export type KeyboardEventT = React.KeyboardEvent<{}>;
export type ChangeEventT = React.ChangeEvent<{ value: AnyT, name?: string }>;

export const INITIAL_DIRTY_STATE: IDirtyWrapper = {
  dirty: true,
};
