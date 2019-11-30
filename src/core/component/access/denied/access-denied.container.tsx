import * as React from 'react';

import { FlexLayout } from '../../layout/flex';
import { basicConnector, defaultMappers } from '../../connector';
import { BaseContainer } from '../../base';
import { DefaultLayoutContainer } from '../../layout';
import { ACCESS_DENIED_SECTION } from './access-denied.interface';
import {
  ContainerVisibilityTypesEnum,
  IContainerProps,
  IStoreEntity,
} from '../../../definition';

@basicConnector<IStoreEntity>({
  routeConfiguration: {
    type: ContainerVisibilityTypesEnum.PRIVATE,
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
          <FlexLayout
            justifyContentCenter={true}
            alignItemsCenter={true}>
            <div className='rac-access-denied'>
              {this.uiFactory.makeIcon('report')}
              <p>{this.t(messages.accessDeniedMessage)}</p>
              <p>{this.t(messages.sorryMessage)}</p>
            </div>
          </FlexLayout>
        </DefaultLayoutContainer>
    );
  }
}
