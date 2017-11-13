import { injectable } from 'inversify';

import {
  IApplicationTransportPayloadAnalyzer,
  ITransportErrorPayload,
} from './transport.interface';

@injectable()
export class TransportPayloadAnalyzer implements IApplicationTransportPayloadAnalyzer {

  public toToken(payload: ITransportErrorPayload): string {
    return null;
  }

  public isAuthErrorPayload(payload: ITransportErrorPayload): boolean {
    return false;
  }
}
