import * as React from 'react';

import { BaseComponent } from '../../../base/base.component';
import { FlexLayout } from '../../../layout/flex';
import { IListItemGraphicProps } from './list-item-graphic.interface';
import { joinClassName } from '../../../../util';

export class ListItemGraphic extends BaseComponent<IListItemGraphicProps> {

  /**
   * @stable [30.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <FlexLayout
        full={false}
        alignItemsCenter={true}
        justifyContentCenter={true}
        row={true}
        className={joinClassName('rac-list-item-graphic', props.className)}>
        {this.uiFactory.makeIcon(props.iconConfiguration)}
      </FlexLayout>
    );
  }
}
