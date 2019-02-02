import { injectable } from 'inversify';

import {
  IApplicationTransportPayloadAnalyzer,
} from './transport.interface';

@injectable()
export class TransportPayloadAnalyzer implements IApplicationTransportPayloadAnalyzer {

  public toToken(payload: any): string { // TODO
    return null;
  }

  public isAuthErrorPayload(payload: any): boolean {
    return false;
  }
}
