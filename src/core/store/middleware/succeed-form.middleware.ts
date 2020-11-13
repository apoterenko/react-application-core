import { IEffectsAction } from 'redux-effects-promise';

import {
  ConditionUtils,
  NvlUtils,
  ObjectUtils,
  RouteUtils,
  SectionUtils,
  WrapperUtils,
} from '../../util';
import {
  FormActionBuilder,
  NotificationActionBuilder,
  RouterActionBuilder,
} from '../../action';
import { IEntity } from '../../definitions.interface';
import {
  ListActionBuilder,
} from '../../component/action.builder';
import { ISucceedRelatedFormMiddlewareConfig } from './middleware.interface';
import {
  IApiEntity,
  IFluxModifyEntity,
  ISucceedEditedListMiddlewareConfigEntity,
  ISucceedFormMiddlewareConfigEntity,
} from '../../definition';
import {
  DI_TYPES,
  DiServices,
  staticInjector,
} from '../../di';
import { ISettingsEntity } from '../../settings';

/**
 * @stable [11.04.2020]
 * @param {ISucceedFormMiddlewareConfigEntity} cfg
 * @returns {IEffectsAction[]}
 */
export const makeSucceedFormMiddleware = (cfg?: ISucceedFormMiddlewareConfigEntity): IEffectsAction[] => {
  cfg = cfg || {} as ISucceedFormMiddlewareConfigEntity;
  const {succeedText} = cfg;

  const actualFormSection = SectionUtils.asFormSection(cfg);
  return [
    ...(
      WrapperUtils.isNavigateBackNeeded(cfg) || !ObjectUtils.isObjectNotEmpty(actualFormSection)
        ? [RouterActionBuilder.buildBackAction()]
        : [FormActionBuilder.buildSubmitDoneAction(actualFormSection)]
    ),
    ...(
      succeedText === false
        ? []
        : [
          NotificationActionBuilder.buildInfoAction(
            DiServices.translator()(
              succeedText as string || DiServices.settings().messages.DATA_HAS_BEEN_SAVED_SUCCESSFULLY
            )
          )
        ]
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
  const payloadWrapper: IFluxModifyEntity = {payload: {id: parentEntity.id, changes}};

  return [
    ...ConditionUtils.ifNotNilThanValue(
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
      DiServices.translator()(
        config.succeedText || staticInjector<ISettingsEntity>(DI_TYPES.Settings).messages.dataSaved
      )
    )
  ];
};

/**
 * @stable [10.09.2020]
 * @param cfg
 */
const makeSucceedEditedListMiddleware =
  <TState = {}>(cfg: ISucceedEditedListMiddlewareConfigEntity<TState>): IEffectsAction[] => {
    const {
      action,
      path,
      succeedText,
    } = cfg;

    const actualListSection = SectionUtils.asListSection(cfg);

    return [
      ListActionBuilder.buildMergeAction(actualListSection, DiServices.modifyEntityFactory().makeInstance(action)),
      ...(
        WrapperUtils.isNavigateBackNeeded(cfg)
          ? [
            RouterActionBuilder.buildReplaceAction(
              path || RouteUtils.asRoutePath(
                DiServices.dynamicSections().get(
                  NvlUtils.nvl(SectionUtils.asContainerSection(cfg), actualListSection)
                )
              )
            )
          ]
          : []
      ),
      ...(
        succeedText === false
          ? []
          : [
            NotificationActionBuilder.buildInfoAction(
              DiServices.translator()(
                succeedText as string || DiServices.settings().messages.DATA_HAS_BEEN_SAVED_SUCCESSFULLY
              )
            )
          ]
      )
    ];
  };

/**
 * @stable [10.09.2020]
 */
export class SucceedFormMiddlewareFactories {
  public static readonly succeedEditedListMiddleware = makeSucceedEditedListMiddleware;
}
