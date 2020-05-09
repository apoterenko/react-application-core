import {
  FIRST_PAGE,
  IDataWrapper,
  IDictionariesWrapper,
  IKeyValue,
  ILoadingWrapper,
  IPlacesWrapper,
} from '../definitions.interface';
import { IReduxPagedEntity } from './page-definition.interface';

/**
 * @stable [08.05.2020]
 */
export const DEFAULT_DICTIONARY_PAGE_SIZE = 300;

/**
 * @initial-redux-entity
 * @stable [08.05.2020]
 */
export const INITIAL_REDUX_DICTIONARIES_ENTITY = Object.freeze<IReduxDictionariesEntity>({});

/**
 * @stable [08.05.2020]
 */
export const DICTIONARY_DESTROY_ACTION_TYPE = `dictionary.destroy`;
export const DICTIONARY_LOAD_ACTION_TYPE = `dictionary.load`;
export const DICTIONARY_SET_ACTION_TYPE = `dictionary.set`;

/**
 * @stable [08.05.2020]
 */
export enum DictionariesEnum {
  PLACES = 'places',
}

/**
 * @default-entity
 * @stable [08.05.2020]
 */
export const DEFAULT_DICTIONARY_PAGED_ENTITY = Object.freeze<IReduxPagedEntity>({
  page: FIRST_PAGE,
  pageSize: DEFAULT_DICTIONARY_PAGE_SIZE,
});

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxDictionaryEntity<TData = IKeyValue>
  extends IDataWrapper<TData[] | TData>,
    ILoadingWrapper {
}

/**
 * @entity
 * @stable [08.05.2020]
 */
export interface IBaseDictionariesEntity
  extends IPlacesWrapper<IReduxDictionaryEntity<{}>> {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxDictionariesEntity
  extends IBaseDictionariesEntity {
  [dictionary: string]: IReduxDictionaryEntity<{}>;
}

/**
 * @entity
 * @stable [08.05.2020]
 */
export interface IDictionariesEntity<TDictionariesEntity = IReduxDictionariesEntity>
  extends IDictionariesWrapper<TDictionariesEntity> {
}
