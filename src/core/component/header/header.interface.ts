import { IBaseComponentInternalProps } from '../../component/base';
import { IMenuAction, MenuActionT } from '../../component/menu';

export interface IHeaderProps {
  menuActions?: MenuActionT[];
  navigationActionType?: string;
  navigationActionHandler?(): void;
}

export interface IHeaderInternalProps extends IBaseComponentInternalProps,
                                              IHeaderProps {
  activeFilter?: boolean;
  menuActionHandler?(option: MenuActionT): void;
}
