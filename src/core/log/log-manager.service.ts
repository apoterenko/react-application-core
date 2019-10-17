import * as R from 'ramda';
import { injectable } from 'inversify';
import { LoggerFactory } from 'ts-smart-logger';

import { AnyT } from '../definitions.interface';
import { DI_TYPES, lazyInject } from '../di';
import {
  IEnvironment,
  ILogManager,
  ILogManagerEventPayloadFactory,
} from '../definition';

@injectable()
export class LogManager implements ILogManager {
  private static readonly logger = LoggerFactory.makeLogger('LogManager');

  @lazyInject(DI_TYPES.Environment) private readonly environment: IEnvironment;
  @lazyInject(DI_TYPES.LogManagerEventPayloadFactory) private readonly payloadFactory: ILogManagerEventPayloadFactory;

  /**
   * @stable [11.08.2019]
   */
  public send(category: string,
              eventAction: string,
              payload?: AnyT): void {
    try {
      const ga = this.environment.window.ga;
      if (R.isNil(ga)) {
        return;
      }
      ga('send', {
        hitType: 'event',
        eventCategory: this.payloadFactory.provideCategory(category, eventAction, payload),
        eventAction: this.payloadFactory.provideAction(category, eventAction, payload),
        eventLabel: this.payloadFactory.provideLabel(category, eventAction, payload),
      });
    } catch (e) {
      LogManager.logger.error('[$LogManager][send] The system error has occurred:', e);
    }
  }
}
