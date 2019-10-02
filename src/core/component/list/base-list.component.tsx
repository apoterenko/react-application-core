import * as React from 'react';

import { orNull } from '../../util';
import { IUniversalListProps } from '../../props-definitions.interface';
import { Message } from '../message';
import { UniversalList } from './universal-list.component';

export abstract class BaseList<TProps extends IUniversalListProps,
                               TState = {}>
  extends UniversalList<TProps, TState> {

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
   * @stable [09.09.2018]
   * @returns {JSX.Element}
   */
  protected get addActionElement(): JSX.Element {
    return orNull<JSX.Element>(
      this.props.useAddAction,
      () => this.uiFactory.makeIcon({type: 'add', onClick: this.onCreate})
    );
  }
}
