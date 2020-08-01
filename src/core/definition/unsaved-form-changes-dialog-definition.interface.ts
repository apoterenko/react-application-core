import {
  IConfigurationDialogEntity,
  IGenericDialogEntity,
} from './dialog-definition.interface';
import { IEntity } from '../definitions.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IGenericContainerProps } from './generic-container-definition.interface';
import { IProxyContainerHolderEntity } from './container-definition.interface';
import { IReduxFormHolderEntity } from './form-definition.interface';

/**
 * @redux-holder-entity
 * @stable [01.08.2020]
 */
export interface IReduxUnsavedFormChangesDialogHolderEntity<TEntity = IEntity>
  extends IReduxFormHolderEntity<TEntity> {
}

/**
 * @generic-entity
 * @stable [15.06.2020]
 */
export interface IGenericUnsavedFormChangesDialogEntity
  extends IGenericDialogEntity,
    IReduxUnsavedFormChangesDialogHolderEntity {
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
  extends IConfigurationDialogEntity<TProps>,
    IProxyContainerHolderEntity,
    IReduxUnsavedFormChangesDialogHolderEntity {
}

/**
 * @props
 * @stable [05.04.2020]
 */
export interface IUnsavedFormChangesDialogContainerProps
  extends IGenericContainerProps,
    IGenericUnsavedFormChangesDialogContainerEntity {
}
