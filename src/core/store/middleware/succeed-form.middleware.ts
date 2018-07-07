import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import { isFn, orNull } from '../../util';
import { RouterActionBuilder } from '../../router';
import { IEntity } from '../../definitions.interface';
import { ListActionBuilder } from '../../component/list';
import { ISucceedFormMiddlewareConfig } from './middleware.interface';
import { IApiEntity } from '../../entities-definitions.interface';
import { APPLICATION_SECTIONS } from '../../component/application';
import { toRouteConfiguration } from '../../router';
import { DI_TYPES, staticInjector } from '../../di';
import { IApplicationModifyEntityPayloadFactory } from '../../api';

const logger = LoggerFactory.makeLogger('succeed-form.middleware');

/**
 * @stable [07.07.2018]
 * @param {ISucceedFormMiddlewareConfig<TEntity extends IEntity>} config
 * @returns {IEffectsAction[]}
 */
export const makeSucceedFormMiddleware = <TEntity extends IEntity>(config: ISucceedFormMiddlewareConfig<TEntity>): IEffectsAction[] => {

  const {listSection, action, canComeBack, canUpdate} = config;
  const apiEntity = action.initialData as IApiEntity;

  const connectorConfig = APPLICATION_SECTIONS.get(listSection);
  const dynamicListRoute = orNull<string>(
    connectorConfig,
    () => toRouteConfiguration(connectorConfig.routeConfiguration, staticInjector(DI_TYPES.Routes)).path
  );

  if (!dynamicListRoute) {
    logger.warn(
      `[$makeSucceedFormMiddleware] The list route is empty for the section ${listSection}`
    );
  }
  const isUpdateNeeded = R.isNil(canUpdate) || (isFn(canUpdate) ? (canUpdate as (...args) => boolean)(apiEntity, action) : canUpdate);
  const payloadWrapper = isUpdateNeeded
    ? (staticInjector(DI_TYPES.ModifyEntityPayloadFactory) as IApplicationModifyEntityPayloadFactory)
        .makeInstance(action)
    : null;

  return (
    isUpdateNeeded
      ? [
        apiEntity.isNew
          ? ListActionBuilder.buildInsertAction(listSection, payloadWrapper)
          : ListActionBuilder.buildUpdateAction(listSection, payloadWrapper)
      ]
      : []
  ).concat(
    R.isNil(canComeBack) || (isFn(canComeBack) ? (canComeBack as (...args) => boolean)(apiEntity, action) : canComeBack)
      ? RouterActionBuilder.buildNavigateAction(dynamicListRoute)
      : []
  );
};
