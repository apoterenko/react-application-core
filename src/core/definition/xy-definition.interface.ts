import {
  IPayloadWrapper,
  IXWrapper,
  IYWrapper,
} from '../definitions.interface';

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxXYEntity
  extends IXWrapper,
    IYWrapper {
}

/**
 * @flux-entity
 * @stable [08.05.2020]
 */
export interface IFluxXYEntity
  extends IPayloadWrapper<IReduxXYEntity> {
}
