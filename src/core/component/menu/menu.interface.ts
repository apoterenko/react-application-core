import { INativeMaterialComponent } from '../material';
import {
  IBooleanOpenWrapper,
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

export interface INativeMaterialMenuComponent extends INativeMaterialComponent,
                                                      IBooleanOpenWrapper {
  show(): void;
}

export interface IMenu extends IComponent<IMenuProps, IMenuInternalState> {
  show(): void;
  hide(): void;
  isOpen(): boolean;
  onCancel(): void;
  onInputFocus(): void;
  onInputBlur(): void;
}
