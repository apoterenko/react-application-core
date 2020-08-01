import { GenericMappers } from './mapper-generic';
import {
  DictionariesEnum,
  IFieldsContainer,
  IFilterFormDialogContainerProps,
  IGenericBaseSelectEntity,
  IGenericContainer,
  ISecondaryFilterExtendedFormEntity,
  IUnsavedFormChangesDialogContainerProps,
  IUnsavedFormChangesDialogProps,
} from '../definition';
import { Selectors } from './select';
import { MapAsOriginalUtils } from './map-as-original';
import { MapAsComponentUtils } from './map-as-component';

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
 * @container-props-mapper
 * @stable [10.05.2020]
 *
 * @param {IFilterFormDialogContainerProps} props
 * @returns {IFilterFormDialogContainerProps}
 */
const mapFilterFormDialogContainerProps = (props: IFilterFormDialogContainerProps): IFilterFormDialogContainerProps =>
  MapAsComponentUtils.formContainerProps(props);

/**
 * @container-props-mapper
 * @stable [10.05.2020]
 *
 * @param {IFilterFormDialogContainerProps & ISecondaryFilterExtendedFormEntity} props
 * @returns {IFilterFormDialogContainerProps}
 */
const mapFilterFormDialogSecondaryFilterContainerProps =
  (props: IFilterFormDialogContainerProps & ISecondaryFilterExtendedFormEntity): IFilterFormDialogContainerProps =>
    ({
      ...MapAsOriginalUtils.sectionNameWrapper(props),
      ...Selectors.secondaryFilter(props),
    });

/**
 * @map-container-as-original
 * @stable [15.06.2020]
 *
 * @param {IUnsavedFormChangesDialogContainerProps} props
 * @param {IGenericContainer} proxyContainer
 * @returns {IUnsavedFormChangesDialogContainerProps}
 */
const mapUnsavedFormChangesDialogContainerProps =
  (props: IUnsavedFormChangesDialogContainerProps,
   proxyContainer: IGenericContainer): IUnsavedFormChangesDialogContainerProps =>
    ({
      ...MapAsOriginalUtils.formHolderEntity(props),
      proxyContainer,
    });

/**
 * @stable [06.05.2020]
 */
export class ComponentMappers {
  public static filterFormDialogContainerProps = mapFilterFormDialogContainerProps;                                                                                           /* @stable [10.05.2020] */
  public static filterFormDialogSecondaryFilterContainerProps = mapFilterFormDialogSecondaryFilterContainerProps;                                                             /* @stable [10.05.2020] */
  public static placeFieldProps = mapPlaceFieldProps;                                                                                                                         /* @stable [19.05.2020] */
  public static readonly unsavedFormChangesDialogContainerProps = mapUnsavedFormChangesDialogContainerProps;                                                                  /* @stable [15.06.2020] */
}
