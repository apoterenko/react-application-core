import {
  IFieldConfigurationWrapper,
  IFilterFnWrapper,
  ISorterWrapper,
} from './definitions.interface';
import {
  IFieldProps,
} from './definition';

export interface IFieldConfigurationEntity<TFieldProps extends IFieldProps = IFieldProps>
  extends IFieldConfigurationWrapper<IFieldProps> {
}

/**
 * @stable [05.06.2018]
 */
export interface IFilterAndSorterConfiguration extends IFilterFnWrapper,
                                                       ISorterWrapper {
}
