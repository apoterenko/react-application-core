import * as React from 'react';

import { toClassName } from '../../../util';
import { TextField } from '../../field';
import { ISearchToolbarProps } from './search-toolbar.interface';
import { UniversalSearchToolbar } from './universal-search-toolbar.component';
import { IComponent } from '../../../entities-definitions.interface';

export class SearchToolbar<TComponent extends IComponent<TProps, TState>,
                           TProps extends ISearchToolbarProps = ISearchToolbarProps,
                           TState = {}>
  extends UniversalSearchToolbar<TComponent, TProps> {

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div className={this.getComponentClassName()}>
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

  /**
   * @stable [01.06.2018]
   * @returns {string}
   */
  protected getComponentClassName(): string {
    return toClassName('rac-toolbar',
                        'rac-search-toolbar',
                        'rac-flex',
                        'rac-flex-full',
                        this.props.className
                      );
  }
}
