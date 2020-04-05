import { mapFormEditableEntity } from '../../../util';
import {
  IFormEditableEntity,
  IGenericContainer,
  IUnsavedFormChangesDialogContainerProps,
} from '../../../definition';
import { IEntity } from '../../../definitions.interface';

/**
 * @stable [05.04.2020]
 * @param {IFormEditableEntity<TEntity>} props
 * @param {IGenericContainer} proxyContainer
 * @returns {IUnsavedFormChangesDialogContainerProps}
 */
export const mapUnsavedFormChangesDialogContainerProps =
  <TEntity = IEntity>(props: IFormEditableEntity<TEntity>,
                      proxyContainer: IGenericContainer): IUnsavedFormChangesDialogContainerProps =>
    ({
      dialogConfiguration: mapFormEditableEntity(props),
      proxyContainer,
    });
