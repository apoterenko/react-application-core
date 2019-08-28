import { ITransportResponseFactoryResponseEntity } from '../response';
import { ICancelableTransport, ITransportRequestEntity } from '../transport.interface';

/**
 * @stable [01.02.2019]
 */
export interface ITransportFactoryResponseEntity extends ITransportResponseFactoryResponseEntity {
}

/**
 * @stable [01.02.2019]
 */
export interface ITransportFactory extends ICancelableTransport {
  request(requestEntity: ITransportRequestEntity,
          requestPayloadHandler?: (payload: ITransportRequestEntity) => ITransportRequestEntity): Promise<ITransportFactoryResponseEntity>;
}
