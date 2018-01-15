import { IMenuAction } from '../../../component/menu';
import { IBaseContainerInternalProps } from '../../../component/base';

export interface IDefaultLayoutContainerInternalProps extends IBaseContainerInternalProps {
  bodyClassName?: string;
  headerItems?: JSX.Element;
  headerActions?: Array<IMenuAction<string>>;
  footer?: JSX.Element;
  navigationControlType?: string;
  navigationControlHandler?(): void;
}
