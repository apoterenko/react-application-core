import * as React from 'react';

import { toClassName, orNull, scrollIntoView } from '../../util';
import { IUIIconConfiguration } from '../../configurations-definitions.interface';
import { IUniversalListProps } from '../../props-definitions.interface';
import { Message } from '../message';
import { Button } from '../button';
import { UniversalList } from './universal-list.component';

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
   * @stable [09.06.2018]
   * @returns {JSX.Element}
   */
  protected getMessage(): JSX.Element {
    return (
      <Message {...this.getMessageComponentProps()}>
        {this.addActionElement}
      </Message>
    );
  }

  /**
   * @stable [09.06.2018]
   * @returns {JSX.Element}
   */
  protected getEmptyMessageAction(): JSX.Element {
    return (
      <Button {...this.getEmptyMessageActionComponentProps()}
              className='rac-list-empty-message-button'
              raised={true}/>
    );
  }

  /**
   * @stable [09.09.2018]
   * @returns {JSX.Element}
   */
  protected get addActionElement(): JSX.Element {
    return orNull<JSX.Element>(
      this.props.useAddAction,
      () => this.uiFactory.makeIcon<IUIIconConfiguration>({type: 'add', onClick: this.onCreate})
    );
  }
}
