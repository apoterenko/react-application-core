import {
  AnyT,
  EntityIdT,
  IActiveValueWrapper,
  IChangesWrapper,
  IClassNameWrapper,
  IDisabledWrapper,
  IEntity,
  IEntityIdTWrapper,
  IEntityIdWrapper,
  IEntityWrapper,
  IIconLeftAlignedWrapper,
  IIconWrapper,
  IIndexWrapper,
  ILabelWrapper,
  IMaxWrapper,
  IMinWrapper,
  INameWrapper,
  INewEntityWrapper,
  IOnClickWrapper,
  IOriginalEntityWrapper,
  IPayloadWrapper,
  IProgressWrapper,
  IRawDataWrapper,
  IRendererWrapper,
  ISelectedWrapper,
  ISelfPropsWrapper,
  ISelfWrapper,
  ITouchedWrapper,
  ITplWrapper,
  ITypeWrapper,
  IValueWrapper,
  StringNumberT,
} from '../definitions.interface';
import { IErrorEntity } from './error-definition.interface';

/**
 * @presets-entity
 * @stable [17.12.2020]
 */
export interface IPresetsActionEntity<TType = string>
  extends IClassNameWrapper,
    IDisabledWrapper<boolean | (() => boolean)>,
    IOnClickWrapper,
    ITouchedWrapper,
    ITypeWrapper<TType> {
}

/**
 * @presets-entity
 * @stable [15.10.2020]
 */
export interface IPresetsMinMaxEntity
  extends IMaxWrapper<StringNumberT>,
    IMinWrapper<StringNumberT> {
}

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
    IEntityIdWrapper,
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
 * @stable [14.01.2021]
 */
export interface IIndexEntity
  extends IIndexWrapper {
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
 * @flux-entity
 * @stable [10.09.2020]
 */
export interface IFluxPayloadEntityIdEntity
  extends IPayloadWrapper<EntityIdT> {
}

/**
 * @flux-entity
 * @stable [10.09.2020]
 */
export interface IFluxPayloadEntityIdTWrapperEntity
  extends IPayloadWrapper<IEntityIdTWrapper> {
}

/**
 * @entity
 * @stable [19.01.2020]
 */
export interface ISelectedEntity<TEntity extends IEntity = IEntity>
  extends ISelectedWrapper<TEntity> {
}

/**
 * @redux-holder-entity
 * @stable [29.07.2020]
 */
export interface IReduxActiveValueHolderEntity
  extends IActiveValueWrapper {
}

/**
 * @config-entity
 * @stable [31.03.2021]
 */
export interface ISelfConfigEntity<TProps, TSelf>
  extends ISelfPropsWrapper<TProps>,
    ISelfWrapper<TSelf> {
}
