import { DEFAULT_QUICK_SEARCH_FIELD_ENTITY } from './field-definition.interface';
import {
  DEFAULT_PLACE_FIELD_ENTITY,
  DEFAULT_ZIP_CODE_FIELD_ENTITY,
} from './place-definition.interface';
import { DEFAULT_NOT_SELECTABLE_LIST_ENTITY } from './list-definition.interface';
import { DEFAULT_DOM_RIGHT_POSITION_CONFIG_ENTITY } from './dom-definition.interface';
import { INITIAL_REDUX_STACK_ENTITY } from './stack-definition.interface';
import { DEFAULT_COMPONENTS_SETTINGS_ENTITY } from './settings-definition.interface';

/**
 * @stable [17.05.2020]
 */
export class DefaultEntities {
  public static readonly COMPONENTS_SETTINGS_ENTITY = DEFAULT_COMPONENTS_SETTINGS_ENTITY;               /* @stable [21.05.2020] */
  public static readonly DOM_RIGHT_POSITION_CONFIG_ENTITY = DEFAULT_DOM_RIGHT_POSITION_CONFIG_ENTITY;   /* @stable [21.05.2020] */
  public static readonly INITIAL_REDUX_STACK_ENTITY = INITIAL_REDUX_STACK_ENTITY;                       /* @stable [21.05.2020] */
  public static readonly NOT_SELECTABLE_LIST_ENTITY = DEFAULT_NOT_SELECTABLE_LIST_ENTITY;               /* @stable [19.05.2020] */
  public static readonly PLACE_FIELD_ENTITY = DEFAULT_PLACE_FIELD_ENTITY;                               /* @stable [19.05.2020] */
  public static readonly QUICK_SEARCH_FIELD_ENTITY = DEFAULT_QUICK_SEARCH_FIELD_ENTITY;                 /* @stable [17.05.2020] */
  public static readonly ROOT_SECTION = 'root';                                                         /* @stable [22.05.2020] */
  public static readonly ZIP_CODE_FIELD_ENTITY = DEFAULT_ZIP_CODE_FIELD_ENTITY;                         /* @stable [17.05.2020] */
}
