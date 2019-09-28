import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';
import { LoggerFactory } from 'ts-smart-logger';

import { isFn, orNull, ifNotNilThanValue } from '../../util';
import { RouterActionBuilder } from '../../router';
import { IEntity } from '../../definitions.interface';
import {
  ListActionBuilder,
  FormActionBuilder,
} from '../../component/action.builder';
import { ISucceedFormMiddlewareConfig, ISucceedRelatedFormMiddlewareConfig } from './middleware.interface';
import {
  IApiEntity,
  IStoreEntity,
} from '../../definition';
import { APPLICATION_SECTIONS } from '../../component/application/application.interface';
import { DI_TYPES, staticInjector } from '../../di';
import { IApplicationModifyEntityPayloadFactory, IModifyEntityPayloadWrapper } from '../../api';
import { NotificationActionBuilder } from '../../notification';
import { TranslatorT } from '../../translation';
import { ISettings } from '../../settings';

const logger = LoggerFactory.makeLogger('succeed-form.middleware');

/**
 * @stable [22.08.2018]
 * @param {ISucceedRelatedFormMiddlewareConfig<TEntity extends IEntity, TRelatedEntity extends IEntity>} config
 * @returns {IEffectsAction[]}
 */
export const makeSucceedRelatedFormMiddleware = <TEntity extends IEntity,
                                                 TRelatedEntity extends IEntity>(
  config: ISucceedRelatedFormMiddlewareConfig<TEntity, TRelatedEntity>): IEffectsAction[] => {
  const formSection = config.formSection;
  const apiEntity = config.action.data as IApiEntity<TRelatedEntity>;
  const parentEntity = config.getEntity(config.state);

  const relatedEntities = apiEntity.newEntity
    ? (config.getRelatedEntities(parentEntity) || []).concat(config.relatedEntity)
    : (config.getRelatedEntities(parentEntity) || []).map(
      (anotherEntity) => anotherEntity.id === config.relatedEntity.id ? config.relatedEntity : anotherEntity
    );

  const changes = config.makeRelatedChanges(relatedEntities);
  const payloadWrapper: IModifyEntityPayloadWrapper = {payload: {id: parentEntity.id, changes}};

  return [
    ...ifNotNilThanValue(
      config.listSection,
      (listSection) => (
        [
          ListActionBuilder.buildUpdateAction(listSection, payloadWrapper),
          config.navigateBack !== false
            ? RouterActionBuilder.buildNavigateBackAction()
            : FormActionBuilder.buildSubmitDoneAction(formSection)
        ]
      ),
      []
    ),
    NotificationActionBuilder.buildInfoAction(
      staticInjector<TranslatorT>(DI_TYPES.Translate)(
        config.saveMessage || staticInjector<ISettings>(DI_TYPES.Settings).messages.dataSaved
      )
    )
  ];
};

/**
 * @stable [07.07.2018]
 * @param {ISucceedFormMiddlewareConfig<TEntity extends IEntity>} config
 * @returns {IEffectsAction[]}
 */
export const makeSucceedFormMiddleware = <TEntity extends IEntity>(config: ISucceedFormMiddlewareConfig<TEntity>): IEffectsAction[] => {

  const {listSection, action, canComeBack, canUpdate, saveMessage} = config;
  const apiEntity = action.initialData as IApiEntity;

  const connectorConfig = APPLICATION_SECTIONS.get(listSection);
  const dynamicListRoute = orNull<string>(
    connectorConfig,
    () => connectorConfig.routeConfiguration.path
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
      ? [ListActionBuilder.buildMergeAction(listSection, payloadWrapper)]
      : []
  ).concat(
    R.isNil(canComeBack) || (isFn(canComeBack) ? (canComeBack as (...args) => boolean)(apiEntity, action) : canComeBack)
      ? RouterActionBuilder.buildReplaceAction(dynamicListRoute)
      : []
  ).concat(
    NotificationActionBuilder.buildInfoAction(
      staticInjector<TranslatorT>(DI_TYPES.Translate)(
        saveMessage || staticInjector<ISettings>(DI_TYPES.Settings).messages.dataSaved
      )
    )
  );
};
