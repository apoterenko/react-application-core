import { FormActionBuilder } from '../../../action.builder';
import {
  FieldChangeEntityT,
  IApiEntity,
  IFormStoreProxy,
  IUniversalContainerProps,
  IUniversalStoreEntity,
} from '../../../../definition';
import { BaseStoreProxy } from '../base-store.proxy';
import {
  IKeyValue,
  IPropsWrapper,
} from '../../../../definitions.interface';

export class FormStoreProxy<TStore extends IUniversalStoreEntity = IUniversalStoreEntity,
                            TProps extends IUniversalContainerProps = IUniversalContainerProps>
  extends BaseStoreProxy<TStore, TProps>
  implements IFormStoreProxy {

  /**
   * @stable [24.03.2020]
   * @param {IPropsWrapper<TProps extends IUniversalContainerProps>} container
   */
  constructor(readonly container: IPropsWrapper<TProps>) {
    super(container);
    this.dispatchFormReset = this.dispatchFormReset.bind(this);
  }

  /**
   * @stable [09.10.2019]
   * @param {string} otherSection
   */
  public dispatchFormReset(otherSection?: string): void {
    this.dispatchAnyAction(FormActionBuilder.buildResetPlainAction(this.asSection(otherSection)));
  }

  /**
   * @stable [01.03.2020]
   * @param {IApiEntity} apiEntity
   * @param {string} otherSection
   */
  public dispatchFormSubmit(apiEntity: IApiEntity, otherSection?: string): void {
    this.dispatchAnyAction(FormActionBuilder.buildSubmitPlainAction(this.asSection(otherSection), apiEntity));
  }

  /**
   * @stable [03.02.2020]
   * @param {boolean} valid
   * @param {string} otherSection
   */
  public dispatchFormValid(valid: boolean, otherSection?: string): void {
    this.dispatchAnyAction(FormActionBuilder.buildValidPlainAction(this.asSection(otherSection), valid));
  }

  /**
   * @stable [09.10.2019]
   * @param {TChanges} changes
   * @param {string} otherSection
   */
  public dispatchFormChanges<TChanges extends IKeyValue = IKeyValue>(changes: TChanges, otherSection?: string): void {
    this.dispatchAnyAction(FormActionBuilder.buildChangesPlainAction(this.asSection(otherSection), changes));
  }

  /**
   * @stable [03.02.2020]
   * @param {FieldChangeEntityT} payload
   * @param {string} otherSection
   */
  public dispatchFormChange(payload: FieldChangeEntityT, otherSection?: string): void {
    this.dispatchAnyAction(FormActionBuilder.buildChangePlainAction(this.asSection(otherSection), payload));
  }

  /**
   * @stable [03.02.2020]
   * @param {string} otherSection
   * @returns {string}
   */
  private asSection(otherSection?: string): string {
    return otherSection || this.sectionName;
  }
}
