import { IEffectsAction } from 'redux-effects-promise';

import { ListActionBuilder } from '../../component/action.builder';
import { ISortedListMiddlewareConfigEntity } from '../../definition';

/**
 * @stable [18.10.2019]
 * @param {ISortedListMiddlewareConfigEntity} config
 * @returns {IEffectsAction[]}
 */
export const makeSortedListMiddleware = (config: ISortedListMiddlewareConfigEntity): IEffectsAction[] => {
  const {remoteSorter} = config;
  return remoteSorter === false
  ? null
  : [ListActionBuilder.buildLoadAction(config.listSection)];
};
