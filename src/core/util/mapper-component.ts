import { GenericMappers } from './mapper-generic';
import {
  DictionariesEnum,
  IDefaultLayoutContainerProps,
  IFieldsContainer,
  IFilterFormDialogContainerProps,
  IGenericBaseSelectEntity,
  IGenericContainer,
  IReduxSecondaryFilterFormHolderEntity,
  ISecondaryFilterExtendedFormEntity,
  IToolbarToolsContainerProps,
  IToolbarToolsProps,
  IUnsavedFormChangesDialogContainerProps,
  IUnsavedFormChangesDialogProps,
} from '../definition';
import { Selectors } from './select';
import { MapAsOriginalUtils } from './map-as-original';
import { MapAsComponentUtils } from './map-as-component';
import { MapAsUtils } from './map-as';

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
 * @container-props-mapper
 * @stable [09.05.2020]
 *
 * @param {IToolbarToolsContainerProps} props
 * @returns {IToolbarToolsContainerProps}
 */
const mapToolbarToolsContainerProps = (props: IToolbarToolsContainerProps): IToolbarToolsContainerProps =>
  ({
    ...MapAsOriginalUtils.sectionNameWrapper(props),
    toolbarTools: {
      ...MapAsUtils.listHolderEntityAsDisabled(props),
      activeTools: Selectors.activeToolbarToolsFromDirtyWrapper(Selectors.form(props)) || [],
    },
  });

/**
 * @container-props-mapper
 * @stable [10.05.2020]
 *
 * @param {IToolbarToolsContainerProps & IReduxSecondaryFilterFormHolderEntity} props
 * @returns {IToolbarToolsContainerProps}
 */
const mapToolbarToolsSecondaryFilterContainerProps =
  (props: IToolbarToolsContainerProps & IReduxSecondaryFilterFormHolderEntity): IToolbarToolsContainerProps =>
    mapToolbarToolsContainerProps({
      ...asToolbarToolsContainerProps(props),
      ...GenericMappers.secondaryFilterFormEntityAsHolderFormEntity(props),
    });

/**
 * @container-props-as
 * @stable [09.05.2020]
 *
 * @param {TProps} props
 * @returns {IToolbarToolsContainerProps}
 */
const asToolbarToolsContainerProps =
  <TProps>(props: TProps): IToolbarToolsContainerProps => props as IToolbarToolsContainerProps;

/**
 * @map-container-as-component
 * @stable [15.06.2020]
 *
 * @param {IUnsavedFormChangesDialogContainerProps} props
 * @returns {IUnsavedFormChangesDialogProps}
 */
const mapUnsavedFormChangesDialogContainerPropsAsUnsavedFormChangesDialogProps =
  (props: IUnsavedFormChangesDialogContainerProps): IUnsavedFormChangesDialogProps =>
    ({
      ...MapAsOriginalUtils.formHolderEntity(props),
      ...props.dialogConfiguration,
    });

/**
 * @map-container-as-component
 * @stable [10.06.2020]
 *
 * @param {IToolbarToolsContainerProps} props
 * @returns {IToolbarToolsProps}
 */
const mapToolbarToolsContainerPropsAsToolbarToolsProps = (props: IToolbarToolsContainerProps): IToolbarToolsProps =>
  ({
    ...props.toolbarTools,
    ...props.toolbarToolsConfiguration,
  });

/**
 * @map-container-as-original
 * @stable [12.06.2020]
 *
 * @param {IDefaultLayoutContainerProps} entity
 * @returns {IDefaultLayoutContainerProps}
 */
const mapDefaultLayoutContainerProps = (entity: IDefaultLayoutContainerProps): IDefaultLayoutContainerProps =>
  ({
    ...MapAsOriginalUtils.sectionNameWrapper(entity),
    ...MapAsOriginalUtils.storeEntity(entity),
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
  public static readonly defaultLayoutContainerProps = mapDefaultLayoutContainerProps;                                                                                        /* @stable [12.06.2020] */
  public static readonly toolbarToolsContainerPropsAsToolbarToolsProps = mapToolbarToolsContainerPropsAsToolbarToolsProps;                                                    /* @stable [12.06.2020] */
  public static readonly unsavedFormChangesDialogContainerProps = mapUnsavedFormChangesDialogContainerProps;                                                                  /* @stable [15.06.2020] */
  public static readonly unsavedFormChangesDialogContainerPropsAsUnsavedFormChangesDialogProps = mapUnsavedFormChangesDialogContainerPropsAsUnsavedFormChangesDialogProps;    /* @stable [15.05.2020] */
  public static toolbarToolsContainerProps = mapToolbarToolsContainerProps;                                                                                                   /* @stable [09.05.2020] */
  public static toolbarToolsSecondaryFilterContainerProps = mapToolbarToolsSecondaryFilterContainerProps;                                                                     /* @stable [10.05.2020] */
}
