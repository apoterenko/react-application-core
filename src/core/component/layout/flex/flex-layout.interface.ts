import { IComponentProps } from '../../../props-definitions.interface';
import {
  ISeparatorWrapper,
} from '../../../definitions.interface';
import { IFlexLayoutEntity } from '../../../definition';

/**
 * @stable [17.06.2018]
 */
export interface IFlexLayoutProps extends IComponentProps,
                                          IFlexLayoutEntity,
                                          ISeparatorWrapper {
  inline?: boolean; // TODO
}
