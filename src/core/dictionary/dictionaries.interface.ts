import { AnyT, IEntity, IKeyValue } from '../definition.interface';

export interface IDictionariesDataState<TEntity extends IKeyValue> {
  loading: boolean;
  data: TEntity[];
}

export interface IApplicationDictionariesState {
  [index: string]: IDictionariesDataState<IEntity>;
}

export const INITIAL_DICTIONARY_STATE: IDictionariesDataState<AnyT> = {
  data: null,
  loading: false,
};

export const DICTIONARY_LOAD_ACTION_TYPE = 'dictionary.load';
