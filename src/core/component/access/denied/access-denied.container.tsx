import * as React from 'react';

import { CenterLayout } from '../../layout';
import { basicConnector, defaultMappers } from '../../connector';
import { BaseContainer } from '../../base';
import { DefaultLayoutContainer } from '../../layout';
import { ACCESS_DENIED_SECTION } from './access-denied.interface';
import { ContainerVisibilityTypeEnum } from '../../../configurations-definitions.interface';
import { IApplicationStoreEntity } from '../../../entities-definitions.interface';
import { IContainerProps } from '../../../props-definitions.interface';

@basicConnector<IApplicationStoreEntity>({
  routeConfiguration: {
    type: ContainerVisibilityTypeEnum.PRIVATE,
    path: 'access/denied',
  },
  mappers: [
    ...defaultMappers
  ],
})
export class AccessDeniedContainer extends BaseContainer {

  public static defaultProps: IContainerProps = {
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
