import {
  IPayloadWrapper,
  IXWrapper,
  IYWrapper,
} from '../definitions.interface';

/**
 * @entity
 * @stable [22.09.2019]
 */
export interface IXYEntity
  extends IXWrapper,
    IYWrapper {
}

/**
 * @payload-entity
 * @stable [22.01.2020]
 */
export interface IXYPayloadEntity
  extends IPayloadWrapper<IXYEntity> {
}
