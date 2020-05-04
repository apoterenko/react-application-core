import { IOnClickWrapper } from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';

/**
 * @behavioral-entity
 * @stable [04.05.2020]
 */
export interface IBehavioralCardEntity
  extends IOnClickWrapper {
}

/**
 * @props
 * @stable [04.05.2020]
 */
export interface ICardProps
  extends IGenericComponentProps,
    IBehavioralCardEntity {
}
