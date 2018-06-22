import * as React from 'react';
import { Provider } from 'react-redux';

import {
  IContainerClassEntity,
  IUniversalContainerEntity,
} from '../entities-definitions.interface';
import { universalConnectorFactory } from '../component/connector/universal-connector.factory';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';
import { UniversalContainer } from '../component/base/universal.container';

/**
 * @stable - 23.04.2018
 * @param {IContainerClassEntity} applicationContainer
 * @param {IUniversalContainerEntity} initialProps
 * @returns {IContainerClassEntity}
 */
export const makeBootstrapApp =
  (applicationContainer: IContainerClassEntity, initialProps?: IUniversalContainerEntity):
    IContainerClassEntity => {
    const Component = universalConnectorFactory(applicationContainer, (state) => ({...state.application}));

    return class extends UniversalContainer {
      constructor(props: IUniversalContainerEntity) {
        super(props);

        // We must dispatch the init action necessarily before the application instantiating
        // because of async App Ready State & Flux architecture
        this.appStore.dispatch({type: ApplicationActionBuilder.buildInitActionType()});
      }

      public render(): JSX.Element {
        return (
          <Provider store={this.appStore}>
            <Component {...initialProps}/>
          </Provider>
        );
      }
    };
  };
