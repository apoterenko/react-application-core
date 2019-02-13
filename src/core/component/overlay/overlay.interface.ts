import { IComponentProps } from '../../props-definitions.interface';
import { IReactOnClickWrapper } from '../../react-definitions.interface';
import { IOverlayBackgroundClassNameWrapper, IOnCloseWrapper } from '../../definitions.interface';

/**
 * @stable [29.11.2018]
 */
export interface IOverlayProps extends IComponentProps,
                                       IReactOnClickWrapper,
                                       IOnCloseWrapper,
                                       IOverlayBackgroundClassNameWrapper {
}
