import { IEffectsAction } from 'redux-effects-promise';

import { IApiEntity } from '../../api';
import { provideInSingleton, lazyInject, DI_TYPES } from '../../di';
import { AnyT, IKeyValue, IEntity } from '../../definition.interface';
import { NotificationActionBuilder } from '../../notification';
import { IApplicationListWrapperState, ListActionBuilder } from '../../component/list';
import { FormActionBuilder } from '../../component/form';
import { FilterActionBuilder } from '../../component/filter';
import { RouterActionBuilder } from '../../router';
import { PermissionActionBuilder } from '../../permission';
import { UserActionBuilder } from '../../user';
import { TransportActionBuilder } from '../../transport';
import { APPLICATION_SECTIONS, ApplicationActionBuilder } from '../../component/application';
import { DictionariesActionBuilder } from '../../dictionary';

@provideInSingleton(BaseEffects)
export class BaseEffects<TApi> {

  @lazyInject(DI_TYPES.Api) protected api: TApi;

  protected buildDictionariesDestroyAction(): IEffectsAction {
    return DictionariesActionBuilder.buildDestroyAction();
  }

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

  protected buildListDestroyAction(section: string): IEffectsAction {
    return ListActionBuilder.buildDestroyAction(section);
  }

  protected buildListEntityUpdateAction(section: string, apiEntity: IApiEntity<IEntity>, changes: IKeyValue): IEffectsAction {
    const id = apiEntity.id;
    return apiEntity.isNew
        ? ListActionBuilder.buildInsertAction(section, {payload: {id, changes}})
        : ListActionBuilder.buildUpdateAction(section, {payload: {id, changes}});
  }

  protected buildUntouchedListLoadAction(section: string,
                                         listWrapperState: IApplicationListWrapperState): IEffectsAction {
    return listWrapperState.list.touched ? null : this.buildListLoadAction(section);
  }

  protected buildFormLockAction(section: string): IEffectsAction {
    return FormActionBuilder.buildLockAction(section);
  }

  protected buildFormDestroyAction(section: string): IEffectsAction {
    return FormActionBuilder.buildDestroyAction(section);
  }

  protected buildFormSubmitDoneAction(section: string): IEffectsAction {
    return FormActionBuilder.buildSubmitDoneAction(section);
  }

  protected buildFormSubmitFinishedAction(section: string): IEffectsAction {
    return FormActionBuilder.buildSubmitFinishedAction(section);
  }

  protected buildFormChangeAction(section: string, data: IKeyValue): IEffectsAction {
    return FormActionBuilder.buildChangeAction(section, data);
  }

  protected buildFormChangesAction(section: string, data: IKeyValue): IEffectsAction {
    return FormActionBuilder.buildChangesAction(section, data);
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

  protected buildApplicationAfterLogoutAction(): IEffectsAction {
    return ApplicationActionBuilder.buildAfterLogoutAction();
  }

  protected buildApplicationPrepareAction(): IEffectsAction {
    return ApplicationActionBuilder.buildPrepareAction();
  }

  protected buildApplicationPrepareAfterAction(): IEffectsAction {
    return ApplicationActionBuilder.buildPrepareAfterAction();
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

  protected buildOpenListEntityActions(section: string, filterPath: string): IEffectsAction[] {
    return [
      this.buildListLockAction(section),    // Prevent the list auto destroying
      this.buildFilterLockAction(section),  // Prevent the list filter auto destroying
      this.buildRouterNavigateAction(filterPath)
    ];
  }

  protected buildContainersDestroyActions(): IEffectsAction[] {
    const sections = Array.from(APPLICATION_SECTIONS.keys());
    return sections
        .map((section0) => this.buildListDestroyAction(section0))
        .concat(sections.map((section0) => this.buildFormDestroyAction(section0)));
  }
}
