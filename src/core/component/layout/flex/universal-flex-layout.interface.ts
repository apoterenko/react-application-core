import {
  ISeparatorWrapper,
  ITooltipWrapper,
} from '../../../definitions.interface';
import { IReactOnClickWrapper } from '../../../react-definitions.interface';
import { IGenericFlexLayoutEntity, IGenericTooltipEntity } from '../../../definition';

// TODO
export interface IVueFlexLayoutProps
  extends IGenericFlexLayoutEntity,
    IReactOnClickWrapper,
    ISeparatorWrapper,
    ITooltipWrapper<IGenericTooltipEntity> {
}
