import * as React from 'react';
import { render } from 'react-dom';

import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

import { GOOGLE_KEY, PROD_MODE } from './env';

LoggerFactory.configureLogLevel(
    PROD_MODE ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL
);

import { addClassNameToBody } from './util';
import { IApplicationContainerProps } from './component/application';
import { IContainerClassEntity } from './entities-definitions.interface';
import { makeBootstrapApp } from './bootstrap/universal-bootstrap-app.factory';

// Google analytics
function gtag(...args) {
  const dL = Reflect.get(window, 'dataLayer') || [];
  Reflect.set(window, 'dataLayer', dL);
  dL.push(arguments);
}

export function bootstrap(
    applicationContainer: IContainerClassEntity,
    props?: IApplicationContainerProps,
    rootId = 'root',
    ) {
  const ready = () => {
    const componentClass = makeBootstrapApp(applicationContainer, props);
    render(
      new componentClass({}).render() as JSX.Element,
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
