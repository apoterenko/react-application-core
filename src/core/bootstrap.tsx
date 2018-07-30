import * as React from 'react';
import { render } from 'react-dom';
import * as crossvent from 'crossvent';
import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

import { GOOGLE_KEY, PROD_MODE, APP_PROFILE, APP_VERSION } from './env';
import { addClassNameToBody, createElement, addClassNameToElement, preventContextMenu } from './util';
import { IApplicationContainerProps } from './component/application';
import { IContainerClassEntity } from './entities-definitions.interface';
import { IBootstrapConfiguration, DEFAULT_BOOTSTRAP_CONFIGURATION } from './configurations-definitions.interface';
import { makeBootstrapApp } from './bootstrap/universal-bootstrap-app.factory';

// Google analytics
function gtag(...args) {
  const dL = Reflect.get(window, 'dataLayer') || [];
  Reflect.set(window, 'dataLayer', dL);
  dL.push(arguments);
}

// Boot element managing
function addBootElement(rootId: string) {
  const rootEl = createElement();
  rootEl.setAttribute('id', rootId);
  addClassNameToElement(rootEl, 'rac-root', 'rac-flex');
}

// Global error handler
function defineErrorHandler() {
  window.onerror = (e0) => {
    const errorElId = '$$error-message-el';
    let e1;
    try {
      e1 = JSON.stringify(e0);
    } catch (e2) {
      e1 = e0;
    }
    let errorMessageEl: Element = document.getElementById(errorElId);
    if (!errorMessageEl) {
      errorMessageEl = createElement();
      errorMessageEl.id = '$$error-message-el';
      addClassNameToElement(errorMessageEl, 'rac-absolute-center-position');
      addClassNameToElement(errorMessageEl, 'rac-global-error-message');
    }
    errorMessageEl.innerHTML = [
      'Houston! We\'re in trouble!',
      'Please send this screen to app developers.',
      'Thank you!',
      `Build: ${APP_VERSION}`,
      `Details info: [${e1}]`
    ].join('<br>');
  };
}

export function bootstrap(
    applicationContainer: IContainerClassEntity,
    props?: IApplicationContainerProps,
    bootstrapConfiguration: IBootstrapConfiguration = DEFAULT_BOOTSTRAP_CONFIGURATION,
  ) {
  const ready = () => {
    if (bootstrapConfiguration.needToPrepareBody) {
      addClassNameToBody('rac');
      addBootElement(bootstrapConfiguration.rootId);
    }
    addClassNameToBody(APP_PROFILE);
    preventContextMenu();

    const componentClass = makeBootstrapApp(applicationContainer, props);
    render(
      new componentClass({}).render() as JSX.Element,
      document.getElementById(bootstrapConfiguration.rootId),
    );
  };

  if (PROD_MODE && GOOGLE_KEY) {
    gtag('js', new Date());
    gtag('config', GOOGLE_KEY);
  }

  switch (document.readyState) {
    case 'loading':
    case 'interactive':
      // We cannot use DOMContentLoaded because fonts loading and UI blinking
      crossvent.add(window, 'load', ready);
      break;
    case 'complete':
      ready();
      break;
  }

  if (bootstrapConfiguration.needToDefineErrorHandler) {
    defineErrorHandler();
  }
}

LoggerFactory.configureLogLevel(
  PROD_MODE ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL
);
