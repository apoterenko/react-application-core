import { LoggerFactory } from 'ts-smart-logger';

import { isObjectEmpty } from '../../../../util';
import { FormActionBuilder } from '../../../../action';
import {
  FieldChangeEntityT,
  IApiEntity,
  IFieldChangeEntity,
  IFieldsChangesEntity,
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

  private static readonly formStoreProxyLogger = LoggerFactory.makeLogger('FormStoreProxy');

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
   * @stable [12.04.2020]
   * @param {number} value
   * @param {string} otherSection
   */
  public dispatchFormActiveValue(value: number, otherSection?: string): void {
    this.dispatchPlainAction(FormActionBuilder.buildActiveValuePlainAction(this.asSection(otherSection), value));
  }

  /**
   * @stable [12.04.2020]
   * @param {number} value
   * @param {string} otherSection
   */
  public dispatchFormInactiveValue(value: number, otherSection?: string): void {
    this.dispatchPlainAction(FormActionBuilder.buildInactiveValuePlainAction(this.asSection(otherSection), value));
  }

  /**
   * @stable [09.10.2019]
   * @param {string} otherSection
   */
  public dispatchFormReset(otherSection?: string): void {
    this.dispatchPlainAction(FormActionBuilder.buildResetPlainAction(this.asSection(otherSection)));
  }

  /**
   * @stable [01.03.2020]
   * @param {IApiEntity} apiEntity
   * @param {string} otherSection
   */
  public dispatchFormSubmit(apiEntity: IApiEntity, otherSection?: string): void {
    this.dispatchPlainAction(FormActionBuilder.buildSubmitPlainAction(this.asSection(otherSection), apiEntity));
  }

  /**
   * @stable [03.02.2020]
   * @param {boolean} valid
   * @param {string} otherSection
   */
  public dispatchFormValid(valid: boolean, otherSection?: string): void {
    this.dispatchPlainAction(FormActionBuilder.buildValidPlainAction(this.asSection(otherSection), valid));
  }

  /**
   * @stable [09.10.2019]
   * @param {TChanges} changes
   * @param {string} otherSection
   */
  public dispatchFormChanges<TChanges = {}>(changes: TChanges, otherSection?: string): void {
    this.dispatchPlainAction(FormActionBuilder.buildChangesPlainAction(this.asSection(otherSection), changes));
  }

  /**
   * @stable [01.04.2020]
   * @param {TChanges} changes
   * @param {string} otherSection
   */
  public dispatchFormDefaultChanges<TChanges = {}>(changes: TChanges, otherSection?: string): void {
    this.dispatchPlainAction(FormActionBuilder.buildDefaultChangesPlainAction(this.asSection(otherSection), changes));
  }

  /**
   * @stable [18.04.2020]
   * @param {FieldChangeEntityT} payload
   * @param {string} otherSection
   */
  public dispatchFormChange(payload: FieldChangeEntityT, otherSection?: string): void {
    const fieldsChangesEntity = payload as IFieldsChangesEntity;
    if (!Array.isArray(fieldsChangesEntity.fields)) {
      const fieldChangeEntity = payload as IFieldChangeEntity;

      if (isObjectEmpty(fieldChangeEntity.name)) {
        FormStoreProxy.formStoreProxyLogger.warn(
          '[$FormStoreProxy][dispatchFormChange] The field payload is empty:', payload
        );
        return;
      }
    }
    this.dispatchPlainAction(FormActionBuilder.buildChangePlainAction(this.asSection(otherSection), payload));
  }
}
