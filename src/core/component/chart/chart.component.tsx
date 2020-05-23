import * as React from 'react';
import * as R from 'ramda';
import { Chart as ChartJs } from 'chart.js';

import { GenericComponent } from '../base/generic.component';
import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
  WrapperUtils,
} from '../../util';
import {
  ChartClassesEnum,
  IChartProps,
} from '../../definition';

/**
 * @component-impl
 * @stable [23.05.2020]
 */
export class Chart extends GenericComponent<IChartProps> {

  public static readonly defaultProps: IChartProps = {
    rendered: true,
  };

  private readonly canvasRef = React.createRef<HTMLCanvasElement>();
  private chartJs: ChartJs;

  /**
   * @stable [23.05.2020]
   */
  public componentDidMount(): void {
    this.refresh();
  }

  /**
   * @stable [23.05.2020]
   * @param {Readonly<IChartProps>} prevProps
   * @param {Readonly<{}>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<IChartProps>, prevState: Readonly<{}>): void {
    this.refresh();
  }

  /**
   * @stable [23.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;
    return (
      <div
        ref={this.actualRef}
        className={ClsUtils.joinClassName(
          ChartClassesEnum.CHART,
          WrapperUtils.isFull(mergedProps) && ChartClassesEnum.FULL_CHART,
          CalcUtils.calc(mergedProps.className)
        )}
      >
        {mergedProps.west}
        {mergedProps.rendered && (
          <div className={ChartClassesEnum.CHART_CANVAS_WRAPPER}>
            <canvas ref={this.canvasRef}/>
          </div>
        )}
        {mergedProps.east}
      </div>
    );
  }

  /**
   * @stable [28.02.2019]
   */
  private refresh(): void {
    if (this.chartJs) {
      this.chartJs.destroy(); // It's too heavy to call an update() and update partially
    }
    const elId = this.canvasRef.current;
    if (!R.isNil(elId)) {
      this.chartJs = new ChartJs(elId.getContext('2d'), {
        responsive: true,
        maintainAspectRatio: false,
        ...this.mergedProps.options,
      });
    }
  }

  /**
   * @stable [22.05.2020]
   * @returns {IChartProps}
   */
  private get mergedProps(): IChartProps {
    return PropsUtils.mergeWithSystemProps(this.originalProps, this.componentsSettings.chart);
  }
}
