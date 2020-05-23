import {
  IDataWrapper,
  IEastWrapper,
  IFullWrapper,
  IKeyValue,
  IOptionsWrapper,
  IRenderedWrapper,
  ITypeWrapper,
  IWestWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';

/**
 * @entity
 * @stable [23.05.2020]
 */
export interface IChartOptionsEntity
  extends IDataWrapper<IKeyValue>,
    IOptionsWrapper<IKeyValue>,
    ITypeWrapper {
}

/**
 * @presets-entity
 * @stable [23.05.2020]
 */
export interface IPresetsChartEntity
  extends IEastWrapper,
    IFullWrapper,
    IOptionsWrapper<IChartOptionsEntity>,
    IRenderedWrapper,
    IWestWrapper {
}

/**
 * @generic-entity
 * @stable [23.05.2020]
 */
export interface IGenericChartEntity
  extends IPresetsChartEntity {
}

/**
 * @stable [24.09.2018]
 */
export interface IChartProps
  extends IGenericComponentProps,
    IGenericChartEntity {
}

/**
 * @classes
 * @stable [23.05.2020]
 */
export enum ChartClassesEnum {
  CHART = 'rac-chart',
  CHART_CANVAS_WRAPPER = 'rac-chart__canvas-wrapper',
  FULL_CHART = 'rac-full-chart',
}
