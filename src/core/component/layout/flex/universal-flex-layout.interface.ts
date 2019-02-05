import {
  IRowWrapper,
  IFullWrapper,
  ISeparatorWrapper,
} from '../../../definitions.interface';
import { IOnClickWrapper } from '../../../react-definitions.interface';
import { IGenericFlexLayoutEntity } from '../../../definition';

/**
 * @stable [05.02.2019]
 */
export interface IVueFlexLayoutProps
  extends IGenericFlexLayoutEntity,
          IOnClickWrapper,
          ISeparatorWrapper,
          IFullWrapper,
          IRowWrapper {
}
