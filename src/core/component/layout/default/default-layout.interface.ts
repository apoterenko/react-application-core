import { IBaseContainerInternalProps } from '../../../component/base';

export interface IDefaultLayoutContainerInternalProps extends IBaseContainerInternalProps {
  title?: string;
  navigationControlType?: string;
  navigationControls?: JSX.Element;
  navigationControlHandler?(): void;
}
