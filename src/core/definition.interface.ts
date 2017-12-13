import * as React from 'react';

import { IOperation } from './operation';
import { ApplicationStateT } from './store';

export type AnyT = any;
export type EntityIdT = number | string;
export const EMPTY_ID = -1;
export const FIRST_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 20;
export const DEFAULT_TIME_FROM = '00:00:00';
export const DEFAULT_TIME_TO = '23:59:59';
export const NEW_OPTION = 'new';

export interface IKeyValue {
  [index: string]: AnyT;
}

export interface IIdentifiedEntity {
  id?: EntityIdT;
}

export interface INamedEntity extends IIdentifiedEntity,
                                      INameable {
}

export interface IEntity extends IIdentifiedEntity, IKeyValue {
}

export interface INameable {
  name?: string;
}

export interface IRenderable {
  renderer?(item: IEntity): JSX.Element;
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

export interface IValueable<TValue> {
  value?: TValue;
}

export interface IOriginalValueable<TValue> {
  originalValue?: TValue;
}

export interface IDisplayValueable<TValue> {
  displayValue?: string|IDisplayableConverter<TValue>;
}

export type IDisplayableConverter<TValue> = (value: TValue, valueable?: IValueable<TValue>) => string;

export interface IDisplayable {
  displayName?: string;
}

export interface IPasswordable {
  password?: string;
}

export interface ILabelable {
  label?: string;
}

export interface IReadonlyable {
  readOnly?: boolean;
}

export interface ILoginable {
  login?: string;
}

export interface IStylizable {
  className?: string;
  noClassName?: boolean;
}

export interface IPayloadable<TPayload> {
  payload?: TPayload;
}

export const PROGRESSABLE_FIELD_NAME = 'progress';

export interface IProgressable {
  progress?: boolean;
}

export interface ITouchable {
  touched?: boolean;
}

export interface IDataSource<Type> {
  data?: Type;
}

export interface ISaveable {
  saveable?: boolean;
}

export interface ISelectable<Type> {
  selected?: Type;
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

export interface ITypeable<Type> {
  type?: Type;
}

export interface IStepable {
  step?: number;
}

export interface IMaskable {
  mask?: Array<string|RegExp>;
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

export interface IPathable {
  path?: string;
}

export interface IChangeable<TChanges extends IKeyValue> {
  changes: TChanges;
}

export interface IEntityable<TEntity extends IEntity> extends ITouchable {
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

export interface IClickable {
  onClick?(event: BasicEventT): void;
}

export interface IInitialChangesable {
  initialChanges?(state: ApplicationStateT): IKeyValue;
}

export type ReactElementT = React.SFCElement<{ children: React.ReactChild[] }>;
export type BasicEventT = React.SyntheticEvent<{}>;
export type FocusEventT = React.FocusEvent<{}>;
export type KeyboardEventT = React.KeyboardEvent<{}>;
export type ChangeEventT = React.ChangeEvent<{ value: AnyT, name?: string }>;

export const INITIAL_DIRTY_STATE: IDirtyable = {
  dirty: true,
};
