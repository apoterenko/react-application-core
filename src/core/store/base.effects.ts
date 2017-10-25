import { IEffectsAction } from 'redux-effects-promise';

import { applySection } from '../util';
import { IApiEntity } from '../api';
import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { AnyT, IKeyValue, IEntity } from '../definition.interface';
import { NotificationActionBuilder } from '../notification';
import { ListActionBuilder } from '../component/list';
import { FormActionBuilder } from '../component/form';
import { FilterActionBuilder } from '../component/filter';
import { RouterActionBuilder } from '../router';
import { PermissionActionBuilder } from '../permission';
import { UserActionBuilder } from '../user';
import { TransportActionBuilder } from '../transport';
import { ApplicationActionBuilder } from '../component/application';

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

  protected buildListEntityUpdateAction(section: string, apiEntity: IApiEntity<IEntity>, changes: IKeyValue): IEffectsAction {
    const id = apiEntity.id;
    return apiEntity.isNew
        ? ListActionBuilder.buildInsertAction(section, {payload: {id, changes}})
        : ListActionBuilder.buildUpdateAction(section, {payload: {id, changes}});
  }

  protected buildFormLockAction(section: string): IEffectsAction {
    return FormActionBuilder.buildLockAction(section);
  }

  protected buildFormSubmitDoneAction(section: string): IEffectsAction {
    return FormActionBuilder.buildSubmitDoneAction(section, applySection(section));
  }

  protected buildFormSubmitFinishedAction(section: string): IEffectsAction {
    return FormActionBuilder.buildSubmitFinishedAction(section);
  }

  protected buildFormChangeAction(section: string, data: IKeyValue): IEffectsAction {
    return FormActionBuilder.buildChangeAction(section, applySection(section, data));
  }

  protected buildFormChangesAction(section: string, data: IKeyValue): IEffectsAction {
    return FormActionBuilder.buildChangesAction(section, applySection(section, data));
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

  protected buildApplicationReadyAction(): IEffectsAction {
    return ApplicationActionBuilder.buildReadyAction();
  }

  protected buildApplicationPrepareAction(): IEffectsAction {
    return ApplicationActionBuilder.buildPrepareAction();
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

  protected buildPaginatedListNextActions(section: string): IEffectsAction[] {
    return [
      ListActionBuilder.buildNextPageAction(section),
      this.buildListLoadAction(section)
    ];
  }

  protected buildPaginatedListPreviousActions(section: string): IEffectsAction[] {
    return [
      ListActionBuilder.buildPreviousPageAction(section),
      this.buildListLoadAction(section)
    ];
  }

  protected buildPaginatedListLastActions(section: string): IEffectsAction[] {
    return [
      ListActionBuilder.buildLastPageAction(section),
      this.buildListLoadAction(section)
    ];
  }

  protected buildPaginatedListFirstActions(section: string): IEffectsAction[] {
    return [
      ListActionBuilder.buildFirstPageAction(section),
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
