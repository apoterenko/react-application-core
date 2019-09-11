import { AnyT } from '../definitions.interface';

/**
 * @stable [11.08.2019]
 */
export interface ILogManager {
  send(category: string, eventAction: string, payload?: AnyT): void;
}
