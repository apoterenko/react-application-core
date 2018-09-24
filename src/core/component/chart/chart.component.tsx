import * as React from 'react';
import {Chart as ChartJs} from 'chart.js';

import { BaseComponent } from '../base';
import { FlexLayout } from '../layout';
import { IChartProps } from './chart.interface';
import { toClassName, uuid } from '../../util';

export class Chart extends BaseComponent<Chart, IChartProps> {

  private readonly canvasId = uuid(true);

  /**
   * @stable [24.09.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();
    const ctx = (document.getElementById(this.canvasId) as HTMLCanvasElement).getContext('2d');
    new ChartJs(ctx, this.props.options);
  }

  /**
   * @stable [14.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout row={true}
                  className={toClassName(props.className, 'rac-chart')}>
        {props.west}
        <FlexLayout className='rac-chart-canvas-holder'>
          <FlexLayout className='rac-chart-canvas-wrapper'>
            <canvas id={this.canvasId}/>
          </FlexLayout>
        </FlexLayout>
        {props.east}
      </FlexLayout>
    );
  }
}
