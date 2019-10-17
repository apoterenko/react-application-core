import { Store } from 'redux';
import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';
import * as R from 'ramda';

import { DI_TYPES, lazyInject } from '../di';
import {
  IEnvironment,
  ILogManagerEventPayloadFactory,
  IUniversalStoreEntity,
} from '../definition';
import { getCurrentUrlPath } from '../util';
import { IDateConverter } from '../converter';
import { AnyT } from '../definitions.interface';

@injectable()
export class LogManagerEventPayloadFactory
  implements ILogManagerEventPayloadFactory {
  private static readonly logger = LoggerFactory.makeLogger('LogManagerEventPayloadFactory');

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

    return `${R.isNil(user) || R.isNil(user.id) ? '' : `${user.id}:${user.name}:`}${
      appVersion}:${this.dc.getAppOnlineLifeTimeInHours()}:${
      this.dc.fromDateTimeToDateTime(this.dc.getCurrentDate())}:${
      browserName}:${
      browserVersion}:${
      getCurrentUrlPath()}${
      this.getEventLabel(payload)}`;
  }

  /**
   * @stable [17.10.2019]
   * @param {AnyT} payload
   * @returns {string}
   */
  protected getEventLabel(payload: AnyT): string {
    if (R.isNil(payload)) {
      return '';
    }
    try {
      return `:${JSON.stringify(payload)}`;
    } catch (e) {
      LogManagerEventPayloadFactory.logger.error(
        '[$LogManagerEventPayloadFactory][getEventLabel] The system error has occurred:',
        e
      );
    }
  }
}
