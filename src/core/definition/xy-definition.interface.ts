import {
  IPayloadWrapper,
  IXWrapper,
  IYWrapper,
} from '../definitions.interface';

/**
 * @stable [22.09.2019]
 */
export interface IXYEntity
  extends IXWrapper,
    IYWrapper {
}

/**
 * @stable [22.09.2019]
 */
export interface IPayloadXYEntity
  extends IPayloadWrapper<IXYEntity> {
}
