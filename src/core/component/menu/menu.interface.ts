import { FunctionT } from '../../util';
import { IBaseComponent, IBaseComponentInternalProps } from '../base';
import { INativeMaterialComponent } from '../material';
import {
  EntityIdT,
  IFilterable,
  ILabelable,
  IRenderable,
  IDisableable,
  IValueWrapper,
  IRawDatable,
  AnyT,
  ITemplateable,
} from '../../definition.interface';

export interface IMenuInternalState {
  filter?: string;
}

export interface IMenuInternalProps extends IBaseComponentInternalProps,
                                            IRenderable<MenuOptionT>,
                                            ITemplateable<MenuOptionT>,
                                            IFilterable {
  renderToBody?: boolean;
  options: MenuOptionT[];
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
  activate(index: number);
}

export interface IMenuAction<TValue> extends ILabelable,
                                             IValueWrapper<TValue>,
                                             IDisableable {
}

export interface IMenuActionsWrapper<TValue> {
  menuActions?: Array<IMenuAction<TValue>>;
}

export type MenuActionsWrapperT = IMenuActionsWrapper<AnyT>;

export type MenuActionT = IMenuAction<AnyT>;

export interface IMenuOption<TRawData> extends IMenuAction<EntityIdT>,
                                               IRawDatable<TRawData> {
}

export type MenuOptionT = IMenuOption<AnyT>;
