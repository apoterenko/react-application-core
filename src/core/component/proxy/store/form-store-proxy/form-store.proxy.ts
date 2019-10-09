import { namedConstructor } from '../../../../util';
import { FormActionBuilder } from '../../../action.builder';
import {
  IUniversalContainer,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../../../definition';
import { BaseStoreProxy } from '../base-store.proxy';
import { IFormStoreProxy } from './form-store-proxy.interface';
import { IKeyValue } from '../../../../definitions.interface';

@namedConstructor('$$formStoreProxy')
export class FormStoreProxy<TStore extends IUniversalStoreEntity = IUniversalStoreEntity,
                            TProps extends IUniversalContainerProps = IUniversalContainerProps>
  extends BaseStoreProxy<TStore, TProps>
  implements IFormStoreProxy {

  /**
   * @stable [09.10.2019]
   * @param {IUniversalContainer<TProps extends IUniversalContainerProps>} container
   */
  constructor(readonly container: IUniversalContainer<TProps>) {
    super(container);
    this.dispatchFormReset = this.dispatchFormReset.bind(this);
  }

  /**
   * @stable [09.10.2019]
   * @param {string} otherSection
   */
  public dispatchFormReset(otherSection?: string): void {
    this.dispatchAnyAction(FormActionBuilder.buildResetPlainAction(otherSection || this.sectionName));
  }

  /**
   * @stable [09.10.2019]
   * @param {TChanges} changes
   * @param {string} otherSection
   */
  public dispatchFormChanges<TChanges extends IKeyValue = IKeyValue>(changes: TChanges, otherSection?: string): void {
    this.dispatchAnyAction(FormActionBuilder.buildChangesPlainAction(otherSection || this.sectionName, changes));
  }
}
