import { injectable } from 'inversify';

import {
  ITransportJsonRpcRequestDataEntity,
  ITransportRequestDataFactory,
  ITransportRequestEntity,
  ITransportTokenAccessor,
} from '../../../../definition';
import {
  defValuesFilter,
  ifNotEmptyThanValue,
  ifNotTrueThanValue,
  notNilValuesFilter,
  uuid,
} from '../../../../util';
import { DI_TYPES, lazyInject } from '../../../../di';

@injectable()
export class TransportJsonRpcRequestDataFactory implements ITransportRequestDataFactory {
  @lazyInject(DI_TYPES.TransportTokenAccessor) private readonly tokenAccessor: ITransportTokenAccessor;

  /**
   * @stable [16.09.2019]
   * @param {ITransportRequestEntity} req
   * @returns {ITransportJsonRpcRequestDataEntity}
   */
  public makeRequestData(req: ITransportRequestEntity): ITransportJsonRpcRequestDataEntity {
    const data = notNilValuesFilter<ITransportJsonRpcRequestDataEntity, ITransportJsonRpcRequestDataEntity>({
      name: req.name,
      params: req.params && defValuesFilter(req.params),
      auth: ifNotTrueThanValue(req.noAuth, () => this.tokenAccessor.token),
    });
    // Data with single id key, what for? Therefore, return null
    return ifNotEmptyThanValue(data, (): ITransportJsonRpcRequestDataEntity => ({...data, id: uuid()}));
  }
}
