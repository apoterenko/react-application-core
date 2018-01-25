import * as React from 'react';

import { ApplicationStateT } from '../../../store';
import { CenterLayout } from '../../../component/layout';
import { connector, defaultMappers } from '../../../component/connector';
import { ContainerVisibilityTypeEnum } from '../../../router';
import { BaseContainer } from '../../../component/base';
import { DefaultLayoutContainer } from '../../../component/layout';
import { IApplicationAccessConfig } from '../../../permission';
import { ACCESS_DENIED_SECTION } from './access-denied.interface';

@connector<ApplicationStateT, IApplicationAccessConfig>({
  routeConfig: (routes) => ({
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: routes.accessDenied,
  }),
  sectionName: ACCESS_DENIED_SECTION,
  mappers: [
    ...defaultMappers
  ],
})
export class AccessDeniedContainer extends BaseContainer<{}, {}> {

  public render(): JSX.Element {
    const props = this.props;
    const messages = this.settings.messages;

    return (
        <DefaultLayoutContainer {...props}>
          <CenterLayout>
            <div className='rac-access-denied'>
              {this.uiFactory.makeIcon('report')}
              <p>{this.t(messages.accessDeniedMessage)}</p>
              <p>{this.t(messages.sorryMessage)}</p>
            </div>
          </CenterLayout>
        </DefaultLayoutContainer>
    );
  }
}
