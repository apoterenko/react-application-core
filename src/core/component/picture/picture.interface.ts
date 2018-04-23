import { IComponentEntity } from '../../entities-definitions.interface';

export interface IPictureInternalProps extends IComponentEntity {
  defaultScr?: string;
  src?: string;
}
