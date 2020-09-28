import {
  DEFAULT_CHANGEABLE_FIELD_ENTITY,
  DEFAULT_NO_AUTO_COMPLETE_FIELD_ENTITY,
  DEFAULT_NOT_CHANGEABLE_FIELD_ENTITY,
  DEFAULT_PASSWORD_FIELD_ENTITY,
} from './field-definition.interface';
import {
  DEFAULT_PLACE_FIELD_ENTITY,
  DEFAULT_ZIP_CODE_FIELD_ENTITY,
} from './place-field-definition.interface';
import {
  DEFAULT_NOT_HOVERED_LIST_ITEM_ENTITY,
  DEFAULT_SELECTABLE_LIST_ITEM_ENTITY,
  INITIAL_REDUX_LIST_ENTITY,
} from './list-definition.interface';
import { DEFAULT_DOM_RIGHT_POSITION_CONFIG_ENTITY } from './dom-definition.interface';
import { INITIAL_REDUX_STACK_ENTITY } from './stack-definition.interface';
import {
  DEFAULT_COMPONENTS_SETTINGS_ENTITY,
  DEFAULT_CURRENCY_SETTINGS_ENTITY,
  DEFAULT_NUMBER_CONVERTER_SETTINGS_ENTITY,
} from './settings-definition.interface';
import {
  DEFAULT_COMPACT_FORM_ENTITY,
} from './form-definition.interface';
import {
  DEFAULT_LOCAL_PAGE_SIZE,
  DEFAULT_MAX_PAGED_ENTITY,
  DEFAULT_PAGINATED_SINGLE_ENTITY,
  FIRST_PAGE,
} from './page-definition.interface';
import { DEFAULT_DICTIONARY_PAGED_ENTITY } from './dictionary-definition.interface';
import { DEFAULT_QUICK_SEARCH_FIELD_ENTITY } from './select-definition.interface';
import {
  DEFAULT_FILTERED_MENU_ENTITY,
  DEFAULT_UNLIMITED_HEIGHT_MENU_ENTITY,
} from './menu-definition.interface';
import { DEFAULT_ENVIRONMENT_ENTITY } from './env-definition.interface';

/**
 * @stable [17.05.2020]
 */
export class DefaultEntities {
  public static readonly CHANGEABLE_FIELD_ENTITY = DEFAULT_CHANGEABLE_FIELD_ENTITY;                     /* @stable [27.09.2020] */
  public static readonly COMPACT_FORM_ENTITY = DEFAULT_COMPACT_FORM_ENTITY;                             /* @stable [09.06.2020] */
  public static readonly COMPONENTS_SETTINGS_ENTITY = DEFAULT_COMPONENTS_SETTINGS_ENTITY;               /* @stable [21.05.2020] */
  public static readonly CURRENCY_PRECISION_VALUE = 2;                                                  /* @stable [24.07.2020] */
  public static readonly CURRENCY_SETTINGS_ENTITY = DEFAULT_CURRENCY_SETTINGS_ENTITY;                   /* @stable [09.09.2020] */
  public static readonly DICTIONARY_PAGED_ENTITY = DEFAULT_DICTIONARY_PAGED_ENTITY;                     /* @stable [26.07.2020] */
  public static readonly DOM_RIGHT_POSITION_CONFIG_ENTITY = DEFAULT_DOM_RIGHT_POSITION_CONFIG_ENTITY;   /* @stable [21.05.2020] */
  public static readonly ENVIRONMENT_ENTITY = DEFAULT_ENVIRONMENT_ENTITY;                               /* @stable [10.09.2020] */
  public static readonly FILTERED_MENU_ENTITY = DEFAULT_FILTERED_MENU_ENTITY;                           /* @stable [08.08.2020] */
  public static readonly FIRST_PAGE = FIRST_PAGE;                                                       /* @stable [16.07.2020] */
  public static readonly INITIAL_REDUX_LIST_ENTITY = INITIAL_REDUX_LIST_ENTITY;                         /* @stable [29.07.2020] */
  public static readonly INITIAL_REDUX_STACK_ENTITY = INITIAL_REDUX_STACK_ENTITY;                       /* @stable [21.05.2020] */
  public static readonly LOCAL_PAGE_SIZE = DEFAULT_LOCAL_PAGE_SIZE;                                     /* @stable [16.07.2020] */
  public static readonly MAX_PAGED_ENTITY = DEFAULT_MAX_PAGED_ENTITY;                                   /* @stable [11.09.2020] */
  public static readonly NEW = 'new';                                                                   /* @stable [10.09.2020] */
  public static readonly NO_AUTO_COMPLETE_FIELD_ENTITY = DEFAULT_NO_AUTO_COMPLETE_FIELD_ENTITY;         /* @stable [11.08.2020] */
  public static readonly NOT_CHANGEABLE_FIELD_ENTITY = DEFAULT_NOT_CHANGEABLE_FIELD_ENTITY;             /* @stable [01.06.2020] */
  public static readonly NOT_HOVERED_LIST_ITEM_ENTITY = DEFAULT_NOT_HOVERED_LIST_ITEM_ENTITY;           /* @stable [19.05.2020] */
  public static readonly NUMBER_CONVERTER_SETTINGS_ENTITY = DEFAULT_NUMBER_CONVERTER_SETTINGS_ENTITY;   /* @stable [09.09.2020] */
  public static readonly PAGINATED_SINGLE_ENTITY = DEFAULT_PAGINATED_SINGLE_ENTITY;                     /* @stable [17.06.2020] */
  public static readonly PASSWORD_FIELD_ENTITY = DEFAULT_PASSWORD_FIELD_ENTITY;                         /* @stable [19.08.2020] */
  public static readonly PATH_SEPARATOR = '#';                                                          /* @stable [10.09.2020] */
  public static readonly PLACE_FIELD_ENTITY = DEFAULT_PLACE_FIELD_ENTITY;                               /* @stable [11.08.2020] */
  public static readonly QUICK_SEARCH_FIELD_ENTITY = DEFAULT_QUICK_SEARCH_FIELD_ENTITY;                 /* @stable [17.05.2020] */
  public static readonly ROOT_SECTION = 'root';                                                         /* @stable [22.05.2020] */
  public static readonly SELECTABLE_LIST_ITEM_ENTITY = DEFAULT_SELECTABLE_LIST_ITEM_ENTITY;             /* @stable [19.05.2020] */
  public static readonly UNIT_OF_CURRENCY = 1;                                                          /* @stable [20.08.2020] */
  public static readonly UNLIMITED_HEIGHT_MENU_ENTITY = DEFAULT_UNLIMITED_HEIGHT_MENU_ENTITY;           /* @stable [10.08.2020] */
  public static readonly ZIP_CODE_FIELD_ENTITY = DEFAULT_ZIP_CODE_FIELD_ENTITY;                         /* @stable [17.05.2020] */
}
