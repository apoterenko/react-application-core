import * as React from 'react';

import { AnyT } from '../../definitions.interface';
import { UniversalList } from './universal-list.component';
import { Info } from '../info';
import { nvl } from '../../util';

export abstract class BaseList<TProps extends any, // TODO Props
                               TState = {},
                               TSelfRef = AnyT>
  extends UniversalList<TProps, TState, TSelfRef> {

  /**
   * @stable [09.06.2018]
   * @returns {JSX.Element}
   */
  protected getMessage(): JSX.Element {
    const {
      emptyDataMessage,
      emptyMessage,
      error,
      progress,
    } = this.props;
    const areDataMissing = this.areDataMissing;

    return (
      <Info
        error={error}
        message={emptyMessage}
        progress={progress}
        emptyData={
          areDataMissing
            ? nvl(emptyDataMessage, areDataMissing)
            : areDataMissing
        }/>
    );
  }
}
