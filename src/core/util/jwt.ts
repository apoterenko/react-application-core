import * as jwtDecode from 'jwt-decode';

import { AnyT } from '../definitions.interface';

/**
 * @stable [13.03.2020]
 * @param {string} token
 * @returns {TResult}
 */
export const decodeJwt = <TResult = AnyT>(token: string): TResult => jwtDecode(token);
