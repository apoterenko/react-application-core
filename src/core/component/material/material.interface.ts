import {
  AnyT,
} from '../../definitions.interface';
import { ISnackbarConfiguration } from '../snackbar';
import { INativeMaterialComponent } from '../../entities-definitions.interface';

/**
 * @stable [05.05.2018]
 */
export interface INativeMaterialComponentFactory<TNativeMaterialComponent extends INativeMaterialComponent> {
  attachTo(el: Element): TNativeMaterialComponent;
}

/**
 * @stable [22.08.2018]
 */
export interface INativeMaterialSnackbarComponent extends INativeMaterialComponent,
                                                          ISnackbarConfiguration {
  show(config: AnyT);
}
