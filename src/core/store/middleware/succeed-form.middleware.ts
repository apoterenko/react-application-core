import { IEffectsAction } from 'redux-effects-promise';
import { LoggerFactory } from 'ts-smart-logger';

import { orNull, ifNotNilThanValue } from '../../util';
import { RouterActionBuilder } from '../../router';
import { IEntity } from '../../definitions.interface';
import {
  ListActionBuilder,
  FormActionBuilder,
} from '../../component/action.builder';
import { ISucceedRelatedFormMiddlewareConfig } from './middleware.interface';
import {
  IApiEntity,
  IModifyEntityPayloadWrapperEntity,
  IStoreEntity,
  ISucceedListFormMiddlewareConfigEntity,
  ISucceedRelatedFormMiddlewareConfigEntity,
} from '../../definition';
import { APPLICATION_SECTIONS } from '../../component/application/application.interface';
import { DI_TYPES, staticInjector, getTranslator, getModifyEntityPayloadFactory } from '../../di';
import { NotificationActionBuilder } from '../../notification';
import { TranslatorT } from '../../translation';
import { ISettingsEntity } from '../../settings';

const logger = LoggerFactory.makeLogger('succeed-form.middleware');

/**
 * @stable [04.10.2019]
 * @param {ISucceedRelatedFormMiddlewareConfigEntity} config
 * @returns {IEffectsAction[]}
 */
export const makeSucceedRelatedFormEntityMiddleware = (
  config: ISucceedRelatedFormMiddlewareConfigEntity = {navigateBack: true}): IEffectsAction[] => {
  const {formSection, succeedMessage, navigateBack} = config;
  return [
    navigateBack === false && formSection
      ? FormActionBuilder.buildSubmitDoneAction(formSection)
      : RouterActionBuilder.buildNavigateBackAction(),
    ...(
      succeedMessage
        ? [NotificationActionBuilder.buildInfoAction(getTranslator()(succeedMessage))]
        : []
    )
  ];
};

/**
 * @deprecated Use makeSucceedRelatedFormEntityMiddleware
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
  const payloadWrapper: IModifyEntityPayloadWrapperEntity = {payload: {id: parentEntity.id, changes}};

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
      getTranslator()(
        config.succeedMessage || staticInjector<ISettingsEntity>(DI_TYPES.Settings).messages.dataSaved
      )
    )
  ];
};

export const makeSucceedListFormMiddleware = (config: ISucceedListFormMiddlewareConfigEntity): IEffectsAction[] => {
  const {listSection, action, navigateBack, succeedMessage} = config;

  const connectorConfig = APPLICATION_SECTIONS.get(listSection); // TODO Inject
  const dynamicListRoute = orNull<string>(
    connectorConfig,
    () => connectorConfig.routeConfiguration.path
  );
  const payloadWrapper = getModifyEntityPayloadFactory().makeInstance(action);

  return [
    ListActionBuilder.buildMergeAction(listSection, payloadWrapper),
    ...(
      navigateBack !== false
        ? [RouterActionBuilder.buildReplaceAction(dynamicListRoute)]
        : []
    )
  ].concat(
    NotificationActionBuilder.buildInfoAction(
      staticInjector<TranslatorT>(DI_TYPES.Translate)(
        succeedMessage || staticInjector<ISettingsEntity>(DI_TYPES.Settings).messages.dataSaved
      )
    )
  );
};
