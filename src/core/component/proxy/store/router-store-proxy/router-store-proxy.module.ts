import { interfaces } from 'inversify';

import {
  appContainer,
  DI_TYPES,
} from '../../../../di';
import { IGenericContainer } from '../../../../definition';
import { RouterStoreProxy } from './router-store.proxy';

/**
 * @stable [18.12.2019]
 */
appContainer.bind(DI_TYPES.RouterStoreProxyFactory)
  .toFactory(
    (ctx: interfaces.Context) => (parent: IGenericContainer) => new RouterStoreProxy(parent)
  );
