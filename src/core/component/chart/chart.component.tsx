import * as React from 'react';
import * as R from 'ramda';
import { Chart as ChartJs } from 'chart.js';

import { BaseComponent } from '../base';
import { FlexLayout } from '../layout/flex';
import { IChartProps } from './chart.interface';
import { toClassName, ifNotFalseThanValue } from '../../util';

export class Chart extends BaseComponent<IChartProps> {

  private readonly canvasRef = React.createRef<HTMLCanvasElement>();
  private chartJs: ChartJs;

  /**
   * @stable [28.02.2019]
   */
  public componentDidMount(): void {
    super.componentDidMount();
    this.refresh();
  }

  /**
   * @stable [28.02.2019]
   * @param {Readonly<IChartProps>} prevProps
   * @param {Readonly<{}>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<IChartProps>, prevState: Readonly<{}>): void {
    super.componentDidUpdate(prevProps, prevState);
    this.refresh();
  }

  /**
   * @stable [14.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout
        row={true}
        className={toClassName(props.className, 'rac-chart')}
      >
        {props.west}
        {
          ifNotFalseThanValue(
            props.rendered,
            () => (
              <div className='rac-chart-canvas-wrapper'>
                <canvas ref={this.canvasRef}/>
              </div>
            )
          )
        }
        {props.east}
      </FlexLayout>
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
      this.chartJs = new ChartJs(elId.getContext('2d'), this.props.options);
    }
  }
}
