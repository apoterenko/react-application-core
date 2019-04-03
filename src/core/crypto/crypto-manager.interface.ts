import { AnyT, StringNumberT } from '../definitions.interface';

export interface ICryptoManager {
  encrypt(payload: AnyT, key: StringNumberT): string;
  decrypt(payload: AnyT, key: StringNumberT, stringResult?: boolean): AnyT;
}
