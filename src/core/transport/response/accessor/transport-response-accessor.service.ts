import { injectable } from 'inversify';

import { ITransportResponseFactoryResponseEntity } from '../transport-response-factory.interface';
import { ITransportResponseAccessor } from './transport-response-accessor.interface';
import { ITransportResponseEntity } from '../../transport.interface';

@injectable()
export class TransportResponseAccessor implements ITransportResponseAccessor {

  /**
   * @stable [05.02.2019]
   * @param {ITransportResponseEntity} payload
   * @returns {string}
   */
  public toToken(payload: ITransportResponseEntity): string {
    return null;
  }

  /**
   * @stable [05.02.2019]
   * @param {ITransportResponseFactoryResponseEntity} responseEntity
   * @returns {boolean}
   */
  public isAuthError(responseEntity: ITransportResponseFactoryResponseEntity): boolean {
    return false;
  }
}
