export interface IKeyValue {
  [index: string]: any;
}

export interface IIdentifiedEntity {
  id: number | string;
}

export interface IEntity extends IIdentifiedEntity, IKeyValue {
}
