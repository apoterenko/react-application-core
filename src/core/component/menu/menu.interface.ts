import { INativeMaterialComponent } from '../material';
import {
  IOpenWrapper,
  IShowWrapper,
  IHideFnWrapper,
  IFilterWrapper,
} from '../../definitions.interface';
import { IComponent, IMenuItemEntity } from '../../entities-definitions.interface';
import { IMenuConfiguration } from '../../configurations-definitions.interface';

/**
 * @stable [07.06.2018]
 */
export interface IMenuState extends IFilterWrapper {
}

export interface IMenuProps extends IMenuConfiguration {
  options?: IMenuItemEntity[];
  onSelect?(option: IMenuItemEntity): void;
  getAnchor?(): HTMLElement;
}

/**
 * @stable [17.05.2018]
 */
export interface INativeMaterialMenuComponent extends INativeMaterialComponent,
                                                      IOpenWrapper,
                                                      IShowWrapper {
}

export interface IMenu extends IComponent<IMenuProps, IMenuState>,
                               IShowWrapper,
                               IHideFnWrapper {
  isOpen(): boolean;
  onInputFocus(): void;
  onInputBlur(): void;
}
