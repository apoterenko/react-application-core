import { injectable } from 'inversify';

import {
  ITransportRequestDataFactory,
  ITransportRequestEntity,
} from '../../../definition';
import { IKeyValue } from '../../../definitions.interface';

@injectable()
export class TransportRequestDataFactory implements ITransportRequestDataFactory {

  /**
   * @stable [16.09.2019]
   * @param {} req
   * @returns {IKeyValue}
   */
  public makeRequestData(req: ITransportRequestEntity): IKeyValue {
    return null;
  }
}
