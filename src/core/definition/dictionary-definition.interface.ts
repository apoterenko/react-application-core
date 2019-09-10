import {
  FIRST_PAGE,
} from '../definitions.interface';
import { IPagedEntity } from './page-definition.interface';

/**
 * @stable [10.09.2019]
 */
export const DEFAULT_DICTIONARY_PAGE_SIZE = 300;

/**
 * @stable [10.09.2019]
 */
export const INITIAL_DICTIONARY_PAGED_ENTITY = Object.freeze<IPagedEntity>({
  page: FIRST_PAGE,
  pageSize: DEFAULT_DICTIONARY_PAGE_SIZE,
});
