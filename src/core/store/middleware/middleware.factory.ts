import { makeChainedMiddleware } from './chained.middleware';
import { makeUntouchedListMiddleware } from './loaded-list.middleware';

/**
 * @stable [07.06.2020]
 */
export class MiddlewareFactories {
  public static readonly untouchedListMiddleware = makeUntouchedListMiddleware;
  public static readonly chainedMiddleware = makeChainedMiddleware;
}
