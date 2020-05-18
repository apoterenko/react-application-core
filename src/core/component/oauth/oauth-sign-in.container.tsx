import * as React from 'react';

import { Info } from '../info';
import { basicConnector } from '../connector';
import {
  IGenericContainerProps,
  OAUTH_SIGN_IN_SECTION,
  OAuthClassesEnum,
} from '../../definition';
import { getSettings } from '../../di';
import { GenericContainer } from '../base';
import { joinClassName } from '../../util';

@basicConnector({
  routeConfiguration: {
    path: () => getSettings().routes.oauthSignIn,
  },
  mappers: [],
})
class OAuthSignInContainer extends GenericContainer {

  public static readonly defaultProps: IGenericContainerProps = {
    sectionName: OAUTH_SIGN_IN_SECTION,
  };

  /**
   * @stable [14.03.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <Info
        className={joinClassName('rac-oauth-sign-in__message', OAuthClassesEnum.OAUTH_VIEW)}
        progress={true}/>
    );
  }
}
