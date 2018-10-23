import { AnyT } from '../../definitions.interface';
import {
  IVueIsContainer$Wrapper,
  VueComponentOptionsT,
  IVueCustomComputed$Wrapper,
  IVueSection$Wrapper,
  IVueForceUpdateOnChangeData$Wrapper,
} from '../../vue-definitions.interface';
import { IVueContainer, IVueApplicationStoreEntity } from '../../vue-entities-definitions.interface';

/**
 * @stable [22.10.2018]
 */
export interface IVueConnectorOptionsConfigEntity<TApplicationStoreEntity extends IVueApplicationStoreEntity = IVueApplicationStoreEntity>
  extends VueComponentOptionsT<IVueContainer<TApplicationStoreEntity>>,
          IVueIsContainer$Wrapper,
          IVueSection$Wrapper,
          IVueCustomComputed$Wrapper<Array<(state: TApplicationStoreEntity) => AnyT>>,
          IVueForceUpdateOnChangeData$Wrapper<(state: TApplicationStoreEntity) => AnyT> {
}
