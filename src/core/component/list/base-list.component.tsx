import * as React from 'react';

import { toClassName, orNull, scrollIntoView } from '../../util';
import { IUIIconConfiguration } from '../../configurations-definitions.interface';
import { Message } from '../message';
import { UniversalList } from './universal-list.component';
import { IUniversalListProps } from '../../props-definitions.interface';

export abstract class BaseList<TComponent extends BaseList<TComponent, TProps, TState>,
                               TProps extends IUniversalListProps,
                               TState = {}>
  extends UniversalList<TComponent, TProps, TState> {

  /**
   * @stable [23.04.2018]
   * @param {HTMLElement} item
   * @param {HTMLElement} view
   */
  protected doScrollIntoView(item: HTMLElement, view: HTMLElement): void {
    scrollIntoView(item, view);
  }

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  protected getMessage(): JSX.Element {
    const props = this.props;
    return (
      <Message emptyData={this.isOriginalDataSourceEmpty()}
               error={props.error}
               progress={props.progress}>
        {this.getAddAction()}
      </Message>
    );
  }

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  protected getAddAction(): JSX.Element {
    return orNull<JSX.Element>(
      this.props.useAddAction,
      () => this.uiFactory.makeIcon<IUIIconConfiguration>({
        type: 'add',
        className: toClassName('rac-add-button', this.uiFactory.fab),
        onClick: this.onCreate,
      })
    );
  }
}
