import {
  IUniversalFieldEntity,
  IFieldEntity,
  IGridEntity,
} from './entities-definitions.interface';
import {
  IFieldConfiguration,
  IListConfiguration,
  IRnListConfiguration,
  IGridConfiguration,
  IUniversalListConfiguration,
  IUniversalFieldConfiguration,
  ITabPanelConfiguration,
} from './configurations-definitions.interface';
import { AnyT } from './definitions.interface';
import { ITabPanelEntity, IListEntity } from './definition';

/**
 * @stable [18.06.2018]
 */
export interface IUniversalFieldProps<TKeyboardEvent = AnyT,
                                      TFocusEvent = AnyT,
                                      TBasicEvent = AnyT>
  extends IUniversalFieldEntity,
          IUniversalFieldConfiguration<TKeyboardEvent, TFocusEvent, TBasicEvent> {
}

/**
 * @stable [04.05.2018]
 */
export interface IFieldProps extends IFieldEntity,
                                     IFieldConfiguration {
}

/**
 * @stable [09.05.2018]
 */
export interface IUniversalListProps extends IListEntity,
                                             IUniversalListConfiguration {
}

/**
 * @stable [05.05.2018]
 */
export interface IListProps extends IListEntity,
                                    IListConfiguration {
}

/**
 * @stable [05.05.2018]
 */
export interface IRnListProps extends IListEntity,
                                      IRnListConfiguration {
}

/**
 * @stable [05.05.2018]
 */
export interface IGridProps extends IGridEntity,
                                    IGridConfiguration {
}

/**
 * @stable [30.08.2018]
 */
export interface ITabPanelProps extends ITabPanelConfiguration,
                                        ITabPanelEntity {
}
