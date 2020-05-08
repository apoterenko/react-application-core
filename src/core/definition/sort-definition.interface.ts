import {
  IDirectionsWrapper,
  IDirectionWrapper,
  IIndexWrapper,
  IMultiWrapper,
  INameWrapper,
  IPayloadWrapper,
} from '../definitions.interface';

/**
 * @stable [17.10.2019]
 */
export enum SortDirectionsEnum {
  ASC,
  DESC,
}

/**
 * @stable [17.10.2019]
 */
export interface ISortDirectionEntity
  extends INameWrapper,
    IIndexWrapper,
    IMultiWrapper,
    IDirectionWrapper<SortDirectionsEnum> {
}

/**
 * @stable [17.10.2019]
 */
export interface ISortDirectionPayloadEntity
  extends IPayloadWrapper<ISortDirectionEntity> {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxSortDirectionsEntity {
  [name: string]: ISortDirectionEntity;
}

/**
 * @entity
 * @stable [08.05.2020]
 */
export interface ISortDirectionsEntity
  extends IDirectionsWrapper<IReduxSortDirectionsEntity> {
}
