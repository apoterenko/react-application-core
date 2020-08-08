import {
  EntityIdT,
  IDelayTimeoutWrapper,
  IFilterPlaceholderWrapper,
  IFilterWrapper,
  IHeightRestrictedWrapper,
  IHideWrapper,
  IHighlightOddWrapper,
  IInlineOptionsWrapper,
  IIsOpenWrapper,
  IMaxCountWrapper,
  IMenuConfigurationWrapper,
  IMultiWrapper,
  IOnCloseWrapper,
  IOnFilterChangeWrapper,
  IOnInlineOptionCloseWrapper,
  IOnSelectWrapper,
  IOpenedWrapper,
  IOptionsWrapper,
  IProgressWrapper,
  IRemoteFilterWrapper,
  IShowWrapper,
  IUseFilterWrapper,
} from '../definitions.interface';
import {
  IGenericComponent,
  IGenericComponentProps,
} from './generic-component-definition.interface';
import { IPresetsBaseDialogEntity } from './dialog-definition.interface';
import {
  IPresetsRawDataLabeledValueEntity,
  IPresetsTemplateEntity,
} from './entity-definition.interface';
import { IPresetsBaseListItemEntity } from './list-definition.interface';

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsMenuItemEntity<TRawData = {}, TValue = EntityIdT>
  extends IPresetsBaseListItemEntity,
    IPresetsRawDataLabeledValueEntity<TRawData, TValue> {
}

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsMenuEntity
  extends IPresetsTemplateEntity,
    IDelayTimeoutWrapper,
    IFilterPlaceholderWrapper,
    IInlineOptionsWrapper<IPresetsRawDataLabeledValueEntity[]>,
    IOnInlineOptionCloseWrapper<IPresetsRawDataLabeledValueEntity>,
    IUseFilterWrapper {
}

export interface IGenericMenuEntity<TOptionEntity extends IPresetsMenuItemEntity = IPresetsMenuItemEntity>
  extends IPresetsMenuEntity,
    IPresetsBaseDialogEntity,
    IFilterWrapper<(valueToFilter: string, item: IPresetsMenuItemEntity) => boolean>,
    IHeightRestrictedWrapper,
    IHighlightOddWrapper,
    IMaxCountWrapper,
    IMultiWrapper,
    IOnCloseWrapper,
    IOnFilterChangeWrapper<(query: string) => void>,
    IOnSelectWrapper<IPresetsMenuItemEntity>,
    IOptionsWrapper<TOptionEntity[]>,
    IProgressWrapper,
    IRemoteFilterWrapper {
}

/**
 * @props
 * @stable [02.10.2019]
 */
export interface IMenuProps
  extends IGenericComponentProps,
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
  extends IGenericComponent<IMenuProps, IMenuState>,
    IShowWrapper<() => void>,
    IIsOpenWrapper,
    IHideWrapper {
}

/**
 * @default-entity
 * @stable [08.08.2020]
 */
export const DEFAULT_FILTERED_MENU_ENTITY = Object.freeze<IPresetsMenuEntity>({
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

/**
 * @classes
 * @stable [07.07.2020]
 */
export enum MenuClassesEnum {
  MENU = 'rac-menu',
  MENU_APPLY_ACTION = 'rac-menu__apply-action',
  MENU_EMPTY_MESSAGE = 'rac-menu__empty-message',
  MENU_FILTER = 'rac-menu__filter',
  MENU_HEIGHT_RESTRICTED = 'rac-menu-height-restricted',
  MENU_ICON_CLOSE = 'rac-menu__icon-close',
  MENU_INLINE_OPTIONS = 'rac-menu__inline-options',
}
