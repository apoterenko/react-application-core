import { FunctionT } from '../../util';
import { IBaseComponent, IBaseComponentInternalProps } from '../base';
import { INativeMaterialComponent } from '../material';
import {
  EntityIdT,
  ILabelWrapper,
  IRendererWrapper,
  IDisabledWrapper,
  IValueWrapper,
  IUseFilterWrapper,
  IRawDataWrapper,
  AnyT,
  ITplWrapper,
  IIconWrapper,
  IRenderToBodyEntity,
  IFilterPlaceholderWrapper,
  IFilterFnWrapper,
} from '../../definition.interface';

export interface IMenuInternalState {
  filter?: string;
}

export interface IMenuOptions extends IBaseComponentInternalProps,
                                      IUseFilterWrapper,
                                      IFilterFnWrapper<MenuOptionT>,
                                      IFilterPlaceholderWrapper,
                                      IRendererWrapper<MenuOptionT>,
                                      ITplWrapper<MenuOptionT>,
                                      IRenderToBodyEntity {
  options?: MenuOptionT[];
}

export interface IMenuInternalProps extends IMenuOptions {
  onSelect?(option: MenuOptionT): void;
  getAnchor?(): HTMLElement;
}

export interface INativeMaterialMenuComponent extends INativeMaterialComponent {
  open: boolean;
  show(): FunctionT;
}

export interface IMenu extends IBaseComponent<IMenuInternalProps, IMenuInternalState> {
  opened: boolean;
  show(): void;
  hide(): void;
}

export interface IMenuAction<TValue> extends ILabelWrapper,
                                             IIconWrapper,
                                             IValueWrapper<TValue>,
                                             IDisabledWrapper {
}

export interface IMenuActionsWrapper<TValue> {
  menuActions?: Array<IMenuAction<TValue>>;
}

export type MenuActionsWrapperT = IMenuActionsWrapper<AnyT>;

export type MenuActionT = IMenuAction<AnyT>;

export interface IMenuOption<TRawData> extends IMenuAction<EntityIdT>,
                                               IRawDataWrapper<TRawData> {
}

export type MenuOptionT = IMenuOption<AnyT>;
