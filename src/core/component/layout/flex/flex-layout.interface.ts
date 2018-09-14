import { IComponentProps } from '../../../props-definitions.interface';
import { IRowWrapper, IFullWrapper } from '../../../definitions.interface';

/**
 * @stable [17.06.2018]
 */
export interface IFlexLayoutProps extends IComponentProps,
                                          IFullWrapper<boolean>,
                                          IRowWrapper<boolean> {
}
