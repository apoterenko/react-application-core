import { FunctionT } from '../../../util';
import { IBaseContainerInternalProps } from '../../../component/base';

export interface IDefaultLayoutContainerInternalProps extends IBaseContainerInternalProps {
  title?: string;
  navigationControlType?: string;
  navigationControlHandler?: FunctionT;
}
