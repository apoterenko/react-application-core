import * as React from 'react';
import { Provider } from 'react-redux';

import {
  IGenericContainerCtor,
  IGenericContainerProps,
} from '../definition';
import { ApplicationActionBuilder } from '../component/application/application-action.builder';
import { GenericContainer } from '../component/base/generic.container';
import { getStore } from '../di';
import { connectorFactory } from '../component/connector/connector.factory';

/**
 * @stable [08.06.2020]
 * @param {IGenericContainerCtor} applicationContainer
 * @param {IGenericContainerProps} initialProps
 * @returns {IGenericContainerCtor}
 */
export const bootstrapApp =
  (applicationContainer: IGenericContainerCtor, initialProps?: IGenericContainerProps): IGenericContainerCtor => {
  const Component = connectorFactory(applicationContainer, (state) => ({...state.application}));

  return class extends GenericContainer {

    /**
     * @stable [08.06.2020]
     * @param {IGenericContainerProps} props
     */
    constructor(props: IGenericContainerProps) {
      super(props);

      // We should dispatch the init action necessarily before the application instantiating
      // because of async App Ready State & Flux architecture
      this.storeProxy.dispatchActionByType(ApplicationActionBuilder.buildInitActionType());
    }

    /**
     * @stable [08.06.2020]
     * @returns {JSX.Element}
     */
    public render(): JSX.Element {
      return (
        <Provider store={getStore()}>
          <Component {...initialProps}/>
        </Provider>
      );
    }
  };
};
