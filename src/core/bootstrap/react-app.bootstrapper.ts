import { render } from 'react-dom';

import {
  addClassNameToBody,
  addRootElement,
  getElementById,
} from '../util';
import { DEFAULT_BOOTSTRAP_ENTITY, IBootstrapEntity, IContainerProps } from '../definition';
import { getEnvironment } from '../di';
import { IContainerClassEntity } from '../entities-definitions.interface';
import { makeBootstrapApp } from './universal-bootstrap-app.factory';

/**
 * @stable [20.09.2019]
 * @param {IContainerClassEntity} applicationContainer
 * @param {IBootstrapEntity} bootstrapEntity
 */
export const bootstrapReactApp = <TStoreEntity>(
  applicationContainer: IContainerClassEntity,
  bootstrapEntity: IBootstrapEntity = DEFAULT_BOOTSTRAP_ENTITY) => {
  const rootId = bootstrapEntity.rootId;
  const env = getEnvironment();

  if (bootstrapEntity.applyBodyMarkup) {
    addRootElement(rootId);
  }
  addClassNameToBody(
    env.appProfile,
    ...(bootstrapEntity.applyBodyMarkup ? ['rac'] : []),
    ...(bootstrapEntity.flexEnabled ? ['rac-flex'] : [])
  );

  const componentClass = makeBootstrapApp(applicationContainer, {}); // TODO Pass initial props
  render(
    new componentClass({}).render() as JSX.Element, // Isomorphic componentClass
    getElementById(rootId),
  );
};
