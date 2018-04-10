import { IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton, lazyInject, DI_TYPES } from '../../di';
import { AnyT, IEntity } from '../../definitions.interface';
import { NotificationActionBuilder } from '../../notification';
import { ListActionBuilder } from '../../component/list';
import { FormActionBuilder } from '../../component/form';
import { RouterActionBuilder } from '../../router';
import { UserActionBuilder } from '../../user';
import { IApiEntity } from '../../entities-definitions.interface';

@provideInSingleton(BaseEffects)
export class BaseEffects<TApi> {

  @lazyInject(DI_TYPES.Api) protected api: TApi;

  protected buildNotificationErrorAction(error: string): IEffectsAction {
    return NotificationActionBuilder.buildErrorAction(error);
  }

  protected buildNotificationInfoAction(info: string): IEffectsAction {
    return NotificationActionBuilder.buildInfoAction(info);
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

  protected buildRouterNavigateAction(path: string): IEffectsAction {
    return RouterActionBuilder.buildNavigateAction(path);
  }

  protected buildUserUpdateAction(data: AnyT): IEffectsAction {
    return UserActionBuilder.buildUpdateAction(data);
  }
}
