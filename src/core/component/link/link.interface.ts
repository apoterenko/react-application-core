import { IStringToWrapper } from '../../definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';
import { IReactOnClickWrapper } from '../../react-definitions.interface';

/**
 * @stable [11.08.2018]
 */
export interface ILinkProps extends IComponentProps,
                                    IStringToWrapper,
                                    IReactOnClickWrapper {
}
