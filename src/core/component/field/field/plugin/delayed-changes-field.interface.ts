import { AnyT } from '../../../../definitions.interface';
import { IBaseComponentInternalProps } from '../../../../component/base';

export interface IDelayedChangesFieldPluginInternalProps extends IBaseComponentInternalProps {
  onDelay?: (value: AnyT) => void;
  delayTimeout?: number;
}
