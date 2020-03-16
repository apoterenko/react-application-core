import * as React from 'react';

import { Message } from '../message';
import { basicConnector } from '../connector';
import {
  IContainerProps,
  OAUTH_SIGN_IN_SECTION,
  OAuthClassesEnum,
} from '../../definition';
import { getSettings } from '../../di';
import { BaseContainer } from '../base';
import { joinClassName } from '../../util';

@basicConnector({
  routeConfiguration: {
    path: () => getSettings().routes.oauthSignIn,
  },
  mappers: [],
})
class OAuthSignInContainer extends BaseContainer {

  public static readonly defaultProps: IContainerProps = {
    sectionName: OAUTH_SIGN_IN_SECTION,
  };

  /**
   * @stable [14.03.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <Message
        className={joinClassName('rac-oauth-sign-in__message', OAuthClassesEnum.OAUTH_VIEW)}
        progress={true}/>
    );
  }
}
