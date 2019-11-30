import { IEffectsAction } from 'redux-effects-promise';

import { NotificationActionBuilder } from '../../notification';
import {
  INotificationErrorMiddlewareConfigEntity,
  INotificationInfoMiddlewareConfigEntity,
} from '../../definition';

/**
 * @stable [29.11.2019]
 * @param {INotificationErrorMiddlewareConfigEntity} config
 * @returns {IEffectsAction[]}
 */
export const makeNotificationErrorMiddleware = (config: INotificationErrorMiddlewareConfigEntity): IEffectsAction[] =>
  [
    NotificationActionBuilder.buildErrorAction(config.error || (config.action && config.action.error))
  ];

/**
 * @stable [29.11.2019]
 * @param {INotificationInfoMiddlewareConfigEntity} config
 * @returns {IEffectsAction[]}
 */
export const makeNotificationInfoMiddleware = (config: INotificationInfoMiddlewareConfigEntity): IEffectsAction[] =>
  [
    NotificationActionBuilder.buildInfoAction(config.message || (config.action && config.action.data))
  ];
