import { IComponentProps } from './props-definition.interface';
import {
  ISelectedElementEntity,
  IStickyEntity,
} from '../definition';

/**
 * @stable [23.10.2019]
 */
export interface IMainProps
  extends IComponentProps,
    ISelectedElementEntity,
    IStickyEntity {
}
