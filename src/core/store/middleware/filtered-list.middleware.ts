import { IEffectsAction } from 'redux-effects-promise';

import { IFilteredListMiddlewareConfig } from './middleware.interface';
import { ListActionBuilder } from '../../component/list';
import { FilterActionBuilder } from '../../component/filter';

/**
 * @stable [06.07.2018]
 * @param {IFilteredListMiddlewareConfig} config
 * @returns {IEffectsAction[]}
 */
export const makeFilterManualApplyMiddleware = (config: IFilteredListMiddlewareConfig): IEffectsAction[] => {
  const {listSection, action} = config;
  return [
    FilterActionBuilder.buildActivateAction(listSection),
    FilterActionBuilder.buildChangeAction(listSection, action.data),
    ListActionBuilder.buildLoadAction(listSection)
  ];
};
