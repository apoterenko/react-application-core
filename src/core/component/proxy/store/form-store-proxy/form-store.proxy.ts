import { FormActionBuilder } from '../../../action.builder';
import {
  FieldChangeEntityT,
  IApiEntity,
  IFormStoreProxy,
  IGenericContainer,
  IGenericContainerProps,
  IGenericStoreEntity,
} from '../../../../definition';
import { StoreProxy } from '../store.proxy';

export class FormStoreProxy<TStore extends IGenericStoreEntity = IGenericStoreEntity,
                            TProps extends IGenericContainerProps = IGenericContainerProps>
  extends StoreProxy<TStore, TProps>
  implements IFormStoreProxy {

  /**
   * @stable [30.03.2020]
   * @param {IGenericContainer<TProps extends IGenericContainerProps>} container
   */
  constructor(readonly container: IGenericContainer<TProps>) {
    super(container);

    this.dispatchFormChange = this.dispatchFormChange.bind(this);
    this.dispatchFormChanges = this.dispatchFormChanges.bind(this);
    this.dispatchFormReset = this.dispatchFormReset.bind(this);
    this.dispatchFormSubmit = this.dispatchFormSubmit.bind(this);
    this.dispatchFormValid = this.dispatchFormValid.bind(this);
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
  public dispatchFormChanges<TChanges = {}>(changes: TChanges, otherSection?: string): void {
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
