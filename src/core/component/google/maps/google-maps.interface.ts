import { IComponentProps } from '../../../props-definitions.interface';
import {
  IOnInitWrapper,
  IOptionsWrapper,
  IOnSelectWrapper,
  IItemWrapper,
  ILatWrapper,
  ILngWrapper,
} from '../../../definitions.interface';
import { IMenuItemEntity } from '../../../entities-definitions.interface';

/**
 * @stable [31.07.2018]
 */
export interface IGoogleMapsSelectEntity extends IItemWrapper<IMenuItemEntity>,
                                                 ILatWrapper,
                                                 ILngWrapper {
}

/**
 * @stable [31.07.2018]
 */
export interface IGoogleMapsProps extends IComponentProps,
                                          IOnSelectWrapper<IGoogleMapsSelectEntity>,
                                          IOptionsWrapper<IMenuItemEntity[]>,
                                          IOnInitWrapper {
}
