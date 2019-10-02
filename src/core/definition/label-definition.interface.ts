import {
  AnyT,
  ILabelWrapper,
  IValueWrapper,
} from '../definitions.interface';

/**
 * @stable [02.10.2019]
 */
export interface ILabeledValueEntity<TValue = AnyT>
  extends IValueWrapper<TValue>,
    ILabelWrapper {
}
