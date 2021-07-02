import * as React from 'react';
import { Chart as ChartJs } from 'chart.js';

import { GenericComponent } from '../base/generic.component';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  FilterUtils,
  PropsUtils,
} from '../../util';
import {
  ChartClassesEnum,
  IChartProps,
} from '../../definition';

/**
 * @component-impl
 * @stable [18.12.2020]
 */
export class Chart extends GenericComponent<IChartProps> {

  public static readonly defaultProps: IChartProps = {
    full: true,
    rendered: true,
  };

  private readonly canvasRef = React.createRef<HTMLCanvasElement>();
  private chartJs: ChartJs;

  /**
   * @stable [18.12.2020]
   */
  public componentDidMount(): void {
    this.refresh();
  }

  /**
   * @stable [18.12.2020]
   */
  public componentDidUpdate(): void {
    this.refresh();
  }

  /**
   * @stable [18.12.2020]
   */
  public render(): JSX.Element {
    const {
      className,
      east,
      full,
      rendered,
      west,
    } = this.originalProps;
    const items = FilterUtils.objectValuesArrayFilter(
      west,
      rendered && <React.Fragment/>,
      east
    );

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            ChartClassesEnum.CHART,
            full && ChartClassesEnum.FULL_CHART,
            `${ChartClassesEnum.CHART_WITH_ITEMS_COUNT}${items.length}`,
            CalcUtils.calc(className)
          )}
      >
        {
          west && (
            <div
              className={ChartClassesEnum.CHART_WEST}
            >
              {west}
            </div>
          )
        }
        {rendered && (
          <div
            className={ChartClassesEnum.CHART_CANVAS_WRAPPER}
          >
            <canvas
              ref={this.canvasRef}/>
          </div>
        )}
        {
          east && (
            <div
              className={ChartClassesEnum.CHART_EAST}
            >
              {east}
            </div>
          )
        }
      </div>
    );
  }

  /**
   * @stable [18.12.2020]
   * @private
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
   * @stable [01.07.2021]
   */
  protected getComponentSettingsProps(): Readonly<IChartProps> {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.chart
    );
  }
}
