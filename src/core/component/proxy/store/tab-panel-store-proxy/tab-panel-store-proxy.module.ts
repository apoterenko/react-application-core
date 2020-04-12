import { interfaces } from 'inversify';

import {
  appContainer,
  DI_TYPES,
} from '../../../../di';
import { IGenericContainer } from '../../../../definition';
import { TabPanelStoreProxy } from './tab-panel-store.proxy';

/**
 * @stable [30.03.2020]
 */
appContainer.bind(DI_TYPES.TabPanelStoreProxyFactory)
  .toFactory(
    (ctx: interfaces.Context) => (parent: IGenericContainer) => new TabPanelStoreProxy(parent)
  );
