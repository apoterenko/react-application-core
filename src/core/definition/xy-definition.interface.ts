import {
  IXWrapper,
  IYWrapper,
} from '../definitions.interface';
import { IFluxPayloadEntity } from './entity-definition.interface';

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
  extends IFluxPayloadEntity<IReduxXYEntity> {
}
