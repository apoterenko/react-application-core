import {
  EntityIdT,
  IDelayTimeoutWrapper,
  IDisabledWrapper,
  IEntity,
  IFilterPlaceholderWrapper,
  IFilterWrapper,
  IHideWrapper,
  IHighlightOddWrapper,
  IIconWrapper,
  IIsOpenWrapper,
  IMaxCountWrapper,
  IMultiWrapper,
  IOnCloseWrapper,
  IOnFilterChangeWrapper,
  IOnSelectWrapper,
  IOpenedWrapper,
  IOptionsWrapper,
  IProgressWrapper,
  IRawDataWrapper,
  IRemoteFilterWrapper,
  IRendererWrapper,
  IShowWrapper,
  ITplWrapper,
  IUseFilterWrapper,
  IXPositionWrapper,
  IYPositionWrapper,
  StringNumberT,
} from '../definitions.interface';
import { IComponent } from './component-definition.interface';
import { IComponentProps } from './props-definition.interface';
import { IGenericBaseDialogEntity } from './dialog-definition.interface';
import { ILabeledValueEntity } from './entity-definition.interface';

/**
 * @entity
 * @stable [02.10.2019]
 */
export interface IMenuItemEntity<TEntity extends IEntity = IEntity, TValue = EntityIdT>
  extends IDisabledWrapper,
    IIconWrapper,
    ILabeledValueEntity<TValue>,
    IRawDataWrapper<TEntity> {
}

/**
 * @stable [02.10.2019]
 */
export interface IStringMenuActionEntity
  extends IMenuItemEntity<IEntity, string> {
}

/**
 * @stable [24.01.2020]
 */
export interface IGenericMenuEntity<TItem extends IMenuItemEntity = IMenuItemEntity>
  extends IGenericBaseDialogEntity,
    IDelayTimeoutWrapper,
    IFilterPlaceholderWrapper,
    IHighlightOddWrapper,
    IMaxCountWrapper,
    IMultiWrapper,
    IOptionsWrapper<TItem[]>,
    IProgressWrapper,
    IRemoteFilterWrapper,
    IUseFilterWrapper {
}

export interface IMenuEntity
  extends IFilterWrapper<(valueToFilter: string, item: IMenuItemEntity) => boolean>,
    IOnCloseWrapper,
    IOnFilterChangeWrapper<(query: string) => void>,
    IOnSelectWrapper<IMenuItemEntity>,
    IRendererWrapper<IMenuItemEntity, number>,
    ITplWrapper<(item: IMenuItemEntity) => StringNumberT>,
    IXPositionWrapper,
    IYPositionWrapper {
}

/**
 * @props
 * @stable [02.10.2019]
 */
export interface IMenuProps
  extends IComponentProps,
    IMenuEntity, // TODO
    IGenericMenuEntity {
}

/**
 * @state
 * @stable [07.06.2018]
 */
export interface IMenuState
  extends IFilterWrapper,
    IOpenedWrapper {
}

/**
 * @component
 * @stable [18.06.2019]
 */
export interface IMenu
  extends IComponent<IMenuProps, IMenuState>,
    IShowWrapper,
    IIsOpenWrapper,
    IHideWrapper {
}

/**
 * @default-entity
 * @stable [24.01.2020]
 */
export const DEFAULT_FILTERED_MENU_ENTITY = Object.freeze<IGenericMenuEntity>({
  useFilter: true,
});
