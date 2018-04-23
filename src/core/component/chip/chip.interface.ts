import { IDisabledWrapper, IOnBaseClickWrapper } from '../../definitions.interface';
import { IComponentEntity } from '../../entities-definitions.interface';

export interface IChipInternalProps extends IComponentEntity,
                                            IDisabledWrapper,
                                            IOnBaseClickWrapper {
}
