import { interfaces } from 'inversify';

import {
  appContainer,
  DI_TYPES,
} from '../../../../di';
import { IGenericContainer } from '../../../../definition';
import { ListStoreProxy } from './list-store.proxy';

/**
 * @stable [30.03.2020]
 */
appContainer.bind(DI_TYPES.ListStoreProxyFactory)
  .toFactory(
    (ctx: interfaces.Context) => (parent: IGenericContainer) => new ListStoreProxy(parent)
  );
