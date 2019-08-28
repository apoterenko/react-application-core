import { injectable } from 'inversify';

import {
  defValuesFilter,
  notNilValuesArrayFilter,
  notNilValuesFilter,
  nvl,
  orNull,
  uuid,
} from '../../../util';
import { DI_TYPES, lazyInject } from '../../../di';
import {
  ITransportRequestEntity,
  ITransportTokenAccessor,
} from '../../transport.interface';
import { BaseTransportRequestPayloadFactory } from './base-transport-request-payload-factory.service';
import { ITransportRequestPayloadDataEntity } from './transport-request-payload-factory.interface';

@injectable()
export class TransportRequestPayloadFactory extends BaseTransportRequestPayloadFactory {
  @lazyInject(DI_TYPES.TransportTokenAccessor) private readonly tokenAccessor: ITransportTokenAccessor;

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {ITransportRequestPayloadDataEntity}
   */
  public makeRequestPayloadData(req: ITransportRequestEntity): ITransportRequestPayloadDataEntity {
    return notNilValuesFilter<ITransportRequestPayloadDataEntity, ITransportRequestPayloadDataEntity>({
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
    const url = this.isBinaryData(requestEntity) ? transportSettings.binaryUrl : transportSettings.apiUrl;

    return nvl(
      requestEntity.url,
      notNilValuesArrayFilter(url, requestEntity.path).join('') // URI's segment works incorrectly with a UUID (url.segment(req.path));
    );
  }
}
