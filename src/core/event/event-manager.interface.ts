import { FunctionT } from '../util';

export interface IEventManager {
  add(el: any, type: string, fn: FunctionT, capturing?: boolean): void;
  remove(el: any, type: string, fn: FunctionT, capturing?: boolean): void;
  fabricate(el: any, type: string, fn: FunctionT, model?: any): void;
}
