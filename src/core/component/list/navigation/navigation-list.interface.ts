import {
  IActiveWrapper,
  ILabelWrapper,
  IStylizable,
  ITypeWrapper,
  IStringIconWrapper,
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
                                                    IStringIconWrapper,
                                                    ILabelWrapper,
                                                    ITypeWrapper<NavigationListItemTypeEnum> {
  link?: string;
  accessConfig?: IApplicationAccessConfig;
  children?: INavigationListItemOptions[];
}

export interface INavigationListInternalProps extends IBaseComponentInternalProps {
  items: INavigationListItemOptions[];
}
