import {
  IActiveWrapper,
  IIconWrapper,
  ILabelWrapper,
  IStylizable,
  ITypeWrapper,
} from '../../../definition.interface';
import { IBaseComponentInternalProps } from '../../base';
import { IApplicationAccessConfig } from '../../../permissions';

export enum NavigationListItemTypeEnum {
  GROUP,
  SUB_HEADER,
  DIVIDER,
  LINK,
}

export interface INavigationListItemOptions extends IActiveWrapper,
                                                    IStylizable,
                                                    IIconWrapper,
                                                    ILabelWrapper,
                                                    ITypeWrapper<NavigationListItemTypeEnum> {
  link?: string;
  accessConfig?: IApplicationAccessConfig;
  children?: INavigationListItemOptions[];
}

export interface INavigationListInternalProps extends IBaseComponentInternalProps {
  items: INavigationListItemOptions[];
}
