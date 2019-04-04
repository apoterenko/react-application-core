import { AnyT, StringNumberT } from '../definitions.interface';

/**
 * @stable [04.04.2019]
 */
export interface ICryptoManager {
  encrypt(payload: AnyT, key: StringNumberT): string;
  decrypt(payload: AnyT, key: StringNumberT, stringResult?: boolean): AnyT;
}
