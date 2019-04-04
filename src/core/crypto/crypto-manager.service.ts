import * as CryptoJS from 'crypto-js';
import { injectable } from 'inversify';

import { AnyT, StringNumberT } from '../definitions.interface';
import { ICryptoManager } from './crypto-manager.interface';

@injectable()
export class CryptoManager implements ICryptoManager {

  /**
   * @stable [03.04.2019]
   * @param {AnyT} payload
   * @param {StringNumberT} key
   * @returns {string}
   */
  public encrypt(payload: AnyT, key: StringNumberT): string {
    return CryptoJS.AES.encrypt(payload, String(key)).toString();
  }

  /**
   * @stable [03.04.2019]
   * @param {AnyT} payload
   * @param {StringNumberT} key
   * @param {boolean} stringResult
   * @returns {AnyT}
   */
  public decrypt(payload: AnyT, key: StringNumberT, stringResult = true): AnyT {
    const decryptedBytes = CryptoJS.AES.decrypt(payload, String(key));
    return stringResult === false ? decryptedBytes : decryptedBytes.toString(CryptoJS.enc.Utf8);
  }
}
