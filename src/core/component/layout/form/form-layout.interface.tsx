import { IBaseComponentInternalProps } from 'core/component/base';
import { INotificationAttributes } from 'core/definition.interface';

export interface IFormLayoutInternalProps extends IBaseComponentInternalProps {
  attributes?: INotificationAttributes;
  title: string;
  company: string;
  footer?: JSX.Element;
}
