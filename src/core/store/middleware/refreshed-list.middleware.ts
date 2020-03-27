import { IEffectsAction } from 'redux-effects-promise';

import {
  IRefreshedListMiddlewareConfig,
} from './middleware.interface';
import { ListActionBuilder } from '../../component/action.builder';
import { IPayloadWrapper } from '../../definitions.interface';
import { ToolbarActionEnum } from '../../configurations-definitions.interface';

/**
 * @stable [13.09.2018]
 * @param {IRefreshedListMiddlewareConfig} config
 * @returns {IEffectsAction[]}
 */
export const makeRefreshedListMiddleware = (config: IRefreshedListMiddlewareConfig): IEffectsAction[] => {
  const payloadWrapper: IPayloadWrapper<ToolbarActionEnum> = config.action.data;

  switch (payloadWrapper.payload) {
    case ToolbarActionEnum.REFRESH_DATA:
      return [ListActionBuilder.buildLoadAction(config.listSection)];
  }
  return null;
};
