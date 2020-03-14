import * as React from 'react';

import { Message } from '../../message';
import { basicConnector } from '../../connector';
import {
  IContainerProps,
  OAUTH_CALLBACK_SECTION,
} from '../../../definition';
import { getSettings } from '../../../di';
import { BaseContainer } from '../../base';

@basicConnector({
  routeConfiguration: {
    path: () => getSettings().routes.oauthCallback,
  },
})
class AuthOpenIdCallbackContainer extends BaseContainer {

  public static readonly defaultProps: IContainerProps = {
    sectionName: OAUTH_CALLBACK_SECTION,
  };

  /**
   * @stable [14.03.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <Message
        className='rac-auth-openid-callback__message'
        progress={true}/>
    );
  }
}
