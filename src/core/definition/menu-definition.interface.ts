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
  IMenuConfigurationWrapper,
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
 * @entity
 * @stable [02.10.2019]
 */
export interface IMenuItemStringValueEntity
  extends IMenuItemEntity<IEntity, string> {
}

/**
 * @generic-entity
 * @stable [24.01.2020]
 */
export interface IGenericMenuEntity<TOptionEntity extends IMenuItemEntity = IMenuItemEntity>
  extends IGenericBaseDialogEntity,
    IDelayTimeoutWrapper,
    IFilterPlaceholderWrapper,
    IHighlightOddWrapper,
    IMaxCountWrapper,
    IMultiWrapper,
    IOptionsWrapper<TOptionEntity[]>,
    IProgressWrapper,
    IRemoteFilterWrapper,
    IUseFilterWrapper {
}

/**
 * @behavioral-entity
 * @stable [24.01.2020]
 */
export interface IBehavioralMenuEntity
  extends IFilterWrapper<(valueToFilter: string, item: IMenuItemEntity) => boolean>,
    IOnCloseWrapper,
    IOnFilterChangeWrapper<(query: string) => void>,
    IOnSelectWrapper<IMenuItemEntity> {
}

// TODO
export interface IMenuEntity
  extends IRendererWrapper<IMenuItemEntity, number>,
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
    IGenericMenuEntity,
    IBehavioralMenuEntity {
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
 * @configuration-entity
 * @stable [25.01.2020]
 */
export interface IMenuConfigurationEntity<TProps extends IMenuProps = IMenuProps>
  extends IMenuConfigurationWrapper<TProps> {
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
