import { IBaseComponent } from '../base';
import { INativeMaterialComponent } from '../material';
import {
  EntityIdT,
  IUseFilterWrapper,
  IRawDataWrapper,
  AnyT,
  ITplWrapper,
  IRenderToBodyEntity,
  IFilterPlaceholderWrapper,
  IFilterFnWrapper,
  IBooleanOpenWrapper,
  IMenuActionEntity,
  IItemRendererWrapper,
  IItemTplWrapper,
} from '../../definitions.interface';
import { IComponentEntity } from '../../entities-definitions.interface';

export interface IMenuInternalState {
  filter?: string;
}

export interface IMenuOptions extends IComponentEntity,
                                      IUseFilterWrapper,
                                      IFilterFnWrapper<MenuOptionT>,
                                      IFilterPlaceholderWrapper,
                                      IItemRendererWrapper<MenuOptionT>,
                                      IItemTplWrapper<MenuOptionT>,
                                      IRenderToBodyEntity {
  options?: MenuOptionT[];
}

export interface IMenuInternalProps extends IMenuOptions {
  onSelect?(option: MenuOptionT): void;
  getAnchor?(): HTMLElement;
}

export interface INativeMaterialMenuComponent extends INativeMaterialComponent,
                                                      IBooleanOpenWrapper {
  show(): void;
}

export interface IMenu extends IBaseComponent<IMenuInternalProps, IMenuInternalState> {
  show(): void;
  hide(): void;
  isOpen(): boolean;
  onCancel(): void;
  onInputFocus(): void;
  onInputBlur(): void;
}

export interface IMenuActionsWrapper<TValue> {
  menuActions?: Array<IMenuActionEntity<TValue>>;
}

export type MenuActionsWrapperT = IMenuActionsWrapper<AnyT>;

export interface IMenuOption<TRawData> extends IMenuActionEntity<EntityIdT>,
                                               IRawDataWrapper<TRawData> {
}

export type MenuOptionT = IMenuOption<AnyT>;
