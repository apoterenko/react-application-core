import {
  AnyT,
  IAutoUnsubscribingWrapper,
  ICallbackWrapper,
  IConditionWrapper,
  IEventNameWrapper,
} from '../definitions.interface';

/**
 * @stable [17.01.2020]
 */
export enum SyntheticEmitterEventsEnum {
  REFRESH = 'refresh',
  SCROLL = 'scroll',
}

/**
 * @stable [17.01.2020]
 */
export interface IEventEmitterSubscribeEntity
  extends IAutoUnsubscribingWrapper,
    ICallbackWrapper,
    IConditionWrapper<(...args: AnyT[]) => void>,
    IEventNameWrapper {
}

/**
 * @stable [17.01.2020]
 */
export interface IEventEmitter {
  emit(event: string, ...args: AnyT[]): void;
  subscribe(cfg: IEventEmitterSubscribeEntity): () => void;
}
