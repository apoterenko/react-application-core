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
export interface INativeMaterialComponent extends IKeyValue {
  foundation_: INativeMaterialFoundation;
  listen(type: string, callback: () => void);
  unlisten(type: string, callback: () => void);
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

/**
 * @stable [15.08.2018]
 */
export interface INativeMaterialTabPanelComponent extends INativeMaterialComponent {
  scrollTo(x: number): void;
}
