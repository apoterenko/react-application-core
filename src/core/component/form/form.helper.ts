import { IFormEntityWrapper, AnyT } from '../../definition.interface';
import { isDef } from '../../util';
import {
  IFormFieldModifyPayload,
  IFormFieldsModifyPayload,
  FormModifyPayloadT,
} from './form.interface';

export const fromFormChanges = <TEntity>(formEntityWrapper: IFormEntityWrapper<TEntity>,
                                         fieldValueResolver: (changes: TEntity) => AnyT) =>
  fieldValueResolver(formEntityWrapper.form.changes);

export const isFormChangesExist = <TEntity>(formEntityWrapper: IFormEntityWrapper<TEntity>,
                                            fieldValueResolver: (changes: TEntity) => AnyT) =>
  isDef(fromFormChanges(formEntityWrapper, fieldValueResolver));

export const toFieldModifyPayload = (payload: FormModifyPayloadT,
                                     fieldName: string): IFormFieldModifyPayload => {
  const payloadAsFieldModifyPayload = payload as IFormFieldModifyPayload;
  const payloadAsFieldsModifyPayload = payload as IFormFieldsModifyPayload;
  const fields: IFormFieldModifyPayload[] = []
    .concat(
      payloadAsFieldsModifyPayload.fields
        ? payloadAsFieldsModifyPayload.fields
        : [payloadAsFieldModifyPayload]
    );
  return fields.find((fieldPayload) => fieldName === fieldPayload.field);
};
