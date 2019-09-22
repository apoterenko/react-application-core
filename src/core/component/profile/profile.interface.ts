import { IAppVersionWrapper, IAvatarRenderedWrapper} from '../../definitions.interface';
import { IComponentProps } from '../../definition';
import { IReactOnClickWrapper } from '../../react-definitions.interface';

/**
 * @stable [17.09.2018]
 */
export interface IProfileProps extends IComponentProps,
                                       IReactOnClickWrapper,
                                       IAvatarRenderedWrapper,
                                       IAppVersionWrapper {
}
