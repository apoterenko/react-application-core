import {
  IDataWrapper,
  ILengthWrapper,
} from '../definitions.interface';

/**
 * @config-entity
 * @stable [24.05.2021]
 */
export interface IReadBlobConfigEntity
  extends IDataWrapper<Blob>,
    ILengthWrapper {
}
