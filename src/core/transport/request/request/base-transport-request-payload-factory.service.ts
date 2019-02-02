import { injectable } from 'inversify';
import * as URI from 'urijs';
import * as R from 'ramda';

import { defValuesFilter, isDef, notNilValuesFilter } from '../../../util';
import { DI_TYPES, lazyInject } from '../../../di';
import {
  ITransportRequestPayloadFactory,
  ITransportRequestPayloadEntity,
} from './transport-request-payload-factory.interface';
import {
  ITransportCancelTokenEntity,
  ITransportRequestEntity,
} from '../../transport.interface';
import { ISettings } from '../../../settings';
import { IKeyValue } from '../../../definitions.interface';

@injectable()
export abstract class BaseTransportRequestPayloadFactory implements ITransportRequestPayloadFactory {
  @lazyInject(DI_TYPES.Settings) protected settings: ISettings;

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @param {ITransportCancelTokenEntity} cancelToken
   * @returns {ITransportRequestPayloadEntity}
   */
  public makeRequestPayload(requestEntity: ITransportRequestEntity,
                            cancelToken?: ITransportCancelTokenEntity): ITransportRequestPayloadEntity {
    return defValuesFilter<ITransportRequestPayloadEntity, ITransportRequestPayloadEntity>({
        url: this.getUrl(requestEntity),
        headers: this.getHeaders(requestEntity),
        method: this.getMethod(requestEntity),
        data: this.getData(requestEntity),
        cancelToken: cancelToken && cancelToken.token,
        withCredentials: this.getWithCredentials(requestEntity),
      }
    );
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {IKeyValue}
   */
  public abstract makeRequestPayloadData(req: ITransportRequestEntity): IKeyValue;

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {string}
   */
  protected getUrl(requestEntity: ITransportRequestEntity): string {
    const transportSettings = this.settings.transport;
    const url = new URI(this.getBaseUrl(requestEntity));
    if (requestEntity.noCache !== true
      && !(R.isNil(requestEntity.method) || ['post'].includes(requestEntity.method))) {
      url.addSearch(transportSettings.noCachePrefix, Date.now());
    }
    return url.valueOf();
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {string}
   */
  protected getBaseUrl(requestEntity: ITransportRequestEntity): string {
    return requestEntity.url;
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {boolean}
   */
  protected getWithCredentials(requestEntity: ITransportRequestEntity): boolean {
    return requestEntity.withCredentials || this.settings.transport.withCredentials;
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {string}
   */
  protected getMethod(requestEntity: ITransportRequestEntity): string {
    return requestEntity.method || this.settings.transport.method;
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {IKeyValue}
   */
  protected getData(requestEntity: ITransportRequestEntity): IKeyValue {
    return requestEntity.formData
      || requestEntity.blob
      || this.makeRequestPayloadData(requestEntity);
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {IKeyValue}
   */
  protected getHeaders(requestEntity: ITransportRequestEntity): IKeyValue {
    const isBinaryData = this.isBinaryData(requestEntity);
    const isFormData = isDef(requestEntity.formData);
    const transportSettings = this.settings.transport;
    const result = {
      ...requestEntity.headers,
    };
    if (isBinaryData || isFormData) {
      return notNilValuesFilter({
        'Content-Type': isBinaryData
          ? transportSettings.binaryContentType
          : transportSettings.formDataContentType,
        ...requestEntity.headers,
      });
    }
    return notNilValuesFilter(result);
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {boolean}
   */
  protected isBinaryData(requestEntity: ITransportRequestEntity): boolean {
    return isDef(requestEntity.blob);
  }
}
