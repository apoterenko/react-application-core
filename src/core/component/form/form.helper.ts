import { AnyT } from '../../definitions.interface';
import { isDef } from '../../util';
import {
  IFormWrapperEntity,
  IFieldChangeEntity,
  IFieldsChangesEntity,
  FieldChangeEntityT,
} from '../../entities-definitions.interface';

export const fromFormChanges = <TEntity>(formEntityWrapper: IFormWrapperEntity<TEntity>,
                                         fieldValueResolver: (changes: TEntity) => AnyT) =>
  fieldValueResolver(formEntityWrapper.form.changes);

export const isFormChangesExist = <TEntity>(formEntityWrapper: IFormWrapperEntity<TEntity>,
                                            fieldValueResolver: (changes: TEntity) => AnyT) =>
  isDef(fromFormChanges(formEntityWrapper, fieldValueResolver));

export const toFieldValueEntity = (payload: FieldChangeEntityT,
                                   fieldName: string): IFieldChangeEntity => {
  const payloadAsFieldModifyPayload = payload as IFieldChangeEntity;
  const payloadAsFieldsModifyPayload = payload as IFieldsChangesEntity;
  const fields: IFieldChangeEntity[] = []
    .concat(
      payloadAsFieldsModifyPayload.fields
        ? payloadAsFieldsModifyPayload.fields
        : [payloadAsFieldModifyPayload]
    );
  return fields.find((fieldPayload) => fieldName === fieldPayload.name);
};
