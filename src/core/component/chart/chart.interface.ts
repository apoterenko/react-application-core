import {
  IWestWrapper,
  IEastWrapper,
  IKeyValue,
  IOptionsWrapper,
  ITypeWrapper,
  IDataWrapper,
} from '../../definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';

/**
 * @stable [24.09.2018]
 */
export interface IChartOptions extends ITypeWrapper,
                                       IDataWrapper<IKeyValue>,
                                       IOptionsWrapper<IKeyValue> {
}

/**
 * @stable [24.09.2018]
 */
export interface IChartProps extends IComponentProps,
                                     IWestWrapper,
                                     IEastWrapper,
                                     IOptionsWrapper<IChartOptions> {
}
