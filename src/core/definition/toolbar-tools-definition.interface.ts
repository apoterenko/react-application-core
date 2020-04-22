import {
  IActionsDisabledWrapper,
  IActionsWrapper,
  IActiveActionsWrapper,
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
  TOOLBAR_TOOLS = 'rac-toolbar-tools',
}

/**
 * @generic-entity
 * @stable [22.04.2020]
 */
export interface IGenericToolbarToolsEntity
  extends IActionsDisabledWrapper,
    IActionsWrapper<Array<IButtonProps | ToolbarToolsEnum>>,
    IActiveActionsWrapper<ToolbarToolsEnum[]>,
    ILeftContentWrapper<JSX.Element>,
    IRightContentWrapper<JSX.Element> {
}

/**
 * @wrapper-entity
 * @stable [22.04.2020]
 */
export interface IToolbarToolsWrapperEntity
  extends IToolbarToolsWrapper<IGenericToolbarToolsEntity> {
}

/**
 * @behavioral-entity
 * @stable [22.04.2020]
 */
export interface IBehavioralToolbarToolsEntity
  extends IOnDownloadFileClickWrapper,
    IOnFilterClickWrapper,
    IOnRefreshClickWrapper {
}

/**
 * @props
 * @stable [22.04.2020]
 */
export interface IToolbarToolsProps
  extends IGenericComponentProps,
    IGenericToolbarToolsEntity,
    IBehavioralToolbarToolsEntity {
}

/**
 * @configuration-entity
 * @stable [22.04.2020]
 */
export interface IToolbarToolsConfigurationEntity<TProps = IToolbarToolsProps>
  extends IToolbarToolsConfigurationWrapper<TProps> {
}

/**
 * @generic-container-entity
 * @stable [22.04.2020]
 */
export interface IGenericToolbarToolsContainerEntity<TProps = IToolbarToolsProps>
  extends IToolbarToolsConfigurationEntity<TProps>,
    IToolbarToolsWrapperEntity {
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
