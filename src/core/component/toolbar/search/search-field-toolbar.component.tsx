import * as React from 'react';

import { TextField } from '../../field';
import { SearchToolbar } from './search-toolbar.component';

export class SearchFieldToolbar extends SearchToolbar {

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected get searchField(): JSX.Element {
    return <TextField {...this.fieldProps}/>;
  }
}
