import {
  IRowWrapper,
  ISeparatorWrapper,
} from '../../../definitions.interface';
import { IReactOnClickWrapper } from '../../../react-definitions.interface';
import { IGenericFlexLayoutEntity } from '../../../definition';

/**
 * @stable [05.02.2019]
 */
export interface IVueFlexLayoutProps
  extends IGenericFlexLayoutEntity,
          IReactOnClickWrapper,
          ISeparatorWrapper,
          IRowWrapper {
}
