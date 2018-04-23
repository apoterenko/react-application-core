import { MenuActionsWrapperT, IMenuActionsWrapper } from '../menu';
import { IAnyMenuActionEntity } from '../../definitions.interface';
import { IComponentEntity } from '../../entities-definitions.interface';

export interface IHeaderProps extends MenuActionsWrapperT {
  navigationActionType?: string;
  navigationActionHandler?(): void;
}

export interface IHeaderInternalProps extends IComponentEntity,
                                              IHeaderProps {
  menuActionHandler?(option: IAnyMenuActionEntity): void;
}
