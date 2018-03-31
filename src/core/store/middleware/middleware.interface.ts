import { ListWrapperEntityResolverT } from '../../component/list';
import { IResolverWrapper, ISectionWrapper } from '../../definitions.interface';
import { ApplicationStateT } from '../store.interface';

export interface IUntouchedListMiddlewareConfig<TApplicationState extends ApplicationStateT>
  extends IResolverWrapper<ListWrapperEntityResolverT<TApplicationState>>,
          ISectionWrapper {
}
