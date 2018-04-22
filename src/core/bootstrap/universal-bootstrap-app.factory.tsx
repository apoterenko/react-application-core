import * as React from 'react';
import { Store } from 'redux';
import { Provider } from 'react-redux';

import { DI_TYPES, staticInjector } from '../di';
import {
  IContainerClassEntity,
  IUniversalApplicationStoreEntity,
  IUniversalContainerEntity,
} from '../entities-definitions.interface';
import { universalConnectorFactory } from '../component/connector/universal-connector.factory';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';

/**
 * @stable - 23.04.2018
 * @param {IContainerClassEntity} applicationContainer
 * @param {IUniversalContainerEntity} initialProps
 * @returns {{new(): {render: () => JSX.Element}}}
 */
export const makeBootstrapApp =
  (applicationContainer: IContainerClassEntity, initialProps?: IUniversalContainerEntity):
    { new (): { render: () => JSX.Element } } => {
    const Component = universalConnectorFactory(applicationContainer, (state) => ({...state.application}));
    const store = staticInjector<Store<IUniversalApplicationStoreEntity>>(DI_TYPES.Store);

    return class {
      constructor() {
        // We must dispatch the init action necessarily before the application instantiating
        // because of async App Ready State & Flux architecture
        store.dispatch({type: ApplicationActionBuilder.buildInitActionType()});
      }

      public render(): JSX.Element {
        return (
          <Provider store={store}>
            <Component {...initialProps}/>
          </Provider>
        );
      }
    };
  };
