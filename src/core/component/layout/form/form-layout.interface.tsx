import { IBaseComponentInternalProps } from 'core/component/base';

export interface IFormLayoutInternalProps extends IBaseComponentInternalProps {
  title: string;
  footer?: JSX.Element;
}
