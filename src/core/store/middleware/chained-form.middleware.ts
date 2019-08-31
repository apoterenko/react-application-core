import { IEffectsAction } from 'redux-effects-promise';

import {
  FormActionBuilder,
  ListActionBuilder,
} from '../../component/action.builder';
import { IChainedFormMiddlewareConfigEntity } from '../../definition';
import { ifNotNilThanValue } from '../../util';
import { RouterActionBuilder } from '../../router';
import { StackActionBuilder } from '../stack';

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

    ...ifNotNilThanValue(
      config.nextListSection,
      // Clear previous created entity applied to the list. We cannot use destroy because "listeners"
      () => [ListActionBuilder.buildResetAction(config.nextListSection)],
      []
    ),

    ...ifNotNilThanValue(
      config.nextFormChanges,
      () => [FormActionBuilder.buildChangesAction(config.nextFormSection, config.nextFormChanges)],
      []
    ),

    ...[
      config.replaceRoute === false
        ? RouterActionBuilder.buildNavigateAction(config.nextFormRoute)
        : RouterActionBuilder.buildReplaceAction(config.nextFormRoute)
    ]
  ];
