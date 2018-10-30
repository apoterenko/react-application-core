import * as React from 'react';

import { toClassName } from '../../../../util';
import { BaseComponent } from '../../../base';
import { FlexLayout } from '../../../layout';

export class ListItemGraphic extends BaseComponent<ListItemGraphic> {

  /**
   * @stable [30.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <FlexLayout full={false}
                  alignItemsCenter={true}
                  justifyContentCenter={true}
                  row={true}
                  className={toClassName('rac-list-item-graphic', props.className)}>
        {props.children}
      </FlexLayout>
    );
  }
}
