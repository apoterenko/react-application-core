import { IEffectsAction } from 'redux-effects-promise';

import {
  ChainedMiddlewarePayloadFnT,
  IChainedMiddlewareConfigEntity,
} from '../../definition';
import {
  ifNotFalseThanValue,
  isFn,
  selectPreventEffectsFromAction,
} from '../../util';
import {
  RouterActionBuilder,
  StackActionBuilder,
} from '../../action';

/**
 * @stable [19.10.2019]
 * @param {IChainedMiddlewareConfigEntity<TState, TPayload>} config
 * @returns {IEffectsAction[]}
 */
export const makeChainedMiddleware = <TPayload, TState>(
  config: IChainedMiddlewareConfigEntity<TState, TPayload>): IEffectsAction[] =>
  ifNotFalseThanValue(
    selectPreventEffectsFromAction(config.action),
    () => [
      StackActionBuilder.buildLockAction(
        isFn(config.nextSection)
          ? (config.nextSection as ChainedMiddlewarePayloadFnT<TState, TPayload>)(config.payload, config.state, config.action)
          : config.nextSection as string
      ),
      RouterActionBuilder.buildNavigateAction(
        isFn(config.path)
          ? (config.path as ChainedMiddlewarePayloadFnT<TState, TPayload>)(config.payload, config.state, config.action)
          : config.path as string
      )
    ]
  );
