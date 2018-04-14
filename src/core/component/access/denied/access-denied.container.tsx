import * as React from 'react';

import { IDefaultApplicationState } from '../../../store';
import { CenterLayout } from '../../layout';
import { basicConnector, defaultMappers } from '../../connector';
import { BaseContainer, IBaseContainerInternalProps } from '../../base';
import { DefaultLayoutContainer } from '../../layout';
import { ACCESS_DENIED_SECTION } from './access-denied.interface';
import { ContainerVisibilityTypeEnum } from '../../../configurations-definitions.interface';

@basicConnector<IDefaultApplicationState>({
  routeConfig: (routes) => ({
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: routes.accessDenied,
  }),
  mappers: [
    ...defaultMappers
  ],
})
export class AccessDeniedContainer extends BaseContainer<{}, {}> {

  public static defaultProps: IBaseContainerInternalProps = {
    sectionName: ACCESS_DENIED_SECTION,
  };

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
