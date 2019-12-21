import {
  EntityIdT,
  IContainerWrapper,
  IFieldConfigurationWrapper,
  IFieldsWrapper,
  IFromDateWrapper,
  IOrderWrapper,
  IPeriodWrapper,
  IRenderedWrapper,
  ITypeWrapper,
} from '../definitions.interface';
import { CronPeriodsEnum } from './cron-definition.interface';
import { IBaseSelectProps } from '../component/field/select/base-select.interface';  // TODO
import { IContainer } from './container-definition.interface';
import { IFieldProps } from '../configurations-definitions.interface';  // TODO
import { IGenericCronEntity } from './cron-definition.interface';

/**
 * @composite
 * @stable [18.12.2019]
 */
export interface ICompositeFieldItemEntity<TCompositeFieldItemsEnum, TProps extends IFieldProps = IFieldProps>
  extends IFieldConfigurationWrapper<TProps>,
    IOrderWrapper,
    IRenderedWrapper,
    ITypeWrapper<TCompositeFieldItemsEnum> {
}

/**
 * @composite
 * @stable [18.12.2019]
 */
export interface ICompositeFieldConfigEntity<TCompositeFieldItemEntity extends ICompositeFieldItemEntity<TCompositeFieldEnum>,
  TCompositeFieldEnum>
  extends IContainerWrapper<IContainer>,
    IFieldsWrapper<TCompositeFieldItemEntity[]> {
  cronPeriodsMapper?(userPeriod: EntityIdT): CronPeriodsEnum;
}

/**
 * @composite-cron
 * @stable [18.12.2019]
 */
export enum CompositeCronFieldItemsEnum {
  CRON,
  FROM,
  PERIOD,
  TO,
}

export type CompositeCronFieldPropsT = IGenericCronEntity & IFieldProps & IBaseSelectProps; // TODO Props

/**
 * @composite-cron
 * @stable [18.12.2019]
 */
export interface ICompositeCronFieldItemEntity
  extends ICompositeFieldItemEntity<CompositeCronFieldItemsEnum, CompositeCronFieldPropsT> {
}

/**
 * @stable [18.12.2019]
 */
export interface ICompositeCronFieldConfigEntity
  extends ICompositeFieldConfigEntity<ICompositeCronFieldItemEntity, CompositeCronFieldItemsEnum>,
    IPeriodWrapper<CronPeriodsEnum>,
    IFromDateWrapper {
}
