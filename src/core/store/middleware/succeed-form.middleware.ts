import { IEffectsAction } from 'redux-effects-promise';

import {
  ifNotNilThanValue,
  orNull,
} from '../../util';
import {
  NotificationActionBuilder,
  RouterActionBuilder,
} from '../../action';
import { IEntity } from '../../definitions.interface';
import {
  FormActionBuilder,
  ListActionBuilder,
} from '../../component/action.builder';
import { ISucceedRelatedFormMiddlewareConfig } from './middleware.interface';
import {
  IApiEntity,
  IModifyEntityPayloadWrapperEntity,
  IStoreEntity,
  ISucceedFormMiddlewareConfigEntity,
  ISucceedListFormMiddlewareConfigEntity,
  TranslatorT,
} from '../../definition';
import {
  DI_TYPES,
  getDynamicSections,
  getModifyEntityPayloadFactory,
  getTranslator,
  staticInjector,
} from '../../di';
import { ISettingsEntity } from '../../settings';

/**
 * @stable [04.10.2019]
 * @param {ISucceedFormMiddlewareConfigEntity} config
 * @returns {IEffectsAction[]}
 */
export const makeSucceedFormMiddleware =
  (config: ISucceedFormMiddlewareConfigEntity = {navigateBack: true}): IEffectsAction[] => {
  const {formSection, succeedText, navigateBack} = config;
  return [
    navigateBack === false && formSection
      ? FormActionBuilder.buildSubmitDoneAction(formSection)
      : RouterActionBuilder.buildBackAction(),
    ...(
      succeedText
        ? [NotificationActionBuilder.buildInfoAction(getTranslator()(succeedText))]
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
            ? RouterActionBuilder.buildBackAction()
            : FormActionBuilder.buildSubmitDoneAction(formSection)
        ]
      ),
      []
    ),
    NotificationActionBuilder.buildInfoAction(
      getTranslator()(
        config.succeedText || staticInjector<ISettingsEntity>(DI_TYPES.Settings).messages.dataSaved
      )
    )
  ];
};

export const makeSucceedListFormMiddleware = (config: ISucceedListFormMiddlewareConfigEntity): IEffectsAction[] => {
  const {listSection, action, navigateBack, succeedText} = config;

  const connectorConfig = getDynamicSections().get(listSection);
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
        succeedText || staticInjector<ISettingsEntity>(DI_TYPES.Settings).messages.dataSaved
      )
    )
  );
};
