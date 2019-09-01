import * as React from 'react';

import { CenterLayout } from '../layout';
import { ProgressLabel } from '../progress';
import { UniversalMessage } from './universal-message.component';
import { isString, uuid } from '../../util';

export class Message extends UniversalMessage {

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  protected getProgressLabel(): JSX.Element {
    return <ProgressLabel {...this.props.progressLabelProps}/>;
  }

  /**
   * @stable [09.06.2018]
   * @param {React.ReactNode} message
   * @param {React.ReactNode} node
   * @returns {JSX.Element}
   */
  protected getMessageWrapper(message: React.ReactNode, node: React.ReactNode): JSX.Element {
    return (
      <CenterLayout className='rac-message'>
        {isString(message)
          ? (
            <div className='rac-message-content'>
              {(message as string).split('\n').map((part) => <p key={uuid()}>{part}</p>)}
            </div>
          )
          : message}
        {node}
      </CenterLayout>
    );
  }
}
