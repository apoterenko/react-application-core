import {
  IOpenWrapper,
  IShowWrapper,
} from '../../definitions.interface';
import { INativeMaterialComponent } from '../../entities-definitions.interface';

export interface INativeMaterialMenuComponent
  extends INativeMaterialComponent,
    IOpenWrapper,
    IShowWrapper {
  hoistMenuToBody();
}
