import {
  ITransportCancelTokenEntity,
  ITransportRequestDataFactory,
  ITransportRequestEntity,
  ITransportRequestPayloadEntity,
} from '../../../definition';

/**
 * @stable [01.02.2019]
 */
export interface ITransportRequestPayloadFactory extends ITransportRequestDataFactory {
  makeRequestPayload(requestEntity: ITransportRequestEntity,
                     cancelToken?: ITransportCancelTokenEntity): ITransportRequestPayloadEntity;
}
