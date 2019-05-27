import {
  IFullWrapper,
  INoShrinkWrapper,
  IResponsiveWrapper,
  IRowWrapper,
  IWrapWrapper,
} from '../definitions.interface';

/**
 * @stable [05.02.2019]
 */
export interface IGenericFlexLayoutEntity
  extends IWrapWrapper,
    IFullWrapper,
    IRowWrapper,
    IResponsiveWrapper,
    INoShrinkWrapper {
  alignItemsCenter?: boolean;
  alignItemsEnd?: boolean;
  justifyContentCenter?: boolean;
  justifyContentEnd?: boolean;
  justifyContentSpaceBetween?: boolean;
  justifyContentSpaceEvenly?: boolean;
}
