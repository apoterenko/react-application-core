import { IEffectsAction } from 'redux-effects-promise';

import {
  ChainedMiddlewarePayloadFnT,
  IChainedMiddlewareConfigEntity,
} from '../../definition';
import {
  Selectors,
  TypeUtils,
} from '../../util';
import {
  RouterActionBuilder,
  StackActionBuilder,
} from '../../action';

/**
 * @stable [04.09.2020]
 * @param config
 */
export const makeChainedMiddleware =
  <TPayload, TState>(config: IChainedMiddlewareConfigEntity<TState, TPayload>): IEffectsAction[] =>
    Selectors.preventEffectsFromAction(config.action) === true
      ? []
      : (
        [
          StackActionBuilder.buildLockAction(
            TypeUtils.isFn(config.nextSection)
              ? (config.nextSection as ChainedMiddlewarePayloadFnT<TState, TPayload>)(config.payload, config.state, config.action)
              : config.nextSection as string
          ),
          RouterActionBuilder.buildNavigateAction(
            TypeUtils.isFn(config.path)
              ? (config.path as ChainedMiddlewarePayloadFnT<TState, TPayload>)(config.payload, config.state, config.action)
              : config.path as string
          )
        ]
      );
