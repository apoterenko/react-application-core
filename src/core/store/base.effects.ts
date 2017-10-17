import { IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { AnyT } from '../definition.interface';
import { NotificationActionBuilder } from '../notification';
import { ListActionBuilder } from '../component/list';
import { FormActionBuilder } from '../component/form';
import { FilterActionBuilder } from '../component/filter';
import { RouterActionBuilder } from '../router';
import { PermissionActionBuilder } from '../permission';
import { UserActionBuilder } from '../user';
import { ApplicationActionBuilder } from '../application';
import { TransportActionBuilder } from '../transport';

@provideInSingleton(BaseEffects)
export class BaseEffects<TApi> {

  @lazyInject(DI_TYPES.Api) protected api: TApi;

  protected buildNotificationErrorAction(error: string): IEffectsAction {
    return NotificationActionBuilder.buildErrorAction(error);
  }

  protected buildNotificationInfoAction(info: string): IEffectsAction {
    return NotificationActionBuilder.buildInfoAction(info);
  }

  protected buildListLockAction(section: string): IEffectsAction {
    return ListActionBuilder.buildLockAction(section);
  }

  protected buildListLoadAction(section: string): IEffectsAction {
    return ListActionBuilder.buildLoadAction(section);
  }

  protected buildFormLockAction(section: string): IEffectsAction {
    return FormActionBuilder.buildLockAction(section);
  }

  protected buildFormSubmitDoneAction(section: string): IEffectsAction {
    return FormActionBuilder.buildSubmitDoneAction(section);
  }

  protected buildFormSubmitFinishedAction(section: string): IEffectsAction {
    return FormActionBuilder.buildSubmitFinishedAction(section);
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

  protected buildApplicationAfterInitAction(): IEffectsAction {
    return ApplicationActionBuilder.buildAfterInitAction();
  }

  protected buildApplicationReadyAction(): IEffectsAction {
    return ApplicationActionBuilder.buildReadyAction();
  }

  protected buildApplicationNotReadyAction(): IEffectsAction {
    return ApplicationActionBuilder.buildNotReadyAction();
  }

  protected buildApplicationUpdateTokenAction(): IEffectsAction {
    return ApplicationActionBuilder.buildUpdateTokenAction();
  }

  protected buildApplicationDestroyTokenAction(): IEffectsAction {
    return ApplicationActionBuilder.buildDestroyTokenAction();
  }

  protected buildTransportUpdateTokenAction(data: AnyT): IEffectsAction {
    return TransportActionBuilder.buildUpdateTokenAction(data);
  }

  protected buildTransportDestroyTokenAction(): IEffectsAction {
    return TransportActionBuilder.buildDestroyTokenAction();
  }

  protected buildPermissionUpdateAction(data: AnyT): IEffectsAction {
    return PermissionActionBuilder.buildUpdateAction(data);
  }

  protected buildUserUpdateAction(data: AnyT): IEffectsAction {
    return UserActionBuilder.buildUpdateAction(data);
  }

  protected buildPaginatedListForwardActions(section: string): IEffectsAction[] {
    return [
      ListActionBuilder.buildNextPageAction(section),
      this.buildListLoadAction(section)
    ];
  }

  protected buildPaginatedListBackwardActions(section: string): IEffectsAction[] {
    return [
      ListActionBuilder.buildPreviousPageAction(section),
      this.buildListLoadAction(section)
    ];
  }

  protected buildOpenListFilterActions(section: string, filterPath: string): IEffectsAction[] {
    return [
      this.buildListLockAction(section),    // Prevent the list auto destroying
      this.buildFilterLockAction(section),  // Prevent the list filter auto destroying
      this.buildRouterNavigateAction(filterPath)
    ];
  }
}
