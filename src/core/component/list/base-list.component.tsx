import * as React from 'react';

import { AnyT } from '../../definitions.interface';
import { Message } from '../message';
import { UniversalList } from './universal-list.component';

export abstract class BaseList<TProps extends any, // TODO Props
                               TState = {},
                               TSelfRef = AnyT>
  extends UniversalList<TProps, TState, TSelfRef> {

  /**
   * @stable [09.06.2018]
   * @returns {JSX.Element}
   */
  protected getMessage(): JSX.Element {
    return <Message {...this.getMessageComponentProps()}/>;  // TODO ui factory
  }
}
