import * as React from 'react';

import { toClassName } from '../../../util';
import { TextField } from '../../field';
import { SearchToolbar } from './search-toolbar.component';

export class SearchFieldToolbar extends SearchToolbar<SearchFieldToolbar> {

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div className={toClassName('rac-toolbar', 'rac-search-field-toolbar', props.className)}>
        {this.actionsElementsSection}
        {this.fieldSection}
      </div>
    );
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected get fieldWrapper(): JSX.Element {
    return this.searchField;
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected get searchField(): JSX.Element {
    return <TextField {...this.fieldProps}/>;
  }
}
