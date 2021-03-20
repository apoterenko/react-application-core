import {
  IContentBorderWrapper,
  IFullWrapper,
  IItemsWrapper,
} from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';

/**
 * @presets-entity
 * @stable [20.03.2021]
 */
export interface IPresetsTitleEntity
  extends IContentBorderWrapper,
    IFullWrapper,
    IItemsWrapper<JSX.Element> {
}

/**
 * @generic-entity
 * @stable [20.03.2021]
 */
export interface IGenericTitleEntity
  extends IPresetsTitleEntity {
}

/**
 * @props
 * @stable [20.03.2021]
 */
export interface ITitleProps
  extends IGenericComponentProps,
    IGenericTitleEntity {
}

/**
 * @classes
 * @stable [20.03.2021]
 */
export enum TitleClassesEnum {
  CONTENT = 'rac-title__content',
  CONTENT_EDGE = 'rac-title__content-edge',
  FULL_TITLE = 'rac-full-title',
  RIGHT_CONTENT = 'rac-title__right-content',
  TITLE = 'rac-title',
}
