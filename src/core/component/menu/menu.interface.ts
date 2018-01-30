import { FunctionT } from '../../util';
import { IBaseComponent, IBaseComponentInternalProps } from '../../component/base';
import { INativeMaterialComponent } from '../../component/material';
import {
  EntityIdT,
  IFilterable,
  ILabelable,
  IRenderable,
  IDisableable,
  IValueable,
  IRawDatable,
  AnyT,
  ITemplateable,
} from '../../definition.interface';

export interface IMenuInternalState {
  filter?: string;
}

export interface IMenuInternalProps extends IBaseComponentInternalProps,
                                            IRenderable<IMenuOption<AnyT>>,
                                            ITemplateable<IMenuOption<AnyT>>,
                                            IFilterable {
  options: Array<IMenuOption<AnyT>>;
  onSelect?(option: IMenuOption<AnyT>): void;
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
                                             IValueable<TValue>,
                                             IDisableable {
}

export type MenuActionT = IMenuAction<AnyT>;

export interface IMenuOption<TRawData> extends IMenuAction<EntityIdT>,
                                               IRawDatable<TRawData> {
}
