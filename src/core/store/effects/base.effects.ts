import { injectable } from 'inversify';

import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  IFieldConverter,
  IOperationEntity,
  ITransport,
  TranslatorT,
} from '../../definition';

@injectable()
export class BaseEffects<TApi = {}> {
  @lazyInject(DI_TYPES.Api) protected readonly api: TApi;
  @lazyInject(DI_TYPES.FieldConverter) protected readonly fieldConverter: IFieldConverter;
  @lazyInject(DI_TYPES.Translate) protected readonly t: TranslatorT;
  @lazyInject(DI_TYPES.Transport) protected readonly transport: ITransport;

  /**
   * @stable [18.11.2020]
   * @param operations
   * @protected
   */
  protected cancelApiRequest(...operations: IOperationEntity[]): void {
    operations.forEach((operation) => this.transport.cancelRequest({operation}));
  }
}
