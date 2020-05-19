import { DEFAULT_QUICK_SEARCH_FIELD_ENTITY } from './field-definition.interface';
import {
  DEFAULT_PLACE_FIELD_ENTITY,
  DEFAULT_ZIP_CODE_FIELD_ENTITY,
} from './place-definition.interface';
import { DEFAULT_NOT_SELECTABLE_LIST_ENTITY } from './list-definition.interface';

/**
 * @stable [17.05.2020]
 */
export class DefaultEntities {
  public static readonly NOT_SELECTABLE_LIST_ENTITY = DEFAULT_NOT_SELECTABLE_LIST_ENTITY;               /* @stable [19.05.2020] */
  public static readonly PLACE_FIELD_ENTITY = DEFAULT_PLACE_FIELD_ENTITY;                               /* @stable [19.05.2020] */
  public static readonly QUICK_SEARCH_FIELD_ENTITY = DEFAULT_QUICK_SEARCH_FIELD_ENTITY;                 /* @stable [17.05.2020] */
  public static readonly ZIP_CODE_FIELD_ENTITY = DEFAULT_ZIP_CODE_FIELD_ENTITY;                         /* @stable [17.05.2020] */
}