import * as crossvent from 'crossvent';
import { injectable } from 'inversify';

import { IEventManager } from './event-manager.interface';

@injectable()
export class EventManager implements IEventManager {

  public add(el: any, type: string, fn: Function, capturing?: boolean): void {
    crossvent.add(el, type, fn, capturing);
  }

  public remove(el: any, type: string, fn: Function, capturing?: boolean): void {
    crossvent.remove(el, type, fn, capturing);
  }

  public fabricate(el: any, type: string, fn: Function, model?: any): void {
    crossvent.fabricate(el, type, fn, model);
  }
}
