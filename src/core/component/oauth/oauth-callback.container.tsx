import * as React from 'react';

import { basicConnector } from '../connector';
import {
  IGenericContainerProps,
  OAUTH_CALLBACK_SECTION,
  OAuthClassesEnum,
} from '../../definition';
import { getSettings } from '../../di';
import { GenericContainer } from '../base';
import { joinClassName } from '../../util';
import { Info } from '../info';

@basicConnector({
  routeConfiguration: {
    path: () => getSettings().routes.oauthCallback,
  },
  mappers: [],
})
class OAuthCallbackContainer extends GenericContainer {

  public static readonly defaultProps: IGenericContainerProps = {
    sectionName: OAUTH_CALLBACK_SECTION,
  };

  /**
   * @stable [14.03.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <Info
        className={joinClassName('rac-oauth-callback__message', OAuthClassesEnum.OAUTH_VIEW)}
        progress={true}/>
    );
  }
}
