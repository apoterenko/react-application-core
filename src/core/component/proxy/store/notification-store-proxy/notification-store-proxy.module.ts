import { interfaces } from 'inversify';

import {
  appContainer,
  DI_TYPES,
} from '../../../../di';
import { IGenericContainer } from '../../../../definition';
import { NotificationStoreProxy } from './notification-store.proxy';

/**
 * @stable [30.03.2020]
 */
appContainer.bind(DI_TYPES.NotificationStoreProxyFactory)
  .toFactory(
    (ctx: interfaces.Context) => (parent: IGenericContainer) => new NotificationStoreProxy(parent)
  );
