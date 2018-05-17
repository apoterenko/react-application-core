import * as React from 'react';

import { SearchToolbar } from '../../toolbar';
import { ISearchToolbarContainerProps } from './search-toolbar.interface';
import { UniversalSearchToolbarContainer } from './universal-search-toolbar.container';

export class SearchToolbarContainer extends UniversalSearchToolbarContainer<ISearchToolbarContainerProps> {

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return <SearchToolbar {...this.getComponentProps()}/>;
  }
}
