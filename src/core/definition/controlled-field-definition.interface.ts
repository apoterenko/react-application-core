import {
  EntityIdT,
  IContainerWrapper,
  IElementWrapper,
  IFieldConfigurationWrapper,
  IFieldsWrapper,
  IFieldWrapper,
  IOrderWrapper,
  ITypeWrapper,
} from '../definitions.interface';
import { CronPeriodsEnum } from './cron-definition.interface';
import { IBaseSelectProps } from './select-definition.interface';
import {
  IGenericContainer,
  IGenericContainerProps,
} from './generic-container-definition.interface';
import { IExtendedEntity } from './entity-definition.interface';
import { IFieldProps } from './field-definition.interface';
import { IGenericCronEntity } from './cron-field-definition.interface';
import { IPlaceFieldProps } from './place-field-definition.interface';
import { IReduxBaseDictionariesEntity } from './dictionary-definition.interface';

/**
 * @controlled-field
 * @stable [11.01.2020]
 */
export interface IControlledFieldItemEntity<TControlledFieldItemsEnum, TProps extends IFieldProps = IFieldProps>
  extends IFieldConfigurationWrapper<TProps>,
    IOrderWrapper,
    ITypeWrapper<TControlledFieldItemsEnum> {
}

/**
 * @config-entity
 * @stable [11.01.2020]
 */
export interface IControlledFieldConfigEntity<
  TControlledFieldItemEntity extends IControlledFieldItemEntity<TControlledFieldEnum, TProps>,
  TControlledFieldEnum,
  TDictionaries = {},
  TPermissions = {},
  TProps extends IFieldProps = IFieldProps>
  extends IContainerWrapper<IGenericContainer<IGenericContainerProps<IReduxBaseDictionariesEntity> & IExtendedEntity>>,
    IFieldsWrapper<TControlledFieldItemEntity[]>,
    IFieldWrapper<TProps> {
}

/**
 * @controlled-field
 * @stable [06.04.2020]
 */
export interface IControlledMappedFieldEntity<TEnum>
  extends ITypeWrapper<TEnum>,
    IElementWrapper<JSX.Element> {
}

/**
 * @enum
 * @stable [18.12.2019]
 */
export enum CompositeCronFieldItemsEnum {
  CRON,
  FROM,
  PERIOD,
  TO,
}

/**
 * @stable [18.12.2019]
 */
export type CompositeCronFieldPropsT = IGenericCronEntity & IFieldProps & IBaseSelectProps; // TODO Props

/**
 * @composite-cron-field
 * @stable [18.12.2019]
 */
export interface ICompositeCronFieldItemEntity
  extends IControlledFieldItemEntity<CompositeCronFieldItemsEnum, CompositeCronFieldPropsT> {
}

/**
 * @config-entity
 * @stable [18.12.2019]
 */
export interface ICompositeCronFieldConfigEntity
  extends IControlledFieldConfigEntity<ICompositeCronFieldItemEntity, CompositeCronFieldItemsEnum> {
  cronPeriodsMapper?(externalPeriod: EntityIdT): CronPeriodsEnum;
}

/**
 * @enum
 * @stable [11.01.2020]
 */
export enum ControlledPlaceFieldItemsEnum {
  PLACE,
}

/**
 * @controlled-place-field
 * @stable [11.01.2020]
 */
export interface IControlledPlaceFieldConfigEntity
  extends IControlledFieldConfigEntity<IControlledPlaceFieldItemEntity,
    ControlledPlaceFieldItemsEnum,
    IReduxBaseDictionariesEntity,
    {},
    IPlaceFieldProps> {
}

/**
 * @controlled-place-field
 * @stable [18.12.2019]
 */
export interface IControlledPlaceFieldItemEntity
  extends IControlledFieldItemEntity<ControlledPlaceFieldItemsEnum, IPlaceFieldProps> {
}
