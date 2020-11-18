import * as jwtDecode from 'jwt-decode';

/**
 * @stable [18.11.2020]
 * @param token
 */
const decodeJwt = <TResult = {}>(token: string): TResult => jwtDecode(token);

/**
 * @stable [18.11.2020]
 */
export class JwtUtils {
  public static readonly decodeJwt = decodeJwt;
}
