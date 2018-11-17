import {
  IKeyValue,
  AnyT,
} from '../../definitions.interface';
import { ISnackbarConfiguration } from '../snackbar';

/**
 * @stable [05.05.2018]
 */
export interface INativeMaterialComponentFactory<TNativeMaterialComponent extends INativeMaterialComponent> {
  attachTo(el: Element): TNativeMaterialComponent;
}

/**
 * @stable [05.05.2018]
 */
export interface INativeMaterialComponent {
  foundation_: INativeMaterialFoundation;
  destroy(): void;
}

/**
 * @stable [05.05.2018]
 */
export interface INativeMaterialFoundation extends IKeyValue {
  adapter_: INativeMaterialAdapter;
}

/**
 * @stable [15.08.2018]
 */
export interface INativeMaterialAdapter extends IKeyValue {
}

/**
 * @stable [15.08.2018]
 */
export interface INativeMaterialTabPanelComponent extends INativeMaterialComponent {
  scrollTo(x: number): void;
}

/**
 * @stable [22.08.2018]
 */
export interface INativeMaterialSnackbarComponent extends INativeMaterialComponent,
                                                          ISnackbarConfiguration {
  show(config: AnyT);
}
