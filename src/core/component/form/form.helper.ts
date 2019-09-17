import { AnyT } from '../../definitions.interface';
import { isDef } from '../../util';
import {
  IFormWrapperEntity,
} from '../../entities-definitions.interface';

export const fromFormChanges = <TEntity>(formEntityWrapper: IFormWrapperEntity<TEntity>,
                                         fieldValueResolver: (changes: TEntity) => AnyT) =>
  fieldValueResolver(formEntityWrapper.form.changes);

export const isFormChangesExist = <TEntity>(formEntityWrapper: IFormWrapperEntity<TEntity>,
                                            fieldValueResolver: (changes: TEntity) => AnyT) =>
  isDef(fromFormChanges(formEntityWrapper, fieldValueResolver));
