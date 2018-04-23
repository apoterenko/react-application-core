import { AnyT } from '../../../../definitions.interface';
import { IComponentEntity } from '../../../../entities-definitions.interface';

export interface IDelayedChangesFieldPluginInternalProps extends IComponentEntity {
  onDelay?: (value: AnyT) => void;
  delayTimeout?: number;
}
