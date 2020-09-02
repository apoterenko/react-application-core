import {
  IEntity,
  ISelectedValueIgnoredWrapper,
} from '../definitions.interface';
import {
  IBaseSelectProps,
  IBaseSelectState,
} from './select-definition.interface';
import { IGenericComponentProps } from './generic-component-definition.interface';
import { IReduxMultiEntity } from './multi-entity-definition.interface';
import { MultiFieldValueT } from './field-definition.interface';

/**
 * @stable [01.06.2018]
 */
export interface IMultiFieldState
  extends IBaseSelectState {
}

/**
 * @presets-entity
 * @stable [16.06.2020]
 */
export interface IPresetsMultiFieldEntity
  extends ISelectedValueIgnoredWrapper {
}

/**
 * @generic-entity
 * @stable [16.06.2020]
 */
export interface IGenericMultiFieldEntity
  extends IPresetsMultiFieldEntity,
    IBaseSelectProps { // TODO
}

/**
 * @props
 * @stable [16.06.2020]
 */
export interface IMultiFieldProps
  extends IGenericComponentProps,
    IGenericMultiFieldEntity {
}

/**
 * @config-entity
 * @stable [02.09.2020]
 */
export interface IMultiFieldValueFilterConfigEntity<TEntity = IEntity> {
  addFilter?: (entity: TEntity) => boolean,
  currentEntity: MultiFieldValueT<TEntity>,
  editFilter?: (entity: TEntity) => boolean,
  removeFilter?: (entity: TEntity) => boolean,
  sourceEntities: MultiFieldValueT<TEntity>,
}

/**
 * @config-entity
 * @stable [02.09.2020]
 */
export interface IMultiFieldValueConcatConfigEntity<TEntity = IEntity> {
  concatEntity?: IReduxMultiEntity<TEntity>,
  currentEntity: MultiFieldValueT<TEntity>,
}

/**
 * @classes
 * @stable [16.06.2020]
 */
export enum MultiFieldClassesEnum {
  MULTI_FIELD = 'rac-multi-field',
}
