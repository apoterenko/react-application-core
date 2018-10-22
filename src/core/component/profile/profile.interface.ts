import { IAppVersionWrapper, IAvatarRenderedWrapper, IOnClickWrapper } from '../../definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';

/**
 * @stable [17.09.2018]
 */
export interface IProfileProps extends IComponentProps,
                                       IOnClickWrapper,
                                       IAvatarRenderedWrapper,
                                       IAppVersionWrapper {
}
