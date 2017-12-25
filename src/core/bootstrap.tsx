import * as React from 'react';
import { render } from 'react-dom';
import { Store } from 'redux';
import { connect, Provider } from 'react-redux';
import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

import { GOOGLE_KEY, PROD_MODE } from './env';

LoggerFactory.configureLogLevel(
    PROD_MODE ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL
);

import { appContainer, DI_TYPES } from './di';
import {
  ApplicationActionBuilder,
  ApplicationContainer,
  IApplicationContainerProps
} from './component/application';
import { ApplicationStateT } from './store';
import { IApplicationDictionariesState } from './dictionary';
import { IApplicationPermissionsState } from './permission';
import { IContainerBootstrapCtor } from './bootstrap.interface';

// Google analytics
function gtag(...args) {
  const dL = Reflect.get(window, 'dataLayer') || [];
  Reflect.set(window, 'dataLayer', dL);
  dL.push(arguments);
}

export function bootstrap(
    applicationContainer: IContainerBootstrapCtor<ApplicationContainer<ApplicationStateT, IApplicationDictionariesState, IApplicationPermissionsState<{}>, {}, {}>,
                                                  ApplicationStateT,
                                                  IApplicationDictionariesState,
                                                  IApplicationPermissionsState<{}>,
                                                  {},
                                                  {}>,
    props?: IApplicationContainerProps,
    rootId = 'root',
    ) {
  const ready = () => {
    const Component = connect((state: ApplicationStateT) => ({ ...state.applicationReady }), {})
                                  (applicationContainer);

    const store = appContainer.get(DI_TYPES.Store) as Store<ApplicationStateT>;
    // We must dispatch the init action necessarily before the application instantiating
    // because of async IApplicationReadyState & Flux architecture
    store.dispatch({type: ApplicationActionBuilder.buildInitActionType()});

    render(
        <Provider store={store}>
          <Component {...props}/>
        </Provider>,
        document.getElementById(rootId),
    );
  };

  if (PROD_MODE) {
    gtag('js', new Date());
    gtag('config', GOOGLE_KEY);
  }

  switch (document.readyState) {
    case 'loading':
    case 'interactive':
      // We cannot use DOMContentLoaded because fonts loading and UI blinking
      window.addEventListener('load', ready);
      break;
    case 'complete':
      ready();
      break;
  }
}
