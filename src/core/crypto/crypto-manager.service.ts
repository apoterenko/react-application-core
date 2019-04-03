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
    if (stringResult === false) {
      return decryptedBytes;
    }
    let decryptedValue;
    try {
      decryptedValue = decryptedBytes.toString(CryptoJS.enc.Utf8);
    } catch (e) {
      throw Error('Key is malformed!');
    }
    return decryptedValue;
  }
}
