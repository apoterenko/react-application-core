import { IBaseComponentInternalProps } from '../base';
import { MenuActionsWrapperT, IMenuActionsWrapper } from '../menu';
import { IAnyMenuActionEntity } from '../../definitions.interface';

export interface IHeaderProps extends MenuActionsWrapperT {
  navigationActionType?: string;
  navigationActionHandler?(): void;
}

export interface IHeaderInternalProps extends IBaseComponentInternalProps,
                                              IHeaderProps {
  menuActionHandler?(option: IAnyMenuActionEntity): void;
}
