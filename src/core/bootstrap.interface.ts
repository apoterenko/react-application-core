import { ApplicationContainer } from './component/application';

export interface IContainerBootstrapCtor<TContainer extends ApplicationContainer> {
  new (...args): TContainer;
}
