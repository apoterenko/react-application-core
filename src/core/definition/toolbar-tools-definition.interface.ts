import {
  IActionsWrapper,
  IActiveToolsWrapper,
  IDisabledWrapper,
  IFullWrapper,
  ILeftContentWrapper,
  IOnDownloadFileClickWrapper,
  IOnFilterClickWrapper,
  IOnRefreshClickWrapper,
  IRightContentWrapper,
  IToolbarToolsConfigurationWrapper,
  IToolbarToolsWrapper,
} from '../definitions.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IButtonProps } from './button-definition.interface';
import { IReduxListHolderEntity } from './list-definition.interface';
import { IReduxFormHolderEntity } from './form-definition.interface';

/**
 * @stable [22.04.2020]
 */
export enum ToolbarToolsEnum {
  CLEAR,
  DOWNLOAD_FILE,
  FILTER,
  REFRESH,
}

/**
 * @classes
 * @stable [26.03.2020]
 */
export enum ToolbarToolsClassesEnum {
  FULL_TOOLBAR_TOOLS = 'rac-full-toolbar-tools',
  TOOLBAR_TOOLS = 'rac-toolbar-tools',
  TOOLBAR_TOOLS_ACTIVE_TOOL = 'rac-toolbar-tools__active-tool',
}

/**
 * @presets-entity
 * @stable [10.05.2020]
 */
export interface IPresetsToolbarToolsEntity
  extends IActionsWrapper<Array<IButtonProps | ToolbarToolsEnum>>,
    IActiveToolsWrapper<ToolbarToolsEnum[]>,
    IDisabledWrapper,
    IFullWrapper,
    ILeftContentWrapper<JSX.Element>,
    IOnDownloadFileClickWrapper,
    IOnFilterClickWrapper,
    IOnRefreshClickWrapper,
    IRightContentWrapper<JSX.Element> {
}

/**
 * @generic-entity
 * @stable [22.04.2020]
 */
export interface IGenericToolbarToolsEntity
  extends IPresetsToolbarToolsEntity {
}

/**
 * @presets-holder-entity
 * @stable [15.05.2020]
 */
export interface IPresetsHolderToolbarToolsEntity
  extends IToolbarToolsWrapper<IPresetsToolbarToolsEntity> {
}

/**
 * @props
 * @stable [22.04.2020]
 */
export interface IToolbarToolsProps
  extends IGenericComponentProps,
    IGenericToolbarToolsEntity {
}

/**
 * @configuration-holder-entity
 * @stable [15.06.2020]
 */
export interface IConfigurationHolderToolbarToolsEntity<TProps = IToolbarToolsProps>
  extends IToolbarToolsConfigurationWrapper<TProps> {
}

/**
 * @generic-container-entity
 * @stable [15.06.2020]
 */
export interface IGenericToolbarToolsContainerEntity<TProps = IToolbarToolsProps>
  extends IConfigurationHolderToolbarToolsEntity<TProps>,
    IPresetsHolderToolbarToolsEntity,
    IReduxFormHolderEntity,
    IReduxListHolderEntity {
}

/**
 * @props
 * @stable [22.04.2020]
 */
export interface IToolbarToolsContainerProps<TProps = IToolbarToolsProps>
  extends IGenericContainerProps,
    IGenericToolbarToolsContainerEntity<TProps> {
}

/**
 * @stable [11.04.2020]
 */
export const TOOLBAR_TOOLS_DOWNLOAD_FILE_ACTION_TYPE = 'toolbar.tools.download.file';
export const TOOLBAR_TOOLS_FILTER_ACTION_TYPE = 'toolbar.tools.filter';
export const TOOLBAR_TOOLS_REFRESH_ACTION_TYPE = 'toolbar.tools.refresh';
