import * as React from 'react';

import { ISearchToolbarContainerProps } from './search-toolbar.interface';
import { UniversalSearchToolbarContainer } from './universal-search-toolbar.container';
import { SearchFieldToolbar } from './search-field-toolbar.component';

export class SearchFieldToolbarContainer extends UniversalSearchToolbarContainer<ISearchToolbarContainerProps> {

  /**
   * @stable [01.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return <SearchFieldToolbar {...this.getComponentProps()}/>;
  }
}
