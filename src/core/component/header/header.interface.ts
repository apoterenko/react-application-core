import { IComponentEntity } from '../../entities-definitions.interface';
import { IMenuItemsWrapper } from '../../definitions.interface';

export interface IHeaderProps extends IMenuItemsWrapper<any> {  // TODO
  navigationActionType?: string;
  navigationActionHandler?(): void;
}

export interface IHeaderInternalProps extends IComponentEntity,
                                              IHeaderProps {
  menuActionHandler?(option: any): void;  // TODO
}
