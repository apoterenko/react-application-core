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

export const ID_FIELD_NAME = 'id';

export interface IIdentifiable<TId> {
  id?: TId;
}

export interface IIdentifiedEntity extends IIdentifiable<EntityIdT> {
}

export interface INamedEntity extends IIdentifiedEntity,
                                      INameWrapper {
}

export interface IBlobEntity extends IIdentifiable<string> {
  blob: Blob;
}

export interface IEntity extends IIdentifiedEntity, IKeyValue {
}

export const NAME_FIELD_NAME = 'name';

export interface INameWrapper {
  name?: string;
}

export interface IRenderable<Type> {
  renderer?(item: Type): JSX.Element;
}

export interface ITemplateable<Type> {
  tpl?(node: Type): React.ReactNode;
}

export interface ISorter {
  sorter?(item1: IEntity, item2: IEntity): number;
}

export interface IIconable {
  icon?: string;
}

export interface IFilterable {
  useFilter?: boolean;
  filterPlaceholder?: string;
}

export interface IPlaceholderable {
  placeholder?: string;
}

export interface ISectionable {
  section?: string;
}

export const VALUE_FIELD_NAME = 'value';

export interface IValueWrapper<TValue> {
  value?: TValue;
}

export interface IStringValueWrapper extends IValueWrapper<string> {
}

export interface ITokenWrapper<TToken> {
  token?: TToken;
}

export interface IStringTokenWrapper extends ITokenWrapper<string> {
}

export interface IOriginalValueable<TValue> {
  originalValue?: TValue;
}

export interface IDisplayNameWrapper {
  displayName?: string;
}

export interface IDisplayValueWrapper<TDisplay> {
  displayValue?: TDisplay;
}

export interface IDisplayMessageWrapper {
  displayMessage?: string;
}

export const PASSWORD_FIELD_NAME = 'password';

export interface IPasswordWrapper {
  password?: string;
}

export interface IEmailWrapper {
  email?: string;
}

export const IMAGE_FIELD_NAME = 'image';

export interface IImageWrapper<TImage> {
  image?: TImage;
}

export interface ILabelable {
  label?: string;
}

export interface IReadonlyable {
  readOnly?: boolean;
}

export const LOGIN_FIELD_NAME = 'login';

export interface ILoginWrapper {
  login?: string;
}

export interface IStylizable {
  className?: string;
  noClassName?: boolean;
}

export interface IPayloadable<TPayload> {
  payload?: TPayload;
}

export const PROGRESS_FIELD_NAME = 'progress';

export interface IProgressWrapper {
  progress?: boolean;
}

export interface ITouchedWrapper {
  touched?: boolean;
}

export interface IDataSource<Type> {
  data?: Type;
}

export interface ILinkable {
  to?: string;
}

export interface ISaveable {
  saveable?: boolean;
}

export interface ISelectable<Type> {
  selected?: Type;
}

export interface IRawDatable<Type> {
  rawData?: Type;
}

export interface IErrorable<Type> {
  error?: Type;
  customError?: boolean;
}

export interface IInfoable<Type> {
  info?: Type;
}

export interface IOperationable {
  operation?: IOperation;
}

export interface IDirtyable {
  dirty?: boolean;
}

export interface ITypeWrapper<TType> {
  type?: TType;
}

export interface IStringTypeWrapper extends ITypeWrapper<string> {
}

export interface IStepable {
  step?: number;
}

export interface IMaskable {
  mask?: Array<string|RegExp>;
  maskGuide?: boolean;
  maskPlaceholderChar?: string;
}

export interface ITitleable {
  title?: string;
}

export interface IDisableable {
  disabled?: boolean;
}

export interface IActiveable {
  active?: boolean;
}

export interface ILockable {
  locked?: boolean;
}

export interface IPathWrapper {
  path?: string;
}

export interface IChangesWrapper<TChanges extends IKeyValue> {
  changes: TChanges;
}

export interface IMergerWrapper<TMerger extends IKeyValue> {
  merger: TMerger;
}

export interface IEntityWrapper<TEntity extends IEntity> extends ITouchedWrapper {
  entity?: TEntity;
  originalEntity?: TEntity;
  isNewEntity?: boolean;
  entityId?: EntityIdT;
}

export interface IFormable<TForm> {
  form: TForm;
}

export interface IDateTimeRangeable {
  fromDate?: string;
  toDate?: string;
}

export interface IRippleable {
  rippled?: boolean;
}

export interface IOnClickWrapper {
  onClick?(event: BasicEventT): void;
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

export const INITIAL_DIRTY_STATE: IDirtyable = {
  dirty: true,
};
