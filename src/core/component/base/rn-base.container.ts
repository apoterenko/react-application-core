import { AnyT } from '../../definitions.interface';
import { UniversalBaseContainer } from './universal-base.container';
import { IRnBaseContainerProps } from './rn-base.interface';
import { FormActionBuilder } from '../form/form-action.builder';

export class RnBaseContainer<TInternalProps extends IRnBaseContainerProps>
  extends UniversalBaseContainer<TInternalProps> {

  /**
   * @stable - 25.04.2018
   * @param {string} fieldName
   * @param {AnyT} fieldValue
   */
  protected dispatchFormChange(fieldName: string, fieldValue?: AnyT): void {
    this.appStore.dispatch(
      FormActionBuilder.buildChangeSimpleAction(this.props.sectionName, fieldName, fieldValue)
    );
  }
}
