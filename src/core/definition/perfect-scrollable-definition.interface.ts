import { IComponent } from './component-definition.interface';
import { IComponentProps } from './props-definition.interface';
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
 * @stable [04.12.2019]
 */
export interface IPerfectScrollWrapperEntity
  extends IPerfectScrollWrapper<IPerfectScrollableEntity> {
}

/**
 * @stable [04.12.2019]
 */
export interface IPerfectScrollableComponent<TProps extends IPerfectScrollableComponentProps =
  IPerfectScrollableComponentProps, TState = {}>
  extends IComponent<TProps, TState> {
}

/**
 * @stable [04.12.2019]
 */
export interface IPerfectScrollableComponentProps
  extends IComponentProps,
    IPerfectScrollWrapperEntity {
}
