import { ApplicationContainer } from './component/application';
import { IApplicationStoreEntity } from './entities-definitions.interface';

export interface IContainerBootstrapCtor<TContainer extends ApplicationContainer<IApplicationStoreEntity>> {
  new (...args): TContainer;
}
