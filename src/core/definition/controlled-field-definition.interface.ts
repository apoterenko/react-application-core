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
import { IBaseSelectProps } from '../component/field/select/base-select.interface';  // TODO
import {
  IGenericContainer,
  IGenericContainerProps,
} from './generic-container-definition.interface';
import { IBaseDictionariesEntity } from './dictionary-definition.interface';
import { IExtendedEntity } from './entity-definition.interface';
import { IFieldProps2 } from '../configurations-definitions.interface';  // TODO
import { IGenericCronEntity } from './cron-definition.interface';
import { IPlaceFieldProps } from './place-definition.interface';

/**
 * @controlled-field
 * @stable [11.01.2020]
 */
export interface IControlledFieldItemEntity<TControlledFieldItemsEnum, TProps extends IFieldProps2 = IFieldProps2>
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
  TProps extends IFieldProps2 = IFieldProps2>
  extends IContainerWrapper<IGenericContainer<IGenericContainerProps<IBaseDictionariesEntity> & IExtendedEntity>>,
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
export type CompositeCronFieldPropsT = IGenericCronEntity & IFieldProps2 & IBaseSelectProps; // TODO Props

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
    IBaseDictionariesEntity,
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
