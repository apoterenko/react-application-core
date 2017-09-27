import { IBaseComponentInternalProps } from 'core/component/base';
import { IApplicationAccessConfig } from 'core/permission';

export interface INavigationListItem {
  text: string;
  link: string;
  className?: string;
  icon?: string;
  activated?: boolean;
  accessConfig?: IApplicationAccessConfig;
  children?: INavigationListItem[];
}

export interface INavigationListInternalProps extends IBaseComponentInternalProps {
  items: INavigationListItem[];
}
