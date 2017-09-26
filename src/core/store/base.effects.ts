import { IEffectsAction } from 'redux-effects-promise';

import { provide, lazyInject, DI_TYPES } from 'core/di';
import { AnyT } from 'core/definition.interface';
import { NotificationActionBuilder } from 'core/notification';
import { ListActionBuilder } from 'core/component/list';
import { FormActionBuilder } from 'core/component/form';
import { FilterActionBuilder } from 'core/component/filter';
import { RouterActionBuilder } from 'core/router';
import { PermissionActionBuilder } from 'core/permission';
import { UserActionBuilder } from 'core/user';

@provide(BaseEffects)
export class BaseEffects<TApi> {

  @lazyInject(DI_TYPES.Api) protected api: TApi;

  protected buildErrorNotificationAction(action: IEffectsAction): IEffectsAction {
    return NotificationActionBuilder.buildErrorAction(action);
  }

  protected buildListLockAction(section: string): IEffectsAction {
    return ListActionBuilder.buildLockAction(section);
  }

  protected buildFormLockAction(section: string): IEffectsAction {
    return FormActionBuilder.buildLockAction(section);
  }

  protected buildFormSubmitDoneAction(section: string): IEffectsAction {
    return FormActionBuilder.buildSubmitDoneAction(section);
  }

  protected buildFilterLockAction(section: string): IEffectsAction {
    return FilterActionBuilder.buildLockAction(section);
  }

  protected buildRouterNavigateAction(path: string): IEffectsAction {
    return RouterActionBuilder.buildNavigateAction(path);
  }

  protected buildRouterNavigateBackAction(): IEffectsAction {
    return RouterActionBuilder.buildNavigateBackAction();
  }

  protected buildPermissionAuthorizedUpdateAction(): IEffectsAction {
    return PermissionActionBuilder.buildAuthorizedUpdateAction();
  }

  protected buildPermissionPermissionsUpdateAction(data: AnyT): IEffectsAction {
    return PermissionActionBuilder.buildPermissionsUpdateAction(data);
  }

  protected buildUserUpdateAction(data: AnyT): IEffectsAction {
    return UserActionBuilder.buildUpdateAction(data);
  }
}
