import { IEffectsAction } from 'redux-effects-promise';

import {
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
import {
  ListActionBuilder,
} from '../../component/action.builder';
import {
  ISucceedEditedListMiddlewareConfigEntity,
  ISucceedFormMiddlewareConfigEntity,
} from '../../definition';
import { DiServices } from '../../di';

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
