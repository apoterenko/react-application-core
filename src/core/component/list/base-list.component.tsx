import * as React from 'react';

import { AnyT } from '../../definitions.interface';
import { IUniversalListProps } from '../../props-definitions.interface';
import { Message } from '../message';
import { UniversalList } from './universal-list.component';

export abstract class BaseList<TProps extends IUniversalListProps,
                               TState = {},
                               TSelfRef = AnyT>
  extends UniversalList<TProps, TState, TSelfRef> {

  /**
   * @stable [09.06.2018]
   * @returns {JSX.Element}
   */
  protected getMessage(): JSX.Element {
    return <Message {...this.getMessageComponentProps()}/>;
  }
}
