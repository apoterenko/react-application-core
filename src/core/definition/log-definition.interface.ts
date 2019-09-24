import { AnyT } from '../definitions.interface';

/**
 * @stable [24.09.2019]
 */
export interface ILogManager {
  send(category: string, eventAction: string, payload?: AnyT): void;
}
