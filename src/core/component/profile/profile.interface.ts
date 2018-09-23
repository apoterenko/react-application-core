import { IPathWrapper, IAppVersionWrapper, IOnActionClickWrapper, IAvatarRenderedWrapper } from '../../definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';

/**
 * @stable [17.09.2018]
 */
export interface IProfileProps extends IComponentProps,
                                       IPathWrapper,
                                       IAvatarRenderedWrapper,
                                       IAppVersionWrapper,
                                       IOnActionClickWrapper {
}
