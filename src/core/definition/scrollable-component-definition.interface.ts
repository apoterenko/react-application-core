import { IComponentProps } from './props-definition.interface';
import { IOnScrollWrapper } from '../definitions.interface';
import { IXYEntity } from './xy-definition.interface';

/**
 * @stable [24.10.2019]
 */
export interface IScrollableComponentProps
  extends IComponentProps,
    IOnScrollWrapper<IXYEntity> {
}
