import * as React from 'react';

import { Message } from '../message';
import { basicConnector } from '../connector';
import {
  IContainerProps,
  OAUTH_CALLBACK_SECTION,
  OAuthClassesEnum,
} from '../../definition';
import { getSettings } from '../../di';
import { BaseContainer } from '../base';
import { joinClassName } from '../../util';

@basicConnector({
  routeConfiguration: {
    path: () => getSettings().routes.oauthCallback,
  },
  mappers: [],
})
class OAuthCallbackContainer extends BaseContainer {

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
        className={joinClassName('rac-oauth-callback__message', OAuthClassesEnum.OAUTH_VIEW)}
        progress={true}/>
    );
  }
}
