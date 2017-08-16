export interface IEventManager {
  add(el: any, type: string, fn: Function, capturing?: boolean): void;
  remove(el: any, type: string, fn: Function, capturing?: boolean): void;
  fabricate(el: any, type: string, fn: Function, model?: any): void;
}
