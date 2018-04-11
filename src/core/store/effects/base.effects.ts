import { provideInSingleton, lazyInject, DI_TYPES } from '../../di';

@provideInSingleton(BaseEffects)
export class BaseEffects<TApi> {
  @lazyInject(DI_TYPES.Api) protected api: TApi;
}
