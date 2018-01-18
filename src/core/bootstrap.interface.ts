import { connect, Provider } from 'react-redux';

import { ApplicationContainer } from './component/application';
import { ApplicationStateT, IApplicationState } from './store';

export interface IContainerBootstrapCtor<TContainer extends ApplicationContainer<ApplicationStateT>> {
  new (...args): TContainer;
}
