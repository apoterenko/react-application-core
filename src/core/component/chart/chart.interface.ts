import {
  IWestWrapper,
  IEastWrapper,
  IKeyValue,
  IOptionsWrapper,
  ITypeWrapper,
  IDataWrapper,
  IRenderedWrapper,
} from '../../definitions.interface';
import { IComponentProps } from '../../definition';

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
                                     IRenderedWrapper,
                                     IOptionsWrapper<IChartOptions> {
}
