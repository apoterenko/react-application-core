import * as React from 'react';

import { toClassName } from '../../../util';
import { TextField } from '../../field';
import { ISearchToolbarProps } from './search-toolbar.interface';
import { UniversalSearchToolbar } from './universal-search-toolbar.component';
import { IComponent } from '../../../entities-definitions.interface';
import { FlexLayout } from '../../layout';
import { Button } from '../../button';

export class SearchToolbar<TComponent extends IComponent<TProps, TState>,
                           TProps extends ISearchToolbarProps = ISearchToolbarProps,
                           TState = {}>
  extends UniversalSearchToolbar<TComponent, TProps> {

  /**
   * @stable [17.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout row={true}
                  justifyContentEnd={true}
                  alignItemsCenter={true}
                  full={props.full}
                  className={toClassName('rac-toolbar', props.className)}>
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

  protected getActionElement(config: any): JSX.Element {
    return <Button {...config}/>;	// TODO
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
