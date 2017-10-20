import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { IApplicationTransport } from './transport.interface';

@provideInSingleton(BaseTransport)
export class BaseTransport {

  @lazyInject(DI_TYPES.Transport) protected transport: IApplicationTransport;
}
