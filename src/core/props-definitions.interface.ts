import {
  IContainerEntity,
  IUniversalFieldEntity,
  IFieldEntity,
  IListEntity,
  IRnListEntity,
  IGridEntity,
  IUniversalListEntity,
  IComponentEntity,
  IGridColumnEntity,
} from './entities-definitions.interface';
import {
  IFieldConfiguration,
  IListConfiguration,
  IRnListConfiguration,
  IGridConfiguration,
  IUniversalListConfiguration,
  IReactComponentConfiguration,
  IComponentConfiguration,
  IUniversalFieldConfiguration,
  ITabPanelConfiguration,
  IGridColumnConfiguration,
} from './configurations-definitions.interface';
import { AnyT } from './definitions.interface';
import { ITabPanelEntity } from './definition';

/**
 * @stable [09.05.2018]
 */
export interface IUniversalComponentProps extends IReactComponentConfiguration {
}

/**
 * @stable [14.05.2018]
 */
export interface IComponentProps extends IComponentEntity,
                                         IComponentConfiguration {
}

/**
 * @stable [27.04.2018]
 */
export interface IContainerProps extends IContainerEntity {
}

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
export interface IUniversalListProps extends IUniversalListEntity,
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
export interface IRnListProps extends IRnListEntity,
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

/**
 * @stable [10.09.2018]
 */
export interface IGridColumnProps extends IGridColumnConfiguration,
                                          IGridColumnEntity {
}
