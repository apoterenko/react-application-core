import {
  IDisabledWrapper,
  IFullSizeWrapper,
  IFullWrapper,
  INoShrinkWrapper,
  IOnClickWrapper,
  IResponsiveWrapper,
  IRowWrapper,
  IWrapWrapper,
} from '../definitions.interface';

/**
 * @deprecated
 */
export enum FlexClassNamesEnum {
  FULL = 'rac-flex-full',
}

/**
 * @stable [05.02.2019]
 */
export interface IFlexLayoutEntity
  extends IWrapWrapper,
    IFullWrapper,
    IFullSizeWrapper,
    IRowWrapper,
    IResponsiveWrapper,
    INoShrinkWrapper,
    IDisabledWrapper,
    IOnClickWrapper {
  alignItemsCenter?: boolean;
  alignItemsEnd?: boolean;
  justifyContentCenter?: boolean;
  justifyContentEnd?: boolean;
  justifyContentSpaceBetween?: boolean;
}
