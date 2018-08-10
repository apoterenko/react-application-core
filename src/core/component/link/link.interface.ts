import { IOnClickWrapper, IStringToWrapper } from '../../definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';

/**
 * @stable [11.08.2018]
 */
export interface ILinkProps extends IComponentProps,
                                    IStringToWrapper,
                                    IOnClickWrapper {
}
