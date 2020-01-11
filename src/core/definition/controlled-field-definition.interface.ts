import {
  EntityIdT,
  IContainerWrapper,
  IFieldConfigurationWrapper,
  IFieldsWrapper,
  IFieldWrapper,
  IFromDateWrapper,
  IOrderWrapper,
  IPeriodWrapper,
  ITypeWrapper,
} from '../definitions.interface';
import { CronPeriodsEnum } from './cron-definition.interface';
import { IBaseSelectProps } from '../component/field/select/base-select.interface';  // TODO
import { IContainer } from './container-definition.interface';
import { IContainerProps } from './props-definition.interface';
import { IFieldProps } from '../configurations-definitions.interface';  // TODO
import { IGenericCronEntity } from './cron-definition.interface';
import { IPlaceFieldProps } from './place-definition.interface';
import { IPlacesDictionaryWrapperEntity } from './dictionary-definition.interface';

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
 * @controlled-field
 * @stable [11.01.2020]
 */
export interface IControlledFieldConfigEntity<
  TControlledFieldItemEntity extends IControlledFieldItemEntity<TControlledFieldEnum, TProps>,
  TControlledFieldEnum,
  TDictionaries = {},
  TPermissions = {},
  TProps extends IFieldProps = IFieldProps>
  extends IContainerWrapper<IContainer<IContainerProps<TDictionaries, TPermissions>>>,
    IFieldsWrapper<TControlledFieldItemEntity[]>,
    IFieldWrapper<TProps> {
}

/**
 * @composite-cron-field
 * @stable [18.12.2019]
 */
export enum CompositeCronFieldItemsEnum {
  CRON,
  FROM,
  PERIOD,
  TO,
}

/**
 * @composite-cron-field
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
 * @composite-cron-field
 * @stable [18.12.2019]
 */
export interface ICompositeCronFieldConfigEntity
  extends IControlledFieldConfigEntity<ICompositeCronFieldItemEntity, CompositeCronFieldItemsEnum>,
    IPeriodWrapper<CronPeriodsEnum>,
    IFromDateWrapper {
  cronPeriodsMapper?(externalPeriod: EntityIdT): CronPeriodsEnum;
}

/**
 * @controlled-place-field
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
    IPlacesDictionaryWrapperEntity,
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
