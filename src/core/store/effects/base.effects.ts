import { injectable } from 'inversify';

import { lazyInject, DI_TYPES } from '../../di';

@injectable()
export class BaseEffects<TApi> {
  @lazyInject(DI_TYPES.Api) protected api: TApi;
}
