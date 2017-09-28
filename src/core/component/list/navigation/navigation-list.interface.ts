import { IBaseComponentInternalProps } from '../../../component/base';
import { IApplicationAccessConfig } from '../../../permission';

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
