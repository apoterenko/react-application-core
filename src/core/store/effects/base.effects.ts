import { IEffectsAction } from 'redux-effects-promise';

import { IApiEntity } from '../../api';
import { provideInSingleton, lazyInject, DI_TYPES } from '../../di';
import { AnyT, IEntity } from '../../definition.interface';
import { NotificationActionBuilder } from '../../notification';
import { ListActionBuilder } from '../../component/list';
import { FormActionBuilder } from '../../component/form';
import { FilterActionBuilder } from '../../component/filter';
import { RouterActionBuilder } from '../../router';
import { UserActionBuilder } from '../../user';
import { TransportActionBuilder } from '../../transport';
import { ApplicationActionBuilder } from '../../component/application';

@provideInSingleton(BaseEffects)
export class BaseEffects<TApi> {

  @lazyInject(DI_TYPES.Api) protected api: TApi;

  protected buildNotificationErrorAction(error: string): IEffectsAction {
    return NotificationActionBuilder.buildErrorAction(error);
  }

  protected buildNotificationInfoAction(info: string): IEffectsAction {
    return NotificationActionBuilder.buildInfoAction(info);
  }

  protected buildListLoadAction(section: string): IEffectsAction {
    return ListActionBuilder.buildLoadAction(section);
  }

  protected buildListDestroyAction(section: string): IEffectsAction {
    return ListActionBuilder.buildDestroyAction(section);
  }

  protected buildListEntityUpdateAction<TEntity extends IEntity>(section: string,
                                                                 apiEntity: IApiEntity<TEntity>,
                                                                 entityChanges: TEntity): IEffectsAction {
    const id = apiEntity.id;
    return apiEntity.isNew
        ? ListActionBuilder.buildInsertAction(section, {payload: {id, changes: entityChanges}})
        : ListActionBuilder.buildUpdateAction(section, {payload: {id, changes: entityChanges}});
  }

  protected buildFormSubmitDoneAction(section: string): IEffectsAction {
    return FormActionBuilder.buildSubmitDoneAction(section);
  }

  protected buildFormSubmitFinishedAction(section: string): IEffectsAction {
    return FormActionBuilder.buildSubmitFinishedAction(section);
  }

  protected buildFilterDestroyAction(section: string): IEffectsAction {
    return FilterActionBuilder.buildDestroyAction(section);
  }

  protected buildRouterNavigateAction(path: string): IEffectsAction {
    return RouterActionBuilder.buildNavigateAction(path);
  }

  protected buildApplicationAfterLogoutAction(): IEffectsAction {
    return ApplicationActionBuilder.buildAfterLogoutAction();
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

  protected buildUserUpdateAction(data: AnyT): IEffectsAction {
    return UserActionBuilder.buildUpdateAction(data);
  }
}
