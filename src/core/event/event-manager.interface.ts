import { AnyT } from '../definitions.interface';

export interface IEventManager {
  add(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): void;
  remove(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): void;
  fabricate(el: EventTarget, type: string, callback: (...args) => void, model?: AnyT): void;
  subscribe(el: EventTarget, type: string, callback: (...args) => void, capturing?: boolean): () => void;
}
