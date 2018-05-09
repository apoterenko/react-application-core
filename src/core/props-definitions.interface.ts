import {
  IContainerEntity,
  IFieldEntity,
  IListEntity,
  IRnListEntity,
  IUniversalContainerEntity,
  IGridEntity,
  IUniversalListEntity,
  IUniversalComponentEntity,
} from './entities-definitions.interface';
import {
  IContainerConfiguration,
  IFieldConfiguration,
  IListConfiguration,
  IRnListConfiguration,
  IUniversalContainerConfiguration,
  IGridConfiguration,
  IUniversalListConfiguration,
  IUniversalComponentConfiguration,
} from './configurations-definitions.interface';

/**
 * @stable [27.04.2018]
 */
export interface IContainerProps extends IContainerEntity,
                                         IContainerConfiguration {
}

/**
 * @stable [09.05.2018]
 */
export interface IUniversalComponentProps extends IUniversalComponentEntity,
                                                  IUniversalComponentConfiguration {
}

/**
 * @stable [05.05.2018]
 */
export interface IUniversalContainerProps extends IUniversalContainerEntity,
                                                  IUniversalContainerConfiguration {
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
