import { IEffectsAction } from 'redux-effects-promise';

import { provideInSingleton, lazyInject, DI_TYPES } from '../../di';
import { IEntity } from '../../definitions.interface';
import { IApiEntity } from '../../entities-definitions.interface';
import { ListActionBuilder } from '../../component/list';

@provideInSingleton(BaseEffects)
export class BaseEffects<TApi> {
  @lazyInject(DI_TYPES.Api) protected api: TApi;

  protected buildListEntityUpdateAction<TEntity extends IEntity>(section: string,
                                                                 apiEntity: IApiEntity<TEntity>,
                                                                 entityChanges: TEntity): IEffectsAction {
    const id = apiEntity.id;
    return apiEntity.isNew
        ? ListActionBuilder.buildInsertAction(section, {payload: {id, changes: entityChanges}})
        : ListActionBuilder.buildUpdateAction(section, {payload: {id, changes: entityChanges}});
  }
}
