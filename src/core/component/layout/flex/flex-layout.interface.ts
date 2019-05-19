import { IComponentProps } from '../../../props-definitions.interface';
import {
  IRowWrapper,
  IFullWrapper,
  ISeparatorWrapper,
  IOverflowWrapper,
  IFullSizeWrapper,
  IWrapWrapper,
  IOverflowMinContentHeightWrapper,
} from '../../../definitions.interface';
import { IReactOnClickWrapper } from '../../../react-definitions.interface';
import { IGenericFlexLayoutEntity } from '../../../definition';

/**
 * @stable [17.06.2018]
 */
export interface IFlexLayoutProps extends IComponentProps,
                                          IGenericFlexLayoutEntity,
                                          IReactOnClickWrapper,
                                          IFullSizeWrapper,
                                          ISeparatorWrapper,
                                          IFullWrapper,
                                          IOverflowWrapper,
                                          IOverflowMinContentHeightWrapper,
                                          IRowWrapper {

}
