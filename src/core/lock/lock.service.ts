import { LoggerFactory } from 'ts-smart-logger';

import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { TranslatorT } from '../translation';
import { IEventManager } from '../event';
import { ILock } from './lock.interface';

@provideInSingleton(Lock)
export class Lock implements ILock {
  private static logger = LoggerFactory.makeLogger('Lock');

  @lazyInject(DI_TYPES.Translate) private t: TranslatorT;
  @lazyInject(DI_TYPES.EventManager) private eventManager: IEventManager;

  private locked: boolean;

  /**
   * @stable [14.06.2018]
   */
  constructor() {
    this.onBeforeUnload = this.onBeforeUnload.bind(this);
  }

  /**
   * @stable [26.05.2018]
   */
  public lock(): void {
    if (this.locked) {
      return;
    }
    window.onbeforeunload = this.onBeforeUnload;
    this.eventManager.add(window, 'beforeunload', this.onBeforeUnload);
    this.locked = true;

    Lock.logger.debug('[$Lock][lock] The app has been locked to unload.');
  }

  /**
   * @stable [26.05.2018]
   */
  public unlock(): void {
    if (!this.locked) {
      return;
    }
    window.onbeforeunload = null;
    this.eventManager.remove(window, 'beforeunload', this.onBeforeUnload);
    this.locked = false;

    Lock.logger.debug('[$Lock][lock] The app has been unlocked to unload.');
  }

  /**
   * @stable [26.05.2018]
   * @param {Event} event
   */
  private onBeforeUnload(event: Event): string {
    event.preventDefault();
    return this.t('The app is offline. Please, don\'t refresh the page!');
  }
}
