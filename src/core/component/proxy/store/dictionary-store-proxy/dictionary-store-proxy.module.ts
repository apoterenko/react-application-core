import { interfaces } from 'inversify';

import {
  appContainer,
  DI_TYPES,
} from '../../../../di';
import { IContainer } from '../../../../definition';
import { DictionaryStoreProxy } from './dictionary-store.proxy';

/**
 * @stable [11.01.2020]
 */
appContainer.bind(DI_TYPES.DictionaryStoreProxyFactory)
  .toFactory(
    (ctx: interfaces.Context) => (parent: IContainer) => new DictionaryStoreProxy(parent)
  );
