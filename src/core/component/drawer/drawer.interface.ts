import { INativeMaterialComponent } from '../material';
import { IOpenedWrapper, IOpenWrapper } from '../../definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';

/**
 * @stable [10.08.2018]
 */
export interface INativeMaterialDrawerComponent extends INativeMaterialComponent,
                                                        IOpenWrapper {
}

/**
 * @stable [10.08.2018]
 */
export interface IDrawerProps extends IComponentProps,
                                      IOpenedWrapper {
}
