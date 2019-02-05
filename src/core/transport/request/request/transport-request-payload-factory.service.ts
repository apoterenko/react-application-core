import { injectable } from 'inversify';

import { defValuesFilter, notNilValuesFilter, notNilValuesArrayFilter, orNull } from '../../../util';
import { DI_TYPES, lazyInject } from '../../../di';
import {
  ITransportRequestEntity,
  ITransportTokenAccessor,
} from '../../transport.interface';
import { BaseTransportRequestPayloadFactory } from './base-transport-request-payload-factory.service';
import { ITransportRequestPayloadDataEntity } from './transport-request-payload-factory.interface';

@injectable()
export class TransportRequestPayloadFactory extends BaseTransportRequestPayloadFactory {

  @lazyInject(DI_TYPES.TransportTokenAccessor) private tokenAccessor: ITransportTokenAccessor;
  private id = 0;

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {ITransportRequestPayloadDataEntity}
   */
  public makeRequestPayloadData(req: ITransportRequestEntity): ITransportRequestPayloadDataEntity {
    return notNilValuesFilter<ITransportRequestPayloadDataEntity, ITransportRequestPayloadDataEntity>({
      id: this.id++,
      name: req.name,
      params: req.params && defValuesFilter(req.params),
      auth: orNull(req.noAuth !== true, () => this.tokenAccessor.token),
    });
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {string}
   */
  protected getBaseUrl(requestEntity: ITransportRequestEntity): string {
    const transportSettings = this.settings.transport;
    return requestEntity.url
      || notNilValuesArrayFilter(
        this.isBinaryData(requestEntity) ? transportSettings.binaryUrl : transportSettings.apiUrl,
        requestEntity.path
      ).join('');  // URI's segment works incorrectly with a UUID (url.segment(req.path));
  }
}
