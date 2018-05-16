import * as React from 'react';
import { render } from 'react-dom';
import * as crossvent from 'crossvent';
import { LoggerFactory, LoggerLevelEnum } from 'ts-smart-logger';

import { GOOGLE_KEY, PROD_MODE } from './env';
import { addClassNameToBody, createElement, addClassNameToElement } from './util';
import { IApplicationContainerProps } from './component/application';
import { IContainerClassEntity } from './entities-definitions.interface';
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
  addClassNameToElement(rootEl, 'rac-root');
  addClassNameToElement(rootEl, 'rac-flex');
}

export function bootstrap(
    applicationContainer: IContainerClassEntity,
    props?: IApplicationContainerProps,
    rootId = 'root',
    needToPrepareBody = true
  ) {
  const ready = () => {
    if (needToPrepareBody) {
      addClassNameToBody('rac');
      addClassNameToBody('mdc-typography');
      addBootElement(rootId);
    }

    const componentClass = makeBootstrapApp(applicationContainer, props);
    render(
      new componentClass({}).render() as JSX.Element,
      document.getElementById(rootId),
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
}

LoggerFactory.configureLogLevel(
  PROD_MODE ? LoggerLevelEnum.ERROR_LEVEL : LoggerLevelEnum.DEBUG_LEVEL
);
