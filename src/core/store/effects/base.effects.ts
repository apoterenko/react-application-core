import { injectable } from 'inversify';

import { lazyInject, DI_TYPES } from '../../di';
import {
  IOperationEntity,
  ITransport,
} from '../../definition';

@injectable()
export class BaseEffects<TApi> {
  @lazyInject(DI_TYPES.Api) protected readonly api: TApi;
  @lazyInject(DI_TYPES.Transport) protected readonly transport: ITransport;

  /**
   * @stable [19.12.2018]
   * @param {IOperationEntity} operation
   */
  protected cancelApiRequest(operation: IOperationEntity): void {
    this.transport.cancelRequest({operation});
  }
}
