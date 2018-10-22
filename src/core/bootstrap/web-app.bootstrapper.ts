import * as crossvent from 'crossvent';

import { ENV } from '../env';
import { addClassNameToBody } from '../util';

/**
 * Google analytics
 * @stable [10.10.2018]
 * @param args
 */
function gtag(...args) {
  const dL = Reflect.get(window, 'dataLayer') || [];
  Reflect.set(window, 'dataLayer', dL);
  dL.push(arguments);
}

/**
 * @stable [10.10.2018]
 * @param {() => void} onInit
 */
export function bootstrapWebApp(onInit: (() => void)) {
  const ready = () => {
    addClassNameToBody('rac');
    onInit();
  };

  if (ENV.prodMode && ENV.googleKey) {
    gtag('js', new Date());
    gtag('config', ENV.googleKey);
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
