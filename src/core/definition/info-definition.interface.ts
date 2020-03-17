import { IGenericComponentEntity } from './component-definition.interface';
import {
  IErrorWrapper,
  IMessageWrapper,
  IProgressWrapper,
} from '../definitions.interface';

/**
 * @generic-entity
 * @stable [18.03.2020]
 */
export interface IInfoGenericEntity
  extends IErrorWrapper<boolean | string | Error | {}>,
    IMessageWrapper,
    IProgressWrapper<boolean | string> {
}

/**
 * @props
 * @stable [18.03.2020]
 */
export interface IInfoComponentProps
  extends IGenericComponentEntity,
    IInfoGenericEntity {
}
