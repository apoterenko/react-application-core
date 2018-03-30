import { IRippleInternalProps } from '../../../component/ripple';
import {
  IEntity,
} from '../../../definition.interface';
import { IListItemConfiguration } from '../../../configurations-definitions.interface';

export interface IListItemInternalProps extends IRippleInternalProps,
                                                IListItemConfiguration {
  rawData?: IEntity;
  onClick?(entity: IEntity): void;
}
