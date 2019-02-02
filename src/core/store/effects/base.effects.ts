import { injectable } from 'inversify';

import { lazyInject, DI_TYPES } from '../../di';
import { ITransport } from '../../transport';
import { IOperationEntity } from '../../entities-definitions.interface';

@injectable()
export class BaseEffects<TApi> {
  @lazyInject(DI_TYPES.Api) protected api: TApi;
  @lazyInject(DI_TYPES.Transport) private transport: ITransport;

  /**
   * @stable [19.12.2018]
   * @param {IOperationEntity} operation
   */
  protected cancelApiRequest(operation: IOperationEntity): void {
    this.transport.cancelRequest(operation.id);
  }
}
