import {
  IInlineWrapper,
  ISeparatorWrapper,
  ITouchedWrapper,
} from '../../../definitions.interface';
import { IFlexLayoutEntity, IComponentProps } from '../../../definition';

/**
 * @stable [23.09.2019]
 */
export interface IFlexLayoutProps
  extends IComponentProps,
    IFlexLayoutEntity,
    ISeparatorWrapper,
    ITouchedWrapper,
    IInlineWrapper {
}
