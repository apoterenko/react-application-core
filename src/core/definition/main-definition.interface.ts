import {
  ISelectedElementEntity,
  IStickyEntity,
} from '../definition';
import { IEnhancedGenericComponentProps } from './enhanced-generic-component-definition.interface';

/**
 * @generic-entity
 * @stable [20.05.2020]
 */
export interface IGenericMainEntity
  extends ISelectedElementEntity,
    IStickyEntity {
}

/**
 * @props
 * @stable [20.05.2020]
 */
export interface IMainProps
  extends IEnhancedGenericComponentProps,
    IGenericMainEntity {
}

/**
 * @classes
 * @stable [20.05.2020]
 */
export enum MainClassesEnum {
  MAIN = 'rac-main',
  MAIN_BODY = 'rac-main__body',
  MAIN_BODY_CONTENT = 'rac-main__body-content',
}
