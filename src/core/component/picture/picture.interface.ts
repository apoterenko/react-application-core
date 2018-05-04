import { IComponentEntity } from '../../entities-definitions.interface';
import { IComponentConfiguration } from '../../configurations-definitions.interface';

export interface IPictureInternalProps extends IComponentEntity,
                                               IComponentConfiguration {
  defaultScr?: string;
  src?: string;
}
