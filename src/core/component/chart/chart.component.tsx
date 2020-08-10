import * as React from 'react';
import { Chart as ChartJs } from 'chart.js';

import { GenericComponent } from '../base/generic.component';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  FilterUtils,
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
   */
  public componentDidUpdate(): void {
    this.refresh();
  }

  /**
   * @stable [23.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;
    const items = FilterUtils.objectValuesArrayFilter(
      mergedProps.west,
      mergedProps.rendered && <React.Fragment/>,
      mergedProps.east
    );

    return (
      <div
        ref={this.actualRef}
        className={ClsUtils.joinClassName(
          ChartClassesEnum.CHART,
          WrapperUtils.isFull(mergedProps) && ChartClassesEnum.FULL_CHART,
          `${ChartClassesEnum.CHART_WITH_ITEMS_COUNT}${items.length}`,
          CalcUtils.calc(mergedProps.className)
        )}
      >
        {
          ConditionUtils.ifNotNilThanValue(
            mergedProps.west,
            (west) => (
              <div
                className={ChartClassesEnum.CHART_WEST}
              >
                {west}
              </div>
            )
          )
        }
        {mergedProps.rendered && (
          <div
            className={ChartClassesEnum.CHART_CANVAS_WRAPPER}
          >
            <canvas
              ref={this.canvasRef}/>
          </div>
        )}
        {
          ConditionUtils.ifNotNilThanValue(
            mergedProps.east,
            (east) => (
              <div
                className={ChartClassesEnum.CHART_EAST}
              >
                {east}
              </div>
            )
          )
        }
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

    ConditionUtils.ifNotNilThanValue(
      this.canvasRef.current,
      (elId) => {
        this.chartJs = new ChartJs(elId.getContext('2d'), {
          responsive: true,
          maintainAspectRatio: false,
          ...this.mergedProps.options,
        });
      }
    );
  }

  /**
   * @stable [02.06.2020]
   * @returns {IChartProps}
   */
  protected get componentsSettingsProps(): IChartProps {
    return this.componentsSettings.chart;
  }
}
