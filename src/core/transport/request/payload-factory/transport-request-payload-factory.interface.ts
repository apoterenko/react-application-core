import {
  ITransportRequestEntity,
  ITransportCancelTokenEntity,
} from '../../transport.interface';
import {
  EntityIdT,
  IAuthWrapper,
  IDataWrapper,
  IIdWrapper,
  IKeyValue,
  INameWrapper,
  INoAuthWrapper,
  IParamsWrapper,
  IUrlWrapper,
} from '../../../definitions.interface';
import { IBaseTransportRequestEntity } from '../../../entities-definitions.interface';

/**
 * @stable [02.02.2019]
 */
export interface ITransportRequestPayloadDataFactory {
  makeRequestPayloadData(req: ITransportRequestEntity): IKeyValue;
}

/**
 * @stable [01.02.2019]
 */
export interface ITransportRequestPayloadFactory extends ITransportRequestPayloadDataFactory {
  makeRequestPayload(requestEntity: ITransportRequestEntity,
                     cancelToken?: ITransportCancelTokenEntity): ITransportRequestPayloadEntity;
}

/**
 * @stable [02.02.2019]
 */
export interface ITransportRequestPayloadEntity
  extends IBaseTransportRequestEntity,
          IUrlWrapper,
          IDataWrapper<FormData | Blob | IKeyValue> {
  cancelToken?: string;
}

/**
 * @stable [02.02.2019]
 */
export interface ITransportRequestPayloadDataEntity
  extends INameWrapper,
          INoAuthWrapper,
          IParamsWrapper,
          IAuthWrapper,
          IIdWrapper<EntityIdT> {
}
