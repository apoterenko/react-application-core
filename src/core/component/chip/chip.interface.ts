import { IDisabledWrapper} from '../../definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';
import { IOnClickWrapper } from '../../react-definitions.interface';

export interface IChipInternalProps extends IComponentProps,
                                            IDisabledWrapper,
                                            IOnClickWrapper {
}
