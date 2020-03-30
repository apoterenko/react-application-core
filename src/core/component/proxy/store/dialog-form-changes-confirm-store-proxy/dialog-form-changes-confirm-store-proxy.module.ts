import { interfaces } from 'inversify';

import {
  appContainer,
  DI_TYPES,
} from '../../../../di';
import { DialogFormChangesConfirmStoreProxy } from './dialog-form-changes-confirm-store.proxy';
import { IGenericContainer } from '../../../../definition';

/**
 * @stable [27.11.2019]
 */
appContainer.bind(DI_TYPES.DialogFormChangesConfirmStoreProxyFactory)
  .toFactory(
    (ctx: interfaces.Context) => (parent: IGenericContainer) => new DialogFormChangesConfirmStoreProxy(parent)
  );
