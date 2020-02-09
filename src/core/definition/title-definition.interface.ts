import { IComponentProps } from './props-definition.interface';
import {
  IContentBorderWrapper,
  IItemsWrapper,
} from '../definitions.interface';

/**
 * @generic-entity
 * @stable [09.02.2020]
 */
export interface IGenericTitleEntity
  extends IContentBorderWrapper,
    IItemsWrapper<JSX.Element> {
}

/**
 * @props
 * @stable [09.02.2020]
 */
export interface ITitleProps
  extends IComponentProps,
    IGenericTitleEntity {
}
