import { IXYEntity } from './xy-definition.interface';
import {
  IExpandedGroupsWrapper,
  IKeyValue,
  ILayoutWrapper,
  IModeWrapper,
} from '../definitions.interface';

/**
 * @stable [28.09.2019]
 */
export enum LayoutModeEnum {
  FULL,
  MINIMAL,
}

/**
 * @stable [28.09.2019]
 */
export interface ILayoutEntity
  extends IXYEntity,
    IExpandedGroupsWrapper<IKeyValue>,
    IModeWrapper<LayoutModeEnum> {
}

/**
 * @stable [28.09.2019]
 */
export interface ILayoutWrapperEntity
  extends ILayoutWrapper<ILayoutEntity> {
}

/**
 * @stable [28.09.2019]
 */
export enum LayoutGroupsValuesEnum {
  HOME = 'home',
}

/**
 * @stable [28.09.2019]
 */
export const INITIAL_LAYOUT_ENTITY = Object.freeze<ILayoutEntity>({
  x: 0,
  y: 0,
  mode: LayoutModeEnum.FULL,
  expandedGroups: {[LayoutGroupsValuesEnum.HOME]: true},
});
