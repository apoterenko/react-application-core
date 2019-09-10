import {
  ISeparatorWrapper,
  ITooltipWrapper,
} from '../../../definitions.interface';
import { IFlexLayoutEntity, IGenericTooltipEntity } from '../../../definition';

// TODO
export interface IVueFlexLayoutProps
  extends IFlexLayoutEntity,
    ISeparatorWrapper,
    ITooltipWrapper<IGenericTooltipEntity> {
}
