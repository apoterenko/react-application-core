import { injectable } from 'inversify';

import {
  ITransportResponseEntity,
  ITransportResponseAccessor,
} from '../../../definition';

@injectable()
export class TransportResponseAccessor implements ITransportResponseAccessor {

  /**
   * @stable [05.02.2019]
   * @param {ITransportResponseEntity} responseEntity
   * @returns {boolean}
   */
  public isAuthError(responseEntity: ITransportResponseEntity): boolean {
    return false;
  }
}
