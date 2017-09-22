import * as React from 'react';

export type AnyT = any;
export type EntityIdT = number | string;
export const PHANTOM_ENTITY_ID = -1;

export interface IKeyValue {
  [index: string]: AnyT;
}

export interface IIdentifiedEntity {
  id?: EntityIdT;
}

export interface IAttributedEntity extends IIdentifiedEntity {
  data: IKeyValue;
}

export interface IEntity extends IIdentifiedEntity, IKeyValue {
}

export interface IRenderable {
  renderer?(item: IEntity): JSX.Element;
}

export interface ILockable {
  locked?: boolean;
}

export interface IChangeable {
  changes: IKeyValue;
}

export type ReactElementT = React.SFCElement<{ children: React.ReactChild[] }>;
export type BasicEventT = React.SyntheticEvent<{}>;
export type FocusEventT = React.FocusEvent<{}>;
export type KeyboardEventT = React.KeyboardEvent<{}>;
export type ChangeEventT = React.ChangeEvent<{ value: AnyT, name?: string }>;
