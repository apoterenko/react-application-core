import {
  IFieldsValuesEntities,
  AnyT,
  IFieldValueEntity,
  FieldValueEntityT,
} from '../../definition.interface';
import { isDef } from '../../util';
import { IFormWrapperEntity } from '../../entities-definitions.interface';

export const fromFormChanges = <TEntity>(formEntityWrapper: IFormWrapperEntity<TEntity>,
                                         fieldValueResolver: (changes: TEntity) => AnyT) =>
  fieldValueResolver(formEntityWrapper.form.changes);

export const isFormChangesExist = <TEntity>(formEntityWrapper: IFormWrapperEntity<TEntity>,
                                            fieldValueResolver: (changes: TEntity) => AnyT) =>
  isDef(fromFormChanges(formEntityWrapper, fieldValueResolver));

export const toFieldValueEntity = (payload: FieldValueEntityT,
                                   fieldName: string): IFieldValueEntity => {
  const payloadAsFieldModifyPayload = payload as IFieldValueEntity;
  const payloadAsFieldsModifyPayload = payload as IFieldsValuesEntities;
  const fields: IFieldValueEntity[] = []
    .concat(
      payloadAsFieldsModifyPayload.fields
        ? payloadAsFieldsModifyPayload.fields
        : [payloadAsFieldModifyPayload]
    );
  return fields.find((fieldPayload) => fieldName === fieldPayload.field);
};
