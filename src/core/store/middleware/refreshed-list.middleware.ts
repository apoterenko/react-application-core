import { IEffectsAction } from 'redux-effects-promise';

import { orNull, toType } from '../../util';
import {
  IRefreshedListMiddlewareConfig,
  IRefreshedListOnValidFormMiddlewareConfig,
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
 * @stable [17.02.2019]
 * @param {IRefreshedListOnValidFormMiddlewareConfig} config
 * @returns {IEffectsAction[]}
 */
export const makeRefreshedListOnValidFormMiddleware = (
  config: IRefreshedListOnValidFormMiddlewareConfig): IEffectsAction[] => {
  return orNull(
    toType<IValidWrapper>(config.action.data).valid,
    () => [ListActionBuilder.buildLoadAction(config.listSection)]
  );
};
