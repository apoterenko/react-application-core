import {
  IKeyValue,
  ICheckedWrapper,
  IActivateWrapper,
} from '../../definitions.interface';

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
  foundation_: INativeMaterialDefaultFoundation;
  listen(type: string, callback: () => void);
  unlisten(type: string, callback: () => void);
  destroy(): void;
}

/**
 * @stable [05.05.2018]
 */
export interface INativeMaterialDefaultFoundation extends IKeyValue {
  adapter_: IKeyValue;
}

/**
 * @stable [05.05.2018]
 */
export interface INativeMaterialCheckboxComponent extends INativeMaterialComponent,
                                                          ICheckedWrapper {
}

/**
 * @stable [05.05.2018]
 */
export interface INativeMaterialListItemComponent extends INativeMaterialComponent,
                                                          IActivateWrapper {
}
