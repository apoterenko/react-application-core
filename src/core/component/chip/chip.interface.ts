import { IDisabledWrapper, IOnClickWrapper } from '../../definitions.interface';
import { IComponentEntity } from '../../entities-definitions.interface';

export interface IChipInternalProps extends IComponentEntity,
                                            IDisabledWrapper,
                                            IOnClickWrapper {
}
