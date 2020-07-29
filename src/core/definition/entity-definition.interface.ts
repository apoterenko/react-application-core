import {
  AnyT,
  EntityIdT,
  IActiveValueWrapper,
  IAddWrapper,
  IChangesWrapper,
  IDisabledWrapper,
  IEditWrapper,
  IEntity,
  IEntityIdTWrapper,
  IEntityIdWrapper,
  IEntityWrapper,
  IHoveredWrapper,
  IIconLeftAlignedWrapper,
  IIconWrapper,
  IIndexWrapper,
  ILabelWrapper,
  INameWrapper,
  INewEntityWrapper,
  IOriginalEntityWrapper,
  IPayloadWrapper,
  IProgressWrapper,
  IRawDataWrapper,
  IRemoveWrapper,
  IRendererWrapper,
  ISelectableWrapper,
  ISelectedWrapper,
  ISourceWrapper,
  ITouchedWrapper,
  ITplWrapper,
  IValueWrapper,
} from '../definitions.interface';
import { IErrorEntity } from './error-definition.interface';
import { IFieldChangeEntity } from './field-definition.interface';

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsTemplateEntity<TRawData extends IEntity = IEntity>
  extends IRendererWrapper<TRawData, number>,
    ITplWrapper<TRawData> {
}

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsIconEntity
  extends IIconLeftAlignedWrapper,
    IIconWrapper {
}

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsLabeledValueEntity<TValue = AnyT>
  extends ILabelWrapper,
    IValueWrapper<TValue> {
}

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsSelectableHoveredEntity
  extends IHoveredWrapper,
    ISelectableWrapper {
}

/**
 * @presets-entity
 * @stable [01.06.2020]
 */
export interface IPresetsRawDataLabeledValueEntity<TRawData = IEntity, TValue = EntityIdT>
  extends IPresetsLabeledValueEntity<TValue>,
    IRawDataWrapper<TRawData> {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxLifeCycleEntity
  extends IErrorEntity<string | boolean>,
    IProgressWrapper,
    ITouchedWrapper {
}

/**
 * @entity
 * @stable [09.04.2020]
 */
export interface IExtendedEntity<TEntity = IEntity>
  extends IChangesWrapper<TEntity>,
    IEntityIdWrapper<EntityIdT>,
    IEntityWrapper<TEntity>,
    INewEntityWrapper,
    IOriginalEntityWrapper<TEntity> {
}

/**
 * @entity
 * @stable [09.04.2020]
 */
export interface INamedEntity
  extends IEntityIdTWrapper,
    INameWrapper {
}

/**
 * @entity
 * @stable [09.04.2020]
 */
export interface IOptionEntity
  extends INamedEntity,
    IDisabledWrapper {
}

/**
 * @stable [19.01.2020]
 */
export interface IPayloadEntityId
  extends IPayloadWrapper<EntityIdT> {
}

/**
 * @stable [19.01.2020]
 */
export interface IPayloadEntity<TEntity extends IEntity = IEntity>
  extends IPayloadWrapper<TEntity> {
}

/**
 * @entity
 * @stable [19.01.2020]
 */
export interface ISelectedEntity<TEntity extends IEntity = IEntity>
  extends ISelectedWrapper<TEntity> {
}

/**
 * @stable [02.10.2019]
 */
export interface IMultiItemEntity
  extends IEntityIdTWrapper,
    IFieldChangeEntity,
    INewEntityWrapper,
    IIndexWrapper {
}

/**
 * @redux-entity
 * @stable [08.05.2020]
 */
export interface IReduxMultiEntity<TEntity extends IEntity = IEntity>
  extends IAddWrapper<TEntity[]>,
    IEditWrapper<IMultiItemEntity[]>,
    IRemoveWrapper<TEntity[]>,
    ISourceWrapper<TEntity[]> {
}

/**
 * @flux-entity
 * @stable [12.04.2020]
 */
export interface IFluxActiveValueEntity
  extends IPayloadWrapper<number> {
}

/**
 * @redux-holder-entity
 * @stable [29.07.2020]
 */
export interface IReduxActiveValueHolderEntity
  extends IActiveValueWrapper<number> {
}
