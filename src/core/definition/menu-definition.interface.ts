import {
  EntityIdT,
  ICenteredMenuWrapper,
  IDisabledWrapper,
  IEntity,
  IFilterPlaceholderWrapper,
  IFilterWrapper,
  IHideWrapper,
  IIconWrapper,
  IIsOpenWrapper,
  IMaxCountWrapper,
  IMultiWrapper,
  IOnCloseWrapper,
  IOnFilterChangeWrapper,
  IOnSelectWrapper,
  IOpenedWrapper,
  IOptionsWrapper,
  IRawDataWrapper,
  IRemoteFilterWrapper,
  IRendererWrapper,
  IShowWrapper,
  ITplWrapper,
  IUseFilterWrapper,
  IWidthWrapper,
  IXPositionWrapper,
  IYPositionWrapper,
  StringNumberT,
} from '../definitions.interface';
import { ILabeledValueEntity } from './label-definition.interface';
import { IComponentProps } from './props-definition.interface';
import { IComponent } from './component-definition.interface';

/**
 * @stable [02.10.2019]
 */
export interface IMenuItemEntity<TEntity extends IEntity = IEntity, TValue = EntityIdT>
  extends ILabeledValueEntity<TValue>,
    IIconWrapper,
    IDisabledWrapper,
    IRawDataWrapper<TEntity> {
}

/**
 * @stable [02.10.2019]
 */
export interface IStringMenuActionEntity
  extends IMenuItemEntity<IEntity, string> {
}

/**
 * @stable [02.10.2019]
 */
export interface IMenuEntity
  extends ICenteredMenuWrapper,
    IFilterPlaceholderWrapper,
    IFilterWrapper<(valueToFilter: string, item: IMenuItemEntity) => boolean>,
    IMaxCountWrapper,
    IMultiWrapper,
    IOnCloseWrapper,
    IOnFilterChangeWrapper<(query: string) => void>,
    IOnSelectWrapper<IMenuItemEntity>,
    IOptionsWrapper<IMenuItemEntity[]>,
    IRemoteFilterWrapper,
    IRendererWrapper<IMenuItemEntity, number>,
    ITplWrapper<(item: IMenuItemEntity) => StringNumberT>,
    IUseFilterWrapper,
    IWidthWrapper<number | (() => number)>,
    IXPositionWrapper,
    IYPositionWrapper {
}

/**
 * @stable [02.10.2019]
 */
export interface IMenuProps
  extends IComponentProps,
    IMenuEntity {
}

/**
 * @stable [07.06.2018]
 */
export interface IMenuState
  extends IFilterWrapper,
    IOpenedWrapper {
}

/**
 * @stable [18.06.2019]
 */
export interface IMenu
  extends IComponent<IMenuProps, IMenuState>,
    IShowWrapper,
    IIsOpenWrapper,
    ICenteredMenuWrapper,
    IHideWrapper {
}
