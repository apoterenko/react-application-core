import { EffectsService, IEffectsAction } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { DI_TYPES, provideInSingleton, lazyInject } from '../../di';
import { FormActionBuilder } from '../../component/form';
import { IListModifyWrapperPayload, ListActionBuilder } from '../../component/list';
import { IApiEntity } from '../../api';
import { IEntity } from '../../definition.interface';
import { IRoutes, RouterActionBuilder, toRouteOptions } from '../../router';
import { APPLICATION_SECTIONS } from '../../component/application';

const logger = LoggerFactory.makeLogger('makeSucceedFormEffectsProxy');

export function makeSucceedFormEffectsProxy(config: {
  listSection: string;
  formSection: string;
  listRoute?: string;
}): () => void {
  const {listSection, formSection, listRoute} = config;

  return (): void => {

    @provideInSingleton(Effects)
    class Effects {

      @lazyInject(DI_TYPES.Routes) private routes: IRoutes;

      @EffectsService.effects(FormActionBuilder.buildSubmitDoneActionType(formSection))
      public $onFormSubmitDone(action: IEffectsAction): IEffectsAction[] {
        const apiEntity = action.initialData as IApiEntity<IEntity>;
        const changes = action.data as IEntity;
        const id = apiEntity.id;

        const connectorConfig = APPLICATION_SECTIONS.get(listSection);
        const listRoute0 = listRoute
            || (connectorConfig ? toRouteOptions(connectorConfig.routeConfig, this.routes).path : null);

        if (!listRoute0) {
          logger.warn(`[$Effects][$onFormSubmitDone] The list route is empty for the section ${listSection}`);
        }
        const modifyWrapperPayload: IListModifyWrapperPayload = {payload: {id, changes}};
        return [
          apiEntity.isNew
              ? ListActionBuilder.buildInsertAction(listSection, modifyWrapperPayload)
              : ListActionBuilder.buildUpdateAction(listSection, modifyWrapperPayload),
          RouterActionBuilder.buildNavigateAction(listRoute0)
        ];
      }
    }
  };
}
