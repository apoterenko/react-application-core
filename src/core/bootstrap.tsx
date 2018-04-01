import * as React from 'react';
import { render } from 'react-dom';
import { Store } from 'redux';
import { connect, Provider } from 'react-redux';
import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

import { GOOGLE_KEY, PROD_MODE } from './env';

LoggerFactory.configureLogLevel(
    PROD_MODE ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL
);

import { DI_TYPES, staticInjector } from './di';
import {
  ApplicationActionBuilder,
  ApplicationContainer,
  IApplicationContainerProps
} from './component/application';
import { IDefaultApplicationState } from './store';
import { IContainerBootstrapCtor } from './bootstrap.interface';
import { addClassNameToBody } from './util';

// Google analytics
function gtag(...args) {
  const dL = Reflect.get(window, 'dataLayer') || [];
  Reflect.set(window, 'dataLayer', dL);
  dL.push(arguments);
}

export function bootstrap(
    applicationContainer: IContainerBootstrapCtor<ApplicationContainer<IDefaultApplicationState>>,
    props?: IApplicationContainerProps,
    rootId = 'root',
    ) {
  const ready = () => {
    const Component = connect((state: IDefaultApplicationState) => ({ ...state.applicationReady }), {})
                                  (applicationContainer);

    const store = staticInjector<Store<IDefaultApplicationState>>(DI_TYPES.Store);
    // We must dispatch the init action necessarily before the application instantiating
    // because of async IApplicationReadyState & Flux architecture
    store.dispatch({type: ApplicationActionBuilder.buildInitActionType()});

    render(
        <Provider store={store}>
          <Component {...props}/>
        </Provider>,
        document.getElementById(rootId),
    );

    addClassNameToBody('rac');
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
