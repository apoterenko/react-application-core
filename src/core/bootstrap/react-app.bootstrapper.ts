import { render } from 'react-dom';

import {
  getElementById,
} from '../util';
import {
  IContainerCtor,
  IContainerProps,
} from '../definition';
import { makeBootstrapApp } from './universal-bootstrap-app.factory';

/**
 * @stable [20.09.2019]
 * @param {IContainerCtor} applicationContainer
 * @param {IBootstrapEntity} bootstrapEntity
 */
export const bootstrapReactApp = <TStoreEntity>(
  applicationContainer: IContainerCtor) => {
  const componentClass = makeBootstrapApp(applicationContainer, {});
  render(
    new componentClass({}).render() as JSX.Element, // Isomorphic componentClass
    getElementById('appId'), // TODO settings
  );
};
