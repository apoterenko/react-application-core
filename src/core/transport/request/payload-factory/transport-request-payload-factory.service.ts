import { injectable } from 'inversify';
import * as R from 'ramda';

import {
  buildTransportUrl,
  coalesce,
  ifNotEmptyThanValue,
  isDef,
  isFn,
  JoinUtils,
  notNilValuesFilter,
  nvl,
  orUndef,
} from '../../../util';
import { DI_TYPES, lazyInject } from '../../../di';
import { ISettingsEntity } from '../../../settings';
import { IKeyValue } from '../../../definitions.interface';
import {
  ITransportCancelTokenEntity,
  ITransportRequestDataFactory,
  ITransportRequestEntity,
  ITransportRequestPayloadEntity,
  ITransportRequestPayloadFactory,
  ITransportSettingsEntity,
  TransportResponseTypesEnum,
} from '../../../definition';

@injectable()
export class TransportRequestPayloadFactory implements ITransportRequestPayloadFactory {
  @lazyInject(DI_TYPES.Settings) protected readonly settings: ISettingsEntity;
  @lazyInject(DI_TYPES.TransportRequestDataFactory) private readonly requestDataFactory: ITransportRequestDataFactory;

  /**
   * @stable [16.09.2019]
   */
  constructor() {
    this.getBaseUrl = this.getBaseUrl.bind(this);
    this.getData = this.getData.bind(this);
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @param {ITransportCancelTokenEntity} cancelToken
   * @returns {ITransportRequestPayloadEntity}
   */
  public makeRequestPayload(requestEntity: ITransportRequestEntity,
                            cancelToken?: ITransportCancelTokenEntity): ITransportRequestPayloadEntity {
    return notNilValuesFilter<ITransportRequestPayloadEntity, ITransportRequestPayloadEntity>({
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
   * @stable [16.09.2019]
   * @param {ITransportRequestEntity} req
   * @returns {IKeyValue}
   */
  public makeRequestData(req: ITransportRequestEntity): IKeyValue {
    return this.getRequestDataFactory(req).makeRequestData(req);
  }

  /**
   * @stable [16.09.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {string}
   */
  protected getUrl(requestEntity: ITransportRequestEntity): string {
    return isFn(requestEntity.urlFactory)
      ? requestEntity.urlFactory(requestEntity)
      : (
        buildTransportUrl({
          dataProvider: this.getData,
          dateNow: Date.now(),
          entity: requestEntity,
          settings: this.transportSettings,
          urlProvider: this.getBaseUrl,
        })
      );
  }

  /**
   * @stable [02.02.2019]
   * @param {ITransportRequestEntity} request
   * @returns {string}
   */
  protected getBaseUrl(request: ITransportRequestEntity): string {
    if (!R.isNil(request.url)) {
      return request.url;
    }
    const settings = this.settings.transport;
    const url = this.isRequestBlobData(request)
      ? nvl(settings.blobUrl, settings.apiUrl)
      : settings.apiUrl;

    return JoinUtils.join([url, request.path], ''); // URI's segment works incorrectly with a UUID (url.segment(req.path));
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
   * @stable [16.09.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {ITransportRequestDataFactory}
   */
  protected getRequestDataFactory(requestEntity: ITransportRequestEntity): ITransportRequestDataFactory {
    return nvl(requestEntity.requestDataFactory, this.requestDataFactory);
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
   * @stable [16.09.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {IKeyValue}
   */
  protected getHeaders(requestEntity: ITransportRequestEntity): IKeyValue {
    const transportSettings = this.transportSettings;
    const isBlobData = this.isRequestBlobData(requestEntity);
    const isFormData = this.isRequestFormData(requestEntity);
    let result = {
      ...requestEntity.headers,
    };
    if (isBlobData || isFormData) {
      const contentType = isBlobData
        ? transportSettings.blobDataContentType
        : transportSettings.formDataContentType;
      if (!R.isNil(contentType)) {
        result = {
          ...result,
          'Content-Type': contentType,
        };
      }
    }
    return ifNotEmptyThanValue(notNilValuesFilter(result), (value) => value);
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
   * @stable [16.09.2019]
   * @param {ITransportRequestEntity} requestEntity
   * @returns {boolean}
   */
  protected isRequestFormData(requestEntity: ITransportRequestEntity): boolean {
    return isDef(requestEntity.formData);
  }

  /**
   * @stable [15.09.2019]
   * @returns {ITransportSettingsEntity}
   */
  private get transportSettings(): ITransportSettingsEntity {
    return this.settings.transport;
  }
}
