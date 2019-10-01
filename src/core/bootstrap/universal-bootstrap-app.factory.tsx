import * as React from 'react';
import { Provider } from 'react-redux';

import { IUniversalContainerEntity, IContainerProps, IContainerCtor } from '../definition';
import { universalConnectorFactory } from '../component/connector/universal-connector.factory';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';
import { UniversalContainer } from '../component/base/universal.container';

/**
 * @stable - 23.04.2018
 * @param {IContainerCtor} applicationContainer
 * @param {IUniversalContainerEntity} initialProps
 * @returns {IContainerCtor}
 */
export const makeBootstrapApp =
  (applicationContainer: IContainerCtor, initialProps?: IUniversalContainerEntity):
    IContainerCtor => {
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
