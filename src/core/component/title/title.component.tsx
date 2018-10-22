import * as React from 'react';
import * as R from 'ramda';

import { toClassName, orNull } from '../../util';
import { BaseComponent } from '../base';
import { FlexLayout } from '../layout';
import { ITitleProps } from './title.interface';

export class Title extends BaseComponent<Title, ITitleProps> {

  /**
   * @stable [03.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout full={false}
                  row={true}
                  className={toClassName('rac-title-wrapper', props.className)}>
        <FlexLayout className='rac-title'
                    justifyContentCenter={true}>
          {this.t(props.children as string)}
        </FlexLayout>
        {
          orNull<JSX.Element>(
            !R.isNil(props.items),
            () => (
              <FlexLayout full={false}
                          justifyContentCenter={true}>
                {props.items}
              </FlexLayout>
            )
          )
        }
      </FlexLayout>
    );
  }
}
