import { ITransportResponseEntity } from '../../transport.interface';

export interface ITransportResponseAccessor {
  isAuthError(responseEntity: ITransportResponseEntity): boolean;
  toToken(payload: ITransportResponseEntity): string;
}
