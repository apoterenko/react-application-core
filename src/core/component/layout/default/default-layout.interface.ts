import { FunctionT } from 'core/util';
import { IBaseContainerInternalProps } from 'core/component/base';

export interface IDefaultLayoutContainerInternalProps extends IBaseContainerInternalProps {
  title?: string;
  navigationControlType?: string;
  navigationControlHandler?: FunctionT;
}
