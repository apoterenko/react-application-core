import * as React from 'react';

import { toClassName } from '../../../util';
import { TextField } from '../../field';
import { ISearchToolbarProps } from './search-toolbar.interface';
import { UniversalSearchToolbar } from './universal-search-toolbar.component';
import { IComponent } from '../../../entities-definitions.interface';
import { FlexLayout } from '../../layout';

export class SearchToolbar<TComponent extends IComponent<TProps, TState>,
                           TProps extends ISearchToolbarProps = ISearchToolbarProps,
                           TState = {}>
  extends UniversalSearchToolbar<TComponent, TProps> {

  /**
   * @stable [17.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <FlexLayout row={true}
                  justifyContentEnd={true}
                  className={toClassName('rac-toolbar', this.props.className)}>
        {this.actionsElementsSection}
        {this.fieldSection}
      </FlexLayout>
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
  protected get actionsElementsWrapper(): JSX.Element[] {
    return this.actionsElements;
  }

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  protected get searchField(): JSX.Element {
    return (
      <TextField inputWrapperClassName={this.uiFactory.textFieldBox}
                 {...this.fieldProps}/>
    );
  }
}
