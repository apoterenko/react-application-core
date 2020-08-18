import { IGenericComponentProps } from './generic-component-definition.interface';
import { IOnScrollWrapper } from '../definitions.interface';
import { IPresetsXYEntity } from './xy-definition.interface';

/**
 * @presets-entity
 * @stable [24.03.2020]
 */
export interface IPresetsScrolledEntity
  extends IPresetsXYEntity,
    IOnScrollWrapper<IPresetsXYEntity> {
}

/**
 * @generic-entity
 * @stable [18.08.2020]
 */
export interface IGenericScrolledEntity
  extends IPresetsScrolledEntity {
}

/**
 * @props
 * @stable [24.10.2019]
 */
export interface IScrolledProps
  extends IGenericComponentProps,
    IGenericScrolledEntity {
}
