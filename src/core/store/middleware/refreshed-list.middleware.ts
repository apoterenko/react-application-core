import { IEffectsAction } from 'redux-effects-promise';

import {
  IRefreshedListMiddlewareConfig,
  IRefreshedListOnChangeFormMiddlewareConfig,
} from './middleware.interface';
import { ListActionBuilder } from '../../component/action.builder';
import { IPayloadWrapper, IValidWrapper } from '../../definitions.interface';
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

/**
 * @stable [16.10.2018]
 * @param {IRefreshedListOnChangeFormMiddlewareConfig} config
 * @returns {IEffectsAction[]}
 */
export const makeRefreshedListOnChangeFormMiddleware = (
  config: IRefreshedListOnChangeFormMiddlewareConfig): IEffectsAction[] => {
  const validWrapper: IValidWrapper = config.action.data;
  return validWrapper.valid
    ? [ListActionBuilder.buildLoadAction(config.listSection)]
    : null;
};
