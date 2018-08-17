import { injectable } from 'inversify';

import {
  IApplicationTransportPayloadAnalyzer,
  ITransportErrorEntity,
} from './transport.interface';

@injectable()
export class TransportPayloadAnalyzer implements IApplicationTransportPayloadAnalyzer {

  public toToken(payload: ITransportErrorEntity): string {
    return null;
  }

  public isAuthErrorPayload(payload: ITransportErrorEntity): boolean {
    return false;
  }
}
