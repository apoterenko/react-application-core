import { IEffectsAction } from 'redux-effects-promise';

import {
  ListActionBuilder,
} from '../../component/action.builder';
import { IChainedFormMiddlewareConfigEntity } from '../../definition';
import { ConditionUtils } from '../../util';
import {
  FormActionBuilder,
  RouterActionBuilder,
  StackActionBuilder,
} from '../../action';

/**
 * @stable [28.08.2019]
 * @param {IChainedFormMiddlewareConfigEntity} config
 * @returns {IEffectsAction[]}
 */
export const makeChainedFormMiddleware = <TChanges>(config: IChainedFormMiddlewareConfigEntity<TChanges>): IEffectsAction[] =>
  [
    StackActionBuilder.buildLockAction(config.nextFormSection),

    // Need to call reset the previous form because "lock". We cannot use destroy because "listeners" + "active value"
    FormActionBuilder.buildResetAction(config.previousFormSection),

    ...ConditionUtils.ifNotNilThanValue(
      config.nextListSection,
      // Clear previous created entity applied to the list. We cannot use destroy because "listeners"
      () => [ListActionBuilder.buildResetAction(config.nextListSection)],
      []
    ),

    ...ConditionUtils.ifNotNilThanValue(
      config.nextFormChanges,
      () => [FormActionBuilder.buildChangesAction(config.nextFormSection, config.nextFormChanges)],
      []
    ),

    ...[
      config.replaceRoute === true
        ? RouterActionBuilder.buildReplaceAction(config.nextFormRoute)
        : RouterActionBuilder.buildNavigateAction(config.nextFormRoute)
    ]
  ];
