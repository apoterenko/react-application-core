import { IPlaceFieldProps } from '../definition';
import { Mappers } from './mapper';
import {
  DictionariesEnum,
  IFieldsContainer,
  IGenericBaseSelectEntity,
} from '../definition';

/**
 * @stable [29.02.2020]
 * @param {IFieldsContainer} container
 * @returns {IPlaceFieldProps}
 */
export const mapPlaceFieldProps = (container: IFieldsContainer): IGenericBaseSelectEntity => ({
  dictionary: DictionariesEnum.PLACES,
  ...Mappers.dictionaryEntityAsSelectEntity(container.props.dictionaries.places),
  onDictionaryFilterChange: container.dictionaryStoreProxy.dispatchLoadDictionary,
});
