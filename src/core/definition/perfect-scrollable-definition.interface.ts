import {
  IGenericComponent,
  IGenericComponentProps,
} from './generic-component-definition.interface';
import { IPerfectScrollWrapper } from '../definitions.interface';

/**
 * @stable [04.12.2019]
 */
export interface IPerfectScrollableEntity {
  minScrollbarLength?: number;
  wheelPropagation?: boolean;
  wheelSpeed?: number;
}

/**
 * @generic-entity
 * @stable [21.04.2020]
 */
export interface IGenericPerfectScrollEntity
  extends IPerfectScrollWrapper<IPerfectScrollableEntity> {
}

/**
 * @stable [04.12.2019]
 */
export interface IPerfectScrollableComponent<TProps extends IPerfectScrollableComponentProps =
  IPerfectScrollableComponentProps, TState = {}>
  extends IGenericComponent<TProps, TState> {
}

/**
 * @props
 * @stable [21.04.2020]
 */
export interface IPerfectScrollableComponentProps
  extends IGenericComponentProps,
    IGenericPerfectScrollEntity {
}
