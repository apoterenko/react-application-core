import * as R from 'ramda';
import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';
import { Store } from 'redux';

import { AnyT } from '../definitions.interface';
import { DI_TYPES, lazyInject } from '../di';
import { IDateConverter } from '../converter';
import {
  IEnvironment,
  ILogManager,
  IStoreEntity,
} from '../definition';
import { getCurrentUrlPath } from '../util';

@injectable()
export class LogManager implements ILogManager {
  private static readonly logger = LoggerFactory.makeLogger('LogManager');

  @lazyInject(DI_TYPES.DateConverter) private readonly dc: IDateConverter;
  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.Store) private readonly store: Store<IStoreEntity>;

  /**
   * @stable [11.08.2019]
   */
  public send(category: string,
              eventAction: string,
              payload?: AnyT): void {
    try {
      const ga = window.ga;
      if (R.isNil(ga)) {
        return;
      }

      const state = this.store.getState();
      const user = state.user;
      const appVersion = this.environment.appVersion;
      const browserName = this.environment.browserName;
      const browserVersion = this.environment.browserVersion;

      ga('send', {
        hitType: 'event',
        eventCategory: `${this.environment.host}:${category}`,
        eventAction,
        eventLabel: `${R.isNil(user) || R.isNil(user.id) ? '' : `${user.id}:${user.name}:`}${
          appVersion}:${
          this.dc.fromDateTimeToDateTime(this.dc.getCurrentDate())}:${
          browserName}:${
          browserVersion}:${
          getCurrentUrlPath()}${
          this.getEventLabel(payload)}`,
      });
    } catch (e) {
      LogManager.logger.error('[$LogManager][send] The system error has occurred:', e);
    }
  }

  /**
   * @stable [11.08.2019]
   * @param {AnyT} payload
   * @returns {string}
   */
  private getEventLabel(payload: AnyT): string {
    if (R.isNil(payload)) {
      return '';
    }
    try {
      return `:${JSON.stringify(payload)}`;
    } catch (e) {
      LogManager.logger.error('[$LogManager][getEventLabel] The system error has occurred:', e);
    }
  }
}
