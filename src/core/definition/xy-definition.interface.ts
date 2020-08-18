import {
  IXWrapper,
  IYWrapper,
} from '../definitions.interface';
import { IFluxPayloadEntity } from './entity-definition.interface';

/**
 * @presets-entity
 * @stable [08.05.2020]
 */
export interface IPresetsXYEntity
  extends IXWrapper,
    IYWrapper {
}

/**
 * @flux-entity
 * @stable [08.05.2020]
 */
export interface IFluxXYEntity
  extends IFluxPayloadEntity<IPresetsXYEntity> {
}
