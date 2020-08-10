import {
  IDataWrapper,
  IDictionariesWrapper,
  IKeyValue,
  IPlacesWrapper,
  IProgressWrapper,
} from '../definitions.interface';
import {
  DEFAULT_PAGED_ENTITY,
  IReduxPagedEntity,
} from './page-definition.interface';
import {
  IGenericContainer,
  IGenericContainerProps,
} from './generic-container-definition.interface';

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
  ...DEFAULT_PAGED_ENTITY,
  pageSize: 300,
});

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxDictionaryEntity<TData = IKeyValue>
  extends IDataWrapper<TData[] | TData>,
    IProgressWrapper {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxBaseDictionariesEntity
  extends IPlacesWrapper<IReduxDictionaryEntity<{}>> {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxDictionariesEntity
  extends IReduxBaseDictionariesEntity {
  [dictionary: string]: IReduxDictionaryEntity<{}>;
}

/**
 * @redux-holder-entity
 * @stable [08.06.2020]
 */
export interface IReduxDictionariesHolderEntity<TEntity = IReduxDictionariesEntity>
  extends IDictionariesWrapper<TEntity> {
}

/**
 * @container
 * @stable [07.08.2020]
 */
export interface IDictionariesContainer<TDictionary extends IReduxBaseDictionariesEntity = IReduxBaseDictionariesEntity>
  extends IGenericContainer<IGenericContainerProps<TDictionary>> {
}
