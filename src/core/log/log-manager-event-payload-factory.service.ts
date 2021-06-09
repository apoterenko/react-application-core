import * as R from 'ramda';
import { Store } from 'redux';
import { injectable } from 'inversify';

import {
  DI_TYPES,
  lazyInject,
} from '../di';
import {
  IEnvironment,
  ILogManagerEventPayloadFactory,
  IUniversalStoreEntity,
} from '../definition';
import {
  getCurrentUrlPath,
  JsonUtils,
} from '../util';
import { IDateConverter } from '../converter';
import { AnyT } from '../definitions.interface';

@injectable()
export class LogManagerEventPayloadFactory implements ILogManagerEventPayloadFactory {

  @lazyInject(DI_TYPES.DateConverter) protected readonly dc: IDateConverter;
  @lazyInject(DI_TYPES.Environment) protected readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.Store) protected readonly store: Store<IUniversalStoreEntity>;

  /**
   * @stable [17.10.2019]
   * @param {string} category
   * @param {string} eventAction
   * @param {AnyT} payload
   * @returns {string}
   */
  public provideAction(category: string, eventAction: string, payload?: AnyT): string {
    return eventAction;
  }

  /**
   * @stable [17.10.2019]
   * @param {string} category
   * @param {string} eventAction
   * @param {AnyT} payload
   * @returns {string}
   */
  public provideCategory(category: string, eventAction: string, payload?: AnyT): string {
    return `${this.environment.host}:${category}`;
  }

  /**
   * @stable [17.10.2019]
   * @param {string} category
   * @param {string} eventAction
   * @param {AnyT} payload
   * @returns {string}
   */
  public provideLabel(category: string, eventAction: string, payload?: AnyT): string {
    const state = this.store.getState();
    const user = state.user;
    const appVersion = this.environment.appVersion;
    const browserName = this.environment.browserName;
    const browserVersion = this.environment.browserVersion;
    const platformType = this.environment.platformType;

    return `${R.isNil(user) || R.isNil(user.id) ? '' : `${user.id}:${user.name}:`}${
      appVersion}:${this.dc.appOnlineLifeTimeInHours}:${
      this.dc.dateAsDateTimeString({date: this.dc.getCurrentDate()})}:${
      platformType}:${
      browserName}:${
      browserVersion}:${
      getCurrentUrlPath()}${
      this.asEventLabel(payload)}`;
  }

  /**
   * @stable [07.06.2021]
   * @param payload
   */
  protected asEventLabel(payload: unknown): string {
    if (R.isNil(payload)) {
      return '[-]';
    }
    return `:${JsonUtils.serializeJson(payload)}`;
  }
}
