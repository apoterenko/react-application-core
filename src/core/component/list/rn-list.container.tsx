import * as React from 'react';

import { UniversalBaseListContainer } from './universal-base-list.container';
import { RnList } from './rn-list.component';
import { IRnListContainerProps } from './list.interface';

export class RnListContainer extends UniversalBaseListContainer<IRnListContainerProps> {

  /**
   * @stable [06.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return <RnList {...this.getComponentProps()}
                   {...this.props.listConfiguration}/>;
  }
}
