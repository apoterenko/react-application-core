import { IBaseComponentInternalProps } from '../base';
import { IEmailWrapper, INameWrapper, IPathWrapper, IOnClickWrapper } from '../../definition.interface';
import { IMenuActionsWrapper, MenuActionsWrapperT, MenuActionT, IMenuAction } from '../menu';

export interface IProfileInternalProps extends IBaseComponentInternalProps,
                                               IEmailWrapper,
                                               INameWrapper,
                                               IPathWrapper,
                                               IOnClickWrapper<MenuActionT>,
                                               MenuActionsWrapperT {
}
