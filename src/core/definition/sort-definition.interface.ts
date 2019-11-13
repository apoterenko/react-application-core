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
 * @stable [17.10.2019]
 */
export interface ISortDirectionsEntity {
  [name: string]: ISortDirectionEntity;
}

/**
 * @stable [17.10.2019]
 */
export interface ISortDirectionsWrapperEntity
  extends IDirectionsWrapper<ISortDirectionsEntity> {
}
