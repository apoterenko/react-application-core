import { render } from 'react-dom';

import {
  getElementById,
} from '../util';
import { IGenericContainerCtor } from '../definition';
import { bootstrapApp } from './bootstrap-app.factory';

/**
 * @stable [20.09.2019]
 * @param {IContainerCtor} applicationContainer
 * @param {IBootstrapEntity} bootstrapEntity
 */
export const bootstrapReactApp = <TStoreEntity>(applicationContainer: IGenericContainerCtor) => {
  const componentClass = bootstrapApp(applicationContainer);
  render(
    new componentClass({}).render() as JSX.Element, // Isomorphic componentClass
    getElementById('appId'), // TODO settings
  );
};
