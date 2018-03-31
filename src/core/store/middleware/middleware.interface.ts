import { ListWrapperEntityResolverT } from '../../component/list';
import { IResolverWrapper, ISectionWrapper } from '../../definition.interface';
import { ApplicationStateT } from '../store.interface';

export interface IUntouchedListMiddlewareConfig<TApplicationState extends ApplicationStateT>
  extends IResolverWrapper<ListWrapperEntityResolverT<TApplicationState>>,
          ISectionWrapper {
}
