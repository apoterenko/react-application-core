import * as React from 'react';
import { View, Text } from 'react-native';

import { UniversalMessage } from './universal-message.component';

export class RnMessage extends UniversalMessage<RnMessage> {

  /**
   * @stable - 24.04.2018
   * @returns {string}
   */
  protected getProgressLabel(): string {
    return this.settings.messages.waitMessage;
  }

  /**
   * @stable - 24.04.2018
   * @param {string | JSX.Element} message
   * @param {React.ReactNode} node
   * @returns {JSX.Element}
   */
  protected getMessageWrapper(message: string | JSX.Element, node: React.ReactNode): JSX.Element {
    return (
      <View>
        <Text>
          {message}
        </Text>
        {node}
      </View>
    );
  }
}
