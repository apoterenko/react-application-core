import { IComponentProps } from '../../definition';
import { IReactOnClickWrapper } from '../../react-definitions.interface';
import { IOverlayBackgroundClassNameWrapper, IOnCloseWrapper, IProgressWrapper } from '../../definitions.interface';

/**
 * @stable [29.11.2018]
 */
export interface IOverlayProps extends IComponentProps,
                                       IReactOnClickWrapper,
                                       IOnCloseWrapper,
                                       IProgressWrapper,
                                       IOverlayBackgroundClassNameWrapper {
}
