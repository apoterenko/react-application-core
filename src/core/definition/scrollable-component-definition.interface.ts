import { IComponent } from './component-definition.interface';
import { IComponentProps } from './props-definition.interface';
import { IOnScrollWrapper } from '../definitions.interface';
import { IXYEntity } from './xy-definition.interface';

/**
 * @stable [23.10.2019]
 */
export interface IScrollableEntity
  extends IOnScrollWrapper {
}

/**
 * @stable [22.09.2019]
 */
export interface IScrollableComponent<TProps extends IComponentProps = IComponentProps, TState = {}>
  extends IComponent<TProps, TState>,
    IScrollableEntity {
}

/**
 * @stable [24.10.2019]
 */
export interface IScrollableComponentProps
  extends IComponentProps,
    IOnScrollWrapper<IXYEntity> {
}
