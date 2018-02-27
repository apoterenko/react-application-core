import { IFormEntityWrapper, AnyT } from '../../definition.interface';
import { isDef } from '../../util';

export const fromFormChanges = <TEntity>(formEntityWrapper: IFormEntityWrapper<TEntity>,
                                         fieldValueResolver: (changes: TEntity) => AnyT) =>
  fieldValueResolver(formEntityWrapper.form.changes);

export const isFormChangesExist = <TEntity>(formEntityWrapper: IFormEntityWrapper<TEntity>,
                                            fieldValueResolver: (changes: TEntity) => AnyT) =>
  isDef(fromFormChanges(formEntityWrapper, fieldValueResolver));
