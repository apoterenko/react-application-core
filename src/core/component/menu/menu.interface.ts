import { INativeMaterialComponent } from '../material';
import {
  IOpenWrapper,
  IShowWrapper,
  IHideFnWrapper,
} from '../../definitions.interface';
import { IComponent, IMenuItemEntity } from '../../entities-definitions.interface';
import { IMenuConfiguration } from '../../configurations-definitions.interface';

export interface IMenuInternalState {
  filter?: string;
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

export interface IMenu extends IComponent<IMenuProps, IMenuInternalState>,
                               IShowWrapper,
                               IHideFnWrapper {
  isOpen(): boolean;
  onCancel(): void;
  onInputFocus(): void;
  onInputBlur(): void;
}
