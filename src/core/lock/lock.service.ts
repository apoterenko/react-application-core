import { provideInSingleton, lazyInject, DI_TYPES } from '../di';
import { ApplicationTranslatorT } from '../translation';
import { IEventManager } from '../event';
import { ILock } from './lock.interface';

@provideInSingleton(Lock)
export class Lock implements ILock {
  @lazyInject(DI_TYPES.Translate) private t: ApplicationTranslatorT;
  @lazyInject(DI_TYPES.EventManager) private eventManager: IEventManager;

  /**
   * @stable [26.05.2018]
   */
  public lock(): void {
    this.unlock();

    window.onbeforeunload = this.onBeforeUnload;
    this.eventManager.add(window, 'beforeunload', this.onBeforeUnload);
  }

  /**
   * @stable [26.05.2018]
   */
  public unlock(): void {
    window.onbeforeunload = null;
    this.eventManager.remove(window, 'beforeunload', this.onBeforeUnload);
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
