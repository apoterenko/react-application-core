import { IBaseComponentInternalProps } from '../../../component/base';
import { IApplicationAccessConfig } from '../../../permission';

export enum NavigationListItemTypeEnum {
  GROUP,
  SUB_HEADER,
  DIVIDER,
  LINK,
}

export interface INavigationListItem {
  type?: NavigationListItemTypeEnum;
  text?: string;
  link?: string;
  className?: string;
  icon?: string;
  activated?: boolean;
  accessConfig?: IApplicationAccessConfig;
  children?: INavigationListItem[];
}

export interface INavigationListInternalProps extends IBaseComponentInternalProps {
  items: INavigationListItem[];
}
