import * as React from 'react';
import * as R from 'ramda';
import { render } from 'react-dom';
import * as crossvent from 'crossvent';

import { ENV } from '../env';
import { addClassNameToBody, createElement, addClassNameToElement, buildErrorMessage, orNull } from '../util';
import { IApplicationContainerProps } from '../component/application';
import { IContainerClassEntity } from '../entities-definitions.interface';
import { IBootstrapConfiguration, DEFAULT_BOOTSTRAP_CONFIGURATION } from '../configurations-definitions.interface';
import { makeBootstrapApp } from './universal-bootstrap-app.factory';

// Google analytics
function gtag(...args) {
  (window.dataLayer || []).push(arguments);
}

// Boot element managing
function addBootElement(rootId: string) {
  const rootEl = createElement();
  rootEl.setAttribute('id', rootId);
  addClassNameToElement(rootEl, 'rac-root', 'rac-flex');
}

// Global error handler
function defineErrorHandler() {
  window.onerror = (e) => {
    const errorElId = '$$error-message-el';

    let errorMessageEl: Element = document.getElementById(errorElId);
    if (!errorMessageEl) {
      errorMessageEl = createElement();
      errorMessageEl.id = '$$error-message-el';
      addClassNameToElement(errorMessageEl, 'rac-absolute-center-position');
      addClassNameToElement(errorMessageEl, 'rac-global-error-message');
    }
    errorMessageEl.innerHTML = buildErrorMessage(e, '<br>');
  };
}

export function bootstrap(
    applicationContainer: IContainerClassEntity,
    props?: IApplicationContainerProps,
    bootstrapConfiguration: IBootstrapConfiguration = DEFAULT_BOOTSTRAP_CONFIGURATION,
  ) {
  const ready = () => {
    if (bootstrapConfiguration.needToPrepareBody) {
      addClassNameToBody(
        'rac',
        orNull(ENV.macPlatform, 'rac-mac'),
        orNull(ENV.iosPlatform, 'rac-ios'),
        orNull(ENV.androidPlatform, 'rac-android'),
        orNull(ENV.safariPlatform, 'rac-safari')
      );
      addBootElement(bootstrapConfiguration.rootId);
    }
    addClassNameToBody(ENV.appProfile);

    const componentClass = makeBootstrapApp(applicationContainer, props);
    render(
      new componentClass({}).render() as JSX.Element,
      document.getElementById(bootstrapConfiguration.rootId),
    );
  };

  if (ENV.prodMode && ENV.googleKey) {
    gtag('js', new Date());
    gtag('config', ENV.googleKey);
    if (!R.isNil(window.ga)) {
      window.ga('create', ENV.googleKey, 'auto');
    }
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
