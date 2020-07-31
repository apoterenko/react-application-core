import { GenericMappers } from './mapper-generic';
import {
  DictionariesEnum,
  IDefaultLayoutContainerProps,
  IFieldsContainer,
  IFilterFormDialogContainerProps,
  IFormContainerProps,
  IGenericBaseSelectEntity,
  IGenericContainer,
  IListContainerProps,
  IPageToolbarContainerProps,
  IPrimaryFilterExtendedFormEntity,
  ISearchToolbarContainerProps,
  ISearchToolbarProps,
  ISecondaryFilterExtendedFormEntity,
  ISecondaryFilterFormEntity,
  IToolbarToolsContainerProps,
  IToolbarToolsProps,
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

const mapSearchToolbarProps = (props: ISearchToolbarProps): ISearchToolbarProps =>
  GenericMappers.queryFilterEntity(props);

const mapPageToolbarContainerProps = (props: IPageToolbarContainerProps): IPageToolbarContainerProps =>
  ({
    ...MapAsOriginalUtils.sectionNameWrapper(props),
    ...MapAsOriginalUtils.listHolderEntity(props),
  });

/**
 * @container-props-mapper
 * @stable [10.05.2020]
 *
 * @param {IListContainerProps} props
 * @returns {IListContainerProps}
 */
const mapListContainerProps = (props: IListContainerProps): IListContainerProps =>
  ({
    ...MapAsOriginalUtils.listHolderEntity(props),
    ...MapAsOriginalUtils.sectionNameWrapper(props),
  });

/**
 * @container-props-mapper
 * @stable [10.05.2020]
 *
 * @param {IFormContainerProps & IPrimaryFilterExtendedFormEntity} props
 * @returns {IFormContainerProps}
 */
const mapFormPrimaryFilterContainerProps = (props: IFormContainerProps & IPrimaryFilterExtendedFormEntity): IFormContainerProps =>
  ({
    ...MapAsOriginalUtils.sectionNameWrapper(props),
    ...Selectors.primaryFilter(props),
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
      ...GenericMappers.holderListEntityAsDisabled(props),
      activeTools: Selectors.activeToolbarToolsFromDirtyWrapper(Selectors.form(props)) || [],
    },
  });

/**
 * @container-props-mapper
 * @stable [10.05.2020]
 *
 * @param {IToolbarToolsContainerProps & ISecondaryFilterFormEntity} props
 * @returns {IToolbarToolsContainerProps}
 */
const mapToolbarToolsSecondaryFilterContainerProps =
  (props: IToolbarToolsContainerProps & ISecondaryFilterFormEntity): IToolbarToolsContainerProps =>
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

const mapSearchToolbarContainerProps = (props: ISearchToolbarContainerProps): ISearchToolbarContainerProps =>
  ({
    ...MapAsOriginalUtils.sectionNameWrapper(props),
    ...GenericMappers.holderQueryFilterEntity(props),
    ...MapAsOriginalUtils.listHolderEntity(props),
  });

const mapSearchToolbarContainerPropsAsSearchToolbarProps = (props: ISearchToolbarContainerProps): ISearchToolbarProps =>
  ({
    ...mapSearchToolbarProps(Selectors.queryFilter(props)),
    ...GenericMappers.holderListEntityAsDisabled(props),
    ...props.toolbarConfiguration,
  });

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
  public static formPrimaryFilterContainerProps = mapFormPrimaryFilterContainerProps;                                                                                         /* @stable [10.05.2020] */
  public static listContainerProps = mapListContainerProps;                                                                                                                   /* @stable [10.05.2020] */
  public static pageToolbarContainerProps = mapPageToolbarContainerProps;
  public static placeFieldProps = mapPlaceFieldProps;                                                                                                                         /* @stable [19.05.2020] */
  public static readonly defaultLayoutContainerProps = mapDefaultLayoutContainerProps;                                                                                        /* @stable [12.06.2020] */
  public static readonly toolbarToolsContainerPropsAsToolbarToolsProps = mapToolbarToolsContainerPropsAsToolbarToolsProps;                                                    /* @stable [12.06.2020] */
  public static readonly unsavedFormChangesDialogContainerProps = mapUnsavedFormChangesDialogContainerProps;                                                                  /* @stable [15.06.2020] */
  public static readonly unsavedFormChangesDialogContainerPropsAsUnsavedFormChangesDialogProps = mapUnsavedFormChangesDialogContainerPropsAsUnsavedFormChangesDialogProps;    /* @stable [15.05.2020] */
  public static searchToolbarContainerProps = mapSearchToolbarContainerProps;
  public static searchToolbarContainerPropsAsSearchToolbarProps = mapSearchToolbarContainerPropsAsSearchToolbarProps;
  public static toolbarToolsContainerProps = mapToolbarToolsContainerProps;                                                                                                   /* @stable [09.05.2020] */
  public static toolbarToolsSecondaryFilterContainerProps = mapToolbarToolsSecondaryFilterContainerProps;                                                                     /* @stable [10.05.2020] */
}
