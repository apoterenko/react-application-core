import { IBaseComponentInternalProps } from 'core/component/base';

export interface IFormLayoutInternalProps extends IBaseComponentInternalProps {
  title: string;
  company: string;
  footer?: JSX.Element;
}
