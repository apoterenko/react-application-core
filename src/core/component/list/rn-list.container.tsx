import * as React from 'react';

import { UniversalBaseListContainer } from './universal-base-list.container';
import { RnList } from './rn-list.component';
import { IRnListContainerProps } from './list.interface';

export class RnListContainer extends UniversalBaseListContainer<IRnListContainerProps> {

  /**
   * @stable [05.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return <RnList onSelect={this.onSelect}
                   onCreate={this.onCreate}
                   {...props.listConfiguration}
                   {...props.list}/>;
  }
}
