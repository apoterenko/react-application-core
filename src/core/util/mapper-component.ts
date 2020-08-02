import { GenericMappers } from './mapper-generic';
import {
  DictionariesEnum,
  IFieldsContainer,
  IGenericBaseSelectEntity,
} from '../definition';

/**
 * @component-props-mapper
 * @stable [19.05.2020]
 *
 * @param {IFieldsContainer} container
 * @returns {IGenericBaseSelectEntity}
 */
const mapPlaceFieldProps = (container: IFieldsContainer): IGenericBaseSelectEntity => ({
  dictionary: DictionariesEnum.PLACES,
  ...GenericMappers.dictionaryEntityAsSelectEntity(container.props.dictionaries.places),
  onDictionaryFilterChange: container.dictionaryStoreProxy.dispatchLoadDictionary,
});

/**
 * @stable [06.05.2020]
 */
export class ComponentMappers {
  public static placeFieldProps = mapPlaceFieldProps;                                                                                                                         /* @stable [19.05.2020] */
}
