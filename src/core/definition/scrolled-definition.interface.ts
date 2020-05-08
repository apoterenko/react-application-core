import { IComponentProps } from './props-definition.interface';
import { IOnScrollWrapper } from '../definitions.interface';
import { IReduxXYEntity } from './xy-definition.interface';

/**
 * @behavioral-entity
 * @stable [24.03.2020]
 */
export interface IBehavioralScrolledEntity
  extends IOnScrollWrapper<IReduxXYEntity> {
}

/**
 * @props
 * @stable [24.10.2019]
 */
export interface IScrolledProps
  extends IComponentProps,
    IBehavioralScrolledEntity {
}
