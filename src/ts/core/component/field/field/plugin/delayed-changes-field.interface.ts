import { AnyT } from 'core/definition.interface';
import { IBaseComponentInternalProps } from 'core/component/base';

export interface IDelayedChangesFieldPluginInternalProps extends IBaseComponentInternalProps {
  onDelay: (value: AnyT) => void;
  delayTimeout?: number;
}
