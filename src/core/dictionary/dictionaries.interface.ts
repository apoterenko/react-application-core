import { IEntity, IKeyValue } from 'core/definition.interface';

export interface IDictionariesDataState<TEntity extends IKeyValue> {
  loading: boolean;
  data: TEntity[];
}

export interface IApplicationDictionariesState {
  [index: string]: IDictionariesDataState<IEntity>;
}

export const DICTIONARY_LOAD_ACTION_TYPE = 'dictionary.load';
