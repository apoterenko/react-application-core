import * as React from 'react';

import { ISearchToolbarContainerProps } from './search-toolbar.interface';
import { UniversalSearchToolbarContainer } from './universal-search-toolbar.container';
import { SearchToolbar } from './search-toolbar.component';

export class SearchToolbarContainer extends UniversalSearchToolbarContainer<ISearchToolbarContainerProps> {

  /**
   * @stable [01.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return <SearchToolbar {...this.getComponentProps()}/>;
  }
}
