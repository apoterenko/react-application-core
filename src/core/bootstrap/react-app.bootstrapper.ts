import { render } from 'react-dom';

import { addRootElement, addClassNameToBody, getElementById } from '../util';
import { DEFAULT_BOOTSTRAP_CONFIGURATION, IBootstrapConfiguration } from '../configurations-definitions.interface';
import { IContainerClassEntity } from '../entities-definitions.interface';
import { IContainerProps } from '../props-definitions.interface';
import { makeBootstrapApp } from './universal-bootstrap-app.factory';

/**
 * @stable [21.08.2019]
 * @param {IContainerClassEntity} applicationContainer
 * @param {IBootstrapConfiguration} bootstrapConfiguration
 */
export const bootstrapReactApp = <TApplicationStoreEntity>(
  applicationContainer: IContainerClassEntity,
  bootstrapConfiguration: IBootstrapConfiguration = DEFAULT_BOOTSTRAP_CONFIGURATION) => {

  const rootId = bootstrapConfiguration.rootId;
  addRootElement(rootId);
  addClassNameToBody('rac');

  const componentClass = makeBootstrapApp(applicationContainer, {}); // TODO Pass initial props
  render(
    new componentClass({}).render() as JSX.Element, // Isomorphic componentClass
    getElementById(rootId),
  );
};
