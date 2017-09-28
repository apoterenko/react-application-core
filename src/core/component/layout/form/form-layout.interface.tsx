import { IBaseComponentInternalProps } from '../../../component/base';

export interface IFormLayoutInternalProps extends IBaseComponentInternalProps {
  title: string;
  footer?: JSX.Element;
}
