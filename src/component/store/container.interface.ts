export interface IConnectorCtor<TContainer> {
  new(...args): TContainer;
}

export type ConnectorMapperT<TAppState, TResult> = (state: TAppState) => TResult;
