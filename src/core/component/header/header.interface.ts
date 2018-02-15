import { IBaseComponentInternalProps } from '../base';
import { IMenuAction, MenuActionT, MenuActionsWrapperT, IMenuActionsWrapper } from '../menu';

export interface IHeaderProps extends MenuActionsWrapperT {
  navigationActionType?: string;
  navigationActionHandler?(): void;
}

export interface IHeaderInternalProps extends IBaseComponentInternalProps,
                                              IHeaderProps {
  menuActionHandler?(option: MenuActionT): void;
}
