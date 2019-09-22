import { IDisabledWrapper, IEntityIdTWrapper } from '../../definitions.interface';
import { IComponentProps } from '../../definition';
import { IReactOnClickWrapper } from '../../react-definitions.interface';

/**
 * @stable [09.04.2019]
 */
export interface IChipProps
  extends IComponentProps,
    IDisabledWrapper,
    IEntityIdTWrapper,
    IReactOnClickWrapper {
}
