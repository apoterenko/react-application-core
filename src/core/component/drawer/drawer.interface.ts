import { INativeMaterialComponent } from '../material';
import { IComponentEntity } from '../../entities-definitions.interface';

export interface INativeMaterialDrawerComponent extends INativeMaterialComponent {
  open: boolean;
}

export interface IDrawerInternalProps extends IComponentEntity {
  opened: boolean;
}
