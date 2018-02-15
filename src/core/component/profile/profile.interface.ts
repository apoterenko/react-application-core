import { IBaseComponentInternalProps } from '../base';
import { IEmailWrapper, INameWrapper, IPathWrapper, IOnClickWrapper } from '../../definition.interface';

export interface IProfileInternalProps extends IBaseComponentInternalProps,
                                               IEmailWrapper,
                                               INameWrapper,
                                               IPathWrapper,
                                               IOnClickWrapper {
}
