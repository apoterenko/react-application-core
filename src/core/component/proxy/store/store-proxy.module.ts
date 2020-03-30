import { interfaces } from 'inversify';
import {
  appContainer,
  DI_TYPES,
} from '../../../di';
import { IGenericContainer } from '../../../definition';
import { StoreProxy } from './store.proxy';

import './dialog-form-changes-confirm-store-proxy/dialog-form-changes-confirm-store-proxy.module';
import './dictionary-store-proxy/dictionary-store-proxy.module';
import './form-store-proxy/form-store-proxy.module';
import './notification-store-proxy/notification-store-proxy.module';
import './router-store-proxy/router-store-proxy.module';

/**
 * @stable [30.03.2020]
 */
appContainer.bind(DI_TYPES.StoreProxyFactory)
  .toFactory((ctx: interfaces.Context) => (parent: IGenericContainer) => new StoreProxy(parent));
