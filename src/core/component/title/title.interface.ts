import { IComponentProps } from '../../props-definitions.interface';
import { IItemsWrapper, IBorderedWrapper } from '../../definitions.interface';

/**
 * @stable [19.10.2018]
 */
export interface ITitleProps
  extends IComponentProps,
    IBorderedWrapper,
    IItemsWrapper<JSX.Element> {
}
