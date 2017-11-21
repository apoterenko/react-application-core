import { AnyT, IEntity, IKeyValue } from '../definition.interface';

export interface IDictionariesDataState<TEntity extends IKeyValue> {
  loading: boolean;
  data: TEntity[];
}

export interface IApplicationDictionariesState {
  [index: string]: IDictionariesDataState<IEntity>;
}

export interface IApplicationDictionariesWrapperState {
  dictionaries: IApplicationDictionariesState;
}

export const INITIAL_DICTIONARIES_STATE: IApplicationDictionariesState = {};

export const DICTIONARY_LOAD_ACTION_TYPE = 'dictionary.load';
export const DICTIONARIES_DESTROY_ACTION_TYPE = 'dictionaries.destroy';
