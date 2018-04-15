import {
  IResolverWrapper,
  IStringSectionWrapper,
  IListSectionWrapper,
  IFormFilterSectionWrapper,
  IListRoutePathWrapper,
} from '../../definitions.interface';
import { IListWrapperEntity } from '../../entities-definitions.interface';

/* @stable - 01.04.2018 */
export interface IUntouchedListMiddlewareConfig<TApplicationState>
  extends IResolverWrapper<(state: TApplicationState) => IListWrapperEntity>,
          IStringSectionWrapper {
}

/* @stable - 01.04.2018 */
export interface IFormFilterMiddlewareConfig extends IListRoutePathWrapper,
                                                     IListSectionWrapper,
                                                     IFormFilterSectionWrapper {
}
