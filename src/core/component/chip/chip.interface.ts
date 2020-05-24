import { IDisabledWrapper, IEntityIdTWrapper, IOnClickWrapper } from '../../definitions.interface';
import { IComponentProps } from '../../definition';

/**
 * @stable [09.04.2019]
 */
export interface IChipProps
  extends IComponentProps,
    IDisabledWrapper,
    IEntityIdTWrapper,
    IOnClickWrapper {
}
