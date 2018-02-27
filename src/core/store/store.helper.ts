import { Reducer, ReducersMapObject, combineReducers } from 'redux';

// Improve typings
export const composeReducers = <TReducersMap extends {}>(reducersMap: TReducersMap): Reducer<ReducersMapObject> =>
  combineReducers<ReducersMapObject>(reducersMap as ReducersMapObject);
