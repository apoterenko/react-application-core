import { interfaces } from 'inversify';

import { DI_TYPES, appContainer } from '../../../../di';
import { DialogFormChangesConfirmStoreProxy } from './dialog-form-changes-confirm-store.proxy';
import { IContainer } from '../../../../definition';

/**
 * @stable [27.11.2019]
 */
appContainer.bind(DI_TYPES.DialogFormChangesConfirmStoreProxyFactory)
  .toFactory(
    (ctx: interfaces.Context) => (parent: IContainer) => new DialogFormChangesConfirmStoreProxy(parent)
  );
