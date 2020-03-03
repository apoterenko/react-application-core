import { IPlaceFieldProps } from '../definition';
import { mapDictionaryEntityField } from './mapper';
import {
  DictionariesEnum,
  IFieldsContainer,
} from '../definition';
import { IBaseSelectProps } from '../component/field/select/base-select.interface'; // TODO

/**
 * @stable [29.02.2020]
 * @param {IFieldsContainer} container
 * @returns {IBaseSelectProps}
 */
export const mapDictionaryFilterChangeProps = (container: IFieldsContainer): IBaseSelectProps => ({
  onDictionaryFilterChange: container.dictionaryStoreProxy.dispatchLoadDictionary,
});

/**
 * @stable [29.02.2020]
 * @param {IFieldsContainer} container
 * @returns {IPlaceFieldProps}
 */
export const mapPlaceFieldProps = (container: IFieldsContainer): IPlaceFieldProps => ({
  dictionary: DictionariesEnum.PLACES,
  ...mapDictionaryEntityField(container.props.dictionaries.places),
  ...mapDictionaryFilterChangeProps(container),
});
