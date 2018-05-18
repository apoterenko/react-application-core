import * as React from 'react';

import { toClassName } from '../../../util';
import { TextField } from '../../field';
import { ToolbarSection } from '../../toolbar';
import { ISearchToolbarProps } from './search-toolbar.interface';
import { UniversalSearchToolbar } from './universal-search-toolbar.component';

export class SearchToolbar extends UniversalSearchToolbar<SearchToolbar, ISearchToolbarProps> {

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div className={toClassName(this.uiFactory.toolbar, 'rac-toolbar', 'rac-search-toolbar', props.className)}>
        <div className={this.uiFactory.toolbarRow}>
          {this.actionsElementsSection}
          {this.fieldSection}
        </div>
      </div>
    );
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected get fieldWrapper(): JSX.Element {
    return (
      <ToolbarSection>
        {this.searchField}
      </ToolbarSection>
    );
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected get actionsElementsWrapper(): JSX.Element {
    return (
      <ToolbarSection className={this.uiFactory.toolbarSectionAlignEnd}>
        {this.actionsElements}
      </ToolbarSection>
    );
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected get searchField(): JSX.Element {
    return (
      <TextField inputWrapperClassName={this.uiFactory.textFieldBox}
                 {...this.fieldProps}>
      </TextField>
    );
  }
}
