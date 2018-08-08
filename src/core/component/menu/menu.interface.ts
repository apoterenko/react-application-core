import { INativeMaterialComponent } from '../material';
import {
  IOpenWrapper,
  IShowWrapper,
  IHideFnWrapper,
  IFilterWrapper,
  IOptionsWrapper,
} from '../../definitions.interface';
import { IComponent, IMenuItemEntity } from '../../entities-definitions.interface';
import { IMenuConfiguration } from '../../configurations-definitions.interface';

/**
 * @stable [07.06.2018]
 */
export interface IMenuState extends IFilterWrapper {
}

/**
 * @stable [31.07.2018]
 */
export interface IMenuEntity extends IOptionsWrapper<IMenuItemEntity[]> {
}

/**
 * @stable [31.07.2018]
 */
export interface IMenuProps extends IMenuConfiguration,
                                    IMenuEntity {
}

/**
 * @stable [08.09.2018]
 */
export interface INativeMaterialMenuComponent extends INativeMaterialComponent,
                                                      IOpenWrapper,
                                                      IShowWrapper {
  quickOpen?: boolean;
}

export interface IMenu extends IComponent<IMenuProps, IMenuState>,
                               IShowWrapper,
                               IHideFnWrapper {
  isOpen(): boolean;
  onInputFocus(): void;
  onInputBlur(): void;
}
