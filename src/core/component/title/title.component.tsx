import * as React from 'react';

import { joinClassName, calc } from '../../util';
import { BaseComponent } from '../base';
import { FlexLayout } from '../layout/flex';
import { ITitleProps } from './title.interface';

export class Title extends BaseComponent<ITitleProps> {

  /**
   * @stable [03.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout
        full={false}
        row={true}
        alignItemsCenter={true}
        className={joinClassName(
          'rac-title-wrapper',
          props.bordered !== false && 'rac-title-wrapper-bordered',
          calc(props.className)
        )}
      >
        <FlexLayout
          full={false}
          className='rac-title'>
          {this.t(props.children as string)}
        </FlexLayout>
        {props.items}
      </FlexLayout>
    );
  }
}
