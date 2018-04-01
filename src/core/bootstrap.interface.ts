import { connect, Provider } from 'react-redux';

import { ApplicationContainer } from './component/application';
import { IDefaultApplicationState } from './store';

export interface IContainerBootstrapCtor<TContainer extends ApplicationContainer<IDefaultApplicationState>> {
  new (...args): TContainer;
}
