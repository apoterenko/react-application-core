import { IBaseComponentInternalProps } from 'core/component/base';

export interface INavigationListItem {
  text: string;
  link: string;
  className?: string;
  icon?: string;
  activated?: boolean;
  children?: INavigationListItem[];
}

export interface INavigationListInternalProps extends IBaseComponentInternalProps {
  items: INavigationListItem[];
}
