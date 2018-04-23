import {
  IUniversalContainerEntity,
  IUniversalBaseContainer,
} from '../../entities-definitions.interface';

export interface IBaseContainer<TInternalProps extends IUniversalContainerEntity,
                                TInternalState>
  extends IUniversalBaseContainer<TInternalProps, TInternalState> {
}
