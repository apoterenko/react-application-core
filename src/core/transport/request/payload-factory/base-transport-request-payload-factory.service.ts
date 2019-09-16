import { injectable } from 'inversify';
import * as URI from 'urijs';
import * as R from 'ramda';

import {
  coalesce,
  defValuesFilter,
  isDef,
  isObjectNotEmpty,
  notNilValuesFilter,
  nvl,
  orUndef,
} from '../../../util';
import { DI_TYPES, lazyInject } from '../../../di';
import {
  ITransportRequestPayloadFactory,
} from './transport-request-payload-factory.interface';
import { ISettings } from '../../../settings';
import { IKeyValue } from '../../../definitions.interface';
import {
  ITransportCancelTokenEntity,
  ITransportRequestEntity,
  ITransportRequestPayloadEntity,
  ITransportSettings,
  TransportMethodsEnum,
  TransportResponseTypesEnum,
} from '../../../definition';

@injectable()
export abstract class BaseTransportRequestPayloadFactory implements ITransportRequestPayloadFactory {
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettings;

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
        responseType: coalesce(
          orUndef(requestEntity.blobResponse === true, () => TransportResponseTypesEnum.BLOB)
        ),
      }
    );
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} req
   * @returns {IKeyValue}
   */
  public abstract makeRequestData(req: ITransportRequestEntity): IKeyValue;

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {string}
   */
  protected getUrl(requestEntity: ITransportRequestEntity): string {
    const url = new URI(this.getBaseUrl(requestEntity));
    if (requestEntity.noCache !== false
      && !(R.isNil(requestEntity.method) || [TransportMethodsEnum.POST]
        .includes(requestEntity.method as TransportMethodsEnum))) {
      url.addSearch(this.transportSettings.noCachePrefix, Date.now());
    }
    if (requestEntity.method === TransportMethodsEnum.GET) {
      const params = this.getData(requestEntity);
      if (isObjectNotEmpty(params)) {
        R.forEachObjIndexed((value, key) => url.addSearch(String(key), value), params);
      }
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
    return nvl(requestEntity.withCredentials, this.transportSettings.withCredentials);
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {string}
   */
  protected getMethod(requestEntity: ITransportRequestEntity): string {
    return nvl(requestEntity.method, this.transportSettings.method);
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {IKeyValue}
   */
  protected getData(requestEntity: ITransportRequestEntity): IKeyValue {
    return requestEntity.formData
      || requestEntity.blobData
      || this.makeRequestData(requestEntity);
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {IKeyValue}
   */
  protected getHeaders(requestEntity: ITransportRequestEntity): IKeyValue {
    const isBinaryData = this.isRequestBlobData(requestEntity);
    const isFormData = isDef(requestEntity.formData);
    const transportSettings = this.transportSettings;
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
  protected isRequestBlobData(requestEntity: ITransportRequestEntity): boolean {
    return isDef(requestEntity.blobData);
  }

  /**
   * @stable [15.09.2019]
   * @returns {ITransportSettings}
   */
  private get transportSettings(): ITransportSettings {
    return this.settings.transport;
  }
}
