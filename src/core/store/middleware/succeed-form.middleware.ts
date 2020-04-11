import { IEffectsAction } from 'redux-effects-promise';

import {
  getRoutePath,
  ifNotNilThanValue,
  isNavigateBackNeeded,
  nvl,
  toContainerSection,
  toListSection,
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
  ISucceedEditedListMiddlewareConfigEntity,
  ISucceedFormMiddlewareConfigEntity,
} from '../../definition';
import {
  DI_TYPES,
  getDynamicSections,
  getModifyEntityPayloadFactory,
  getSettings,
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

/**
 * @stable [11.04.2020]
 * @param {ISucceedEditedListMiddlewareConfigEntity<TState>} cfg
 * @returns {IEffectsAction[]}
 */
export const makeSucceedEditedListMiddleware =
  <TState = {}>(cfg: ISucceedEditedListMiddlewareConfigEntity<TState>): IEffectsAction[] => {
    const {
      action,
      succeedText,
    } = cfg;

    const actualListSection = toListSection(cfg);

    return [
      ListActionBuilder.buildMergeAction(
        actualListSection,
        getModifyEntityPayloadFactory().makeInstance(action)
      ),
      ...(
        isNavigateBackNeeded(cfg)
          ? [
            RouterActionBuilder.buildReplaceAction(
              getRoutePath(getDynamicSections().get(nvl(toContainerSection(cfg), actualListSection)))
            )
          ]
          : []
      ),
      ...(
        succeedText === false
          ? []
          : [
            NotificationActionBuilder.buildInfoAction(
              getTranslator()(succeedText as string || getSettings().messages.DATA_HAS_BEEN_SUCCESSFULLY_SAVED)
            )
          ]
      )
    ];
  };
