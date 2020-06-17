import * as React from 'react';
import { Provider } from 'react-redux';

import {
  IGenericContainerCtor,
  IGenericContainerProps,
} from '../../definition';
import { DiServices } from '../../di';
import { ApplicationActionBuilder } from './application-action.builder';
import { GenericContainer } from '../base/generic.container';
import { connectorFactory } from '../connector/connector.factory';

/**
 * @stable [17.06.2020]
 * @param {IGenericContainerCtor} container
 * @param {IGenericContainerProps} initialProps
 * @returns {IGenericContainerCtor}
 */
export const makeApplicationRootContainerCtor =
  (container: IGenericContainerCtor, initialProps?: IGenericContainerProps): IGenericContainerCtor => {
  const Component = connectorFactory(container, (state) => ({...state.application}));

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
        <Provider
          store={DiServices.store()}
        >
          <Component {...initialProps}/>
        </Provider>
      );
    }
  };
};
