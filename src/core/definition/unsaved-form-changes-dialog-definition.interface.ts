import {
  IConfigurationHolderDialogEntity,
  IGenericDialogEntity,
} from './dialog-definition.interface';
import { IEntity } from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';
import { IHolderProxyContainerEntity } from './container-definition.interface';
import { IReduxFormHolderEntity } from './form-definition.interface';

/**
 * @redux-holder-entity
 * @stable [15.06.2020]
 */
export interface IReduxHolderUnsavedFormChangesDialogEntity<TEntity = IEntity>
  extends IReduxFormHolderEntity<TEntity> {
}

/**
 * @generic-entity
 * @stable [15.06.2020]
 */
export interface IGenericUnsavedFormChangesDialogEntity
  extends IGenericDialogEntity,
    IReduxHolderUnsavedFormChangesDialogEntity {
}

/**
 * @props
 * @stable [15.06.2020]
 */
export interface IUnsavedFormChangesDialogProps
  extends IGenericComponentProps,
    IGenericUnsavedFormChangesDialogEntity {
}

/**
 * @generic-container-entity
 * @stable [15.06.2020]
 */
export interface IGenericUnsavedFormChangesDialogContainerEntity<TProps = IUnsavedFormChangesDialogProps>
  extends IConfigurationHolderDialogEntity<TProps>,
    IHolderProxyContainerEntity,
    IReduxHolderUnsavedFormChangesDialogEntity {
}

/**
 * @props
 * @stable [05.04.2020]
 */
export interface IUnsavedFormChangesDialogContainerProps
  extends IGenericContainerProps,
    IGenericUnsavedFormChangesDialogContainerEntity {
}
