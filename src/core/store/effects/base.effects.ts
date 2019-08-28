import { injectable } from 'inversify';

import { lazyInject, DI_TYPES } from '../../di';
import { ITransport } from '../../transport';
import { IOperationEntity } from '../../definition';

@injectable()
export class BaseEffects<TApi> {
  @lazyInject(DI_TYPES.Api) protected readonly api: TApi;
  @lazyInject(DI_TYPES.Transport) private readonly transport: ITransport;

  /**
   * @stable [19.12.2018]
   * @param {IOperationEntity} operation
   */
  protected cancelApiRequest(operation: IOperationEntity): void {
    this.transport.cancelRequest({operation});
  }
}
