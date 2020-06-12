import { IReduxXYEntity } from './xy-definition.interface';
import {
  IExpandedGroupsWrapper,
  ILayoutWrapper,
  IModeWrapper,
  ITopTitleWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
/**
 * @enum
 * @stable [08.05.2020]
 */
export enum LayoutModesEnum {
  FULL,
  MINIMAL,
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxLayoutEntity
  extends IExpandedGroupsWrapper<{}>,
    IModeWrapper<LayoutModesEnum>,
    IReduxXYEntity {
}

/**
 * @redux-holder-entity
 * @stable [21.05.2020]
 */
export interface IReduxHolderLayoutEntity<TEntity = IReduxLayoutEntity>
  extends ILayoutWrapper<TEntity> {
}

/**
 * @presets-entity
 * @stable [27.05.2020]
 */
export interface IPresetsFormLayoutEntity
  extends ITopTitleWrapper {
}

/**
 * @generic-entity
 * @stable [27.05.2020]
 */
export interface IGenericFormLayoutEntity
  extends IPresetsFormLayoutEntity {
}

/**
 * @props
 * @stable [13.02.2020]
 */
export interface IFormLayoutProps
  extends IGenericComponentProps,
    IGenericFormLayoutEntity {
}

/**
 * @enum
 * @stable [28.09.2019]
 */
export enum LayoutGroupsValuesEnum {
  HOME = 'home',
}

/**
 * @initial-redux-entity
 * @stable [08.05.2020]
 */
export const INITIAL_REDUX_LAYOUT_ENTITY = Object.freeze<IReduxLayoutEntity>({
  expandedGroups: {[LayoutGroupsValuesEnum.HOME]: true},
  mode: LayoutModesEnum.FULL,
  x: 0,
  y: 0,
});

/**
 * @classes
 * @stable [08.05.2020]
 */
export enum LayoutClassesEnum {
  FORM_LAYOUT = 'rac-form-layout',
  FORM_LAYOUT_CONTENT = 'rac-form-layout__content',
  FORM_LAYOUT_TOP_HEADER = 'rac-form-layout__top-header',
}
