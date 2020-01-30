import {
  EntityIdT,
  IDelayTimeoutWrapper,
  IDisabledWrapper,
  IEntity,
  IFilterPlaceholderWrapper,
  IFilterWrapper,
  IHeightRestrictedWrapper,
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
  IShowWrapper,
  IUseFilterWrapper,
} from '../definitions.interface';
import { IBehavioralBaseListItemEntity } from './list-definition.interface';
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
    IHeightRestrictedWrapper,
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
  extends IBehavioralBaseListItemEntity<IMenuItemEntity>,
    IFilterWrapper<(valueToFilter: string, item: IMenuItemEntity) => boolean>,
    IOnCloseWrapper,
    IOnFilterChangeWrapper<(query: string) => void>,
    IOnSelectWrapper<IMenuItemEntity> {
}

/**
 * @props
 * @stable [02.10.2019]
 */
export interface IMenuProps
  extends IComponentProps,
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
    IShowWrapper<() => void>,
    IIsOpenWrapper,
    IHideWrapper {
}

/**
 * @default-entity
 * @stable [24.01.2020]
 */
export const DEFAULT_FILTERED_MENU_ENTITY = Object.freeze<IMenuProps>({
  useFilter: true,
});

/**
 * @default-entity
 * @stable [24.01.2020]
 */
export const DEFAULT_REMOTE_FILTERED_MENU_ENTITY = Object.freeze<IMenuProps>({
  ...DEFAULT_FILTERED_MENU_ENTITY,
  remoteFilter: true,
});
