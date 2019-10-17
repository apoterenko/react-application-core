import { AnyT } from '../definitions.interface';

/**
 * @stable [24.09.2019]
 */
export interface ILogManager {
  send(category: string, eventAction: string, payload?: AnyT): void;
}

/**
 * @stable [17.10.2019]
 */
export interface ILogManagerEventPayloadFactory {
  provideAction(category: string, eventAction: string, payload?: AnyT): string;
  provideCategory(category: string, eventAction: string, payload?: AnyT): string;
  provideLabel(category: string, eventAction: string, payload?: AnyT): string;
}
