import {
  IActiveable,
  IIconable,
  ILabelable,
  IStylizable,
  ITypeable,
} from '../../../definition.interface';
import { IBaseComponentInternalProps } from '../../base';
import { IApplicationAccessConfig } from '../../../permissions';

export enum NavigationListItemTypeEnum {
  GROUP,
  SUB_HEADER,
  DIVIDER,
  LINK,
}

export interface INavigationListItemOptions extends IActiveable,
                                                    IStylizable,
                                                    IIconable,
                                                    ILabelable,
                                                    ITypeable<NavigationListItemTypeEnum> {
  link?: string;
  accessConfig?: IApplicationAccessConfig;
  children?: INavigationListItemOptions[];
}

export interface INavigationListInternalProps extends IBaseComponentInternalProps {
  items: INavigationListItemOptions[];
}
