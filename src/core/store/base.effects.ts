import { EffectsAction, IEffectsAction } from 'redux-effects-promise';

import { provide, lazyInject, DI_TYPES } from 'core/di';
import { NotificationActionBuilder } from 'core/notification';
import { ListActionBuilder } from 'core/component/list';
import { FormActionBuilder } from 'core/component/form';
import { FilterActionBuilder } from 'core/component/filter';
import { RouterActionBuilder } from 'core/router';

@provide(BaseEffects)
export class BaseEffects<TApi> {

  @lazyInject(DI_TYPES.Api) protected api: TApi;

  protected buildErrorNotificationAction(action: IEffectsAction): EffectsAction {
    return NotificationActionBuilder.buildErrorAction(action);
  }

  protected buildListLockAction(section: string): EffectsAction {
    return ListActionBuilder.buildLockAction(section);
  }

  protected buildFormLockAction(section: string): EffectsAction {
    return FormActionBuilder.buildLockAction(section);
  }

  protected buildFormSubmitDoneAction(section: string): EffectsAction {
    return FormActionBuilder.buildSubmitDoneAction(section);
  }

  protected buildFilterLockAction(section: string): EffectsAction {
    return FilterActionBuilder.buildLockAction(section);
  }

  protected buildRouterNavigateAction(path: string): EffectsAction {
    return RouterActionBuilder.buildNavigateAction(path);
  }

  protected buildRouterNavigateBackAction(): EffectsAction {
    return RouterActionBuilder.buildNavigateBackAction();
  }
}
