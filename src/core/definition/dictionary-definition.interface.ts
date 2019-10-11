import {
  FIRST_PAGE,
  IDataWrapper,
  IDictionariesWrapper,
  ILoadingWrapper,
} from '../definitions.interface';
import { IPagedEntity } from './page-definition.interface';

/**
 * @stable [10.09.2019]
 */
export const DEFAULT_DICTIONARY_PAGE_SIZE = 300;

/**
 * @stable [10.09.2019]
 */
export const DEFAULT_DICTIONARY_PAGED_ENTITY = Object.freeze<IPagedEntity>({
  page: FIRST_PAGE,
  pageSize: DEFAULT_DICTIONARY_PAGE_SIZE,
});

/**
 * @stable [10.10.2019]
 */
export interface IDictionaryEntity<TData>
  extends IDataWrapper<TData[] | TData>,
    ILoadingWrapper {
}

/**
 * @stable [10.10.2019]
 */
export interface IDictionariesEntity {
  [dictionary: string]: IDictionaryEntity<{}>;
}

/**
 * @stable [10.10.2019]
 */
export interface IDictionariesWrapperEntity
  extends IDictionariesWrapper<IDictionariesEntity> {
}
