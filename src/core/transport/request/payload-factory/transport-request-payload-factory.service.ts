import { injectable } from 'inversify';

import {
  defValuesFilter,
  notNilValuesArrayFilter,
  notNilValuesFilter,
  nvl,
  orNull,
  uuid,
} from '../../../util';
import { BaseTransportRequestPayloadFactory } from './base-transport-request-payload-factory.service';
import { DI_TYPES, lazyInject } from '../../../di';
import { ITransportRequestEntity, ITransportJsonRpcRequestDataEntity } from '../../../definition';
import { ITransportTokenAccessor } from '../../transport.interface';

@injectable()
export class TransportRequestPayloadFactory extends BaseTransportRequestPayloadFactory {
  @lazyInject(DI_TYPES.TransportTokenAccessor) private readonly tokenAccessor: ITransportTokenAccessor;

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {ITransportJsonRpcRequestDataEntity}
   */
  public makeRequestData(req: ITransportRequestEntity): ITransportJsonRpcRequestDataEntity {
    return notNilValuesFilter<ITransportJsonRpcRequestDataEntity, ITransportJsonRpcRequestDataEntity>({
      id: uuid(),
      name: req.name,
      params: req.params && defValuesFilter(req.params),
      auth: orNull(req.noAuth !== true, () => this.tokenAccessor.token),
    });
  }

  /**
   * @stable [28.08.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {string}
   */
  protected getBaseUrl(requestEntity: ITransportRequestEntity): string {
    const transportSettings = this.settings.transport;
    const url = this.isRequestBlobData(requestEntity) ? transportSettings.uploadUrl : transportSettings.apiUrl;

    return nvl(
      requestEntity.url,
      notNilValuesArrayFilter(url, requestEntity.path).join('') // URI's segment works incorrectly with a UUID (url.segment(req.path));
    );
  }
}
