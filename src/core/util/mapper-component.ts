import { GenericMappers } from './mapper-generic';
import {
  DictionariesEnum,
  IDefaultLayoutContainerProps,
  IFieldsContainer,
  IFilterFormDialogContainerProps,
  IFormContainerProps,
  IFormProps,
  IGenericBaseSelectEntity,
  IGenericContainer,
  IListContainerProps,
  IPageToolbarContainerProps,
  IPageToolbarProps,
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
import { IEntity } from '../definitions.interface';

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
 * @component-props-mapper
 * @stable [09.05.2020]
 *
 * @param {IFormProps<TEntity>} props
 * @returns {IFormProps<TEntity>}
 */
const mapFormProps = <TEntity = IEntity>(props: IFormProps<TEntity>): IFormProps<TEntity> =>
  ({
    ...GenericMappers.extendedEntity(props),
    ...GenericMappers.holderFormEntity(props),
  });

/**
 * @map-component-as-original
 * @stable [10.06.2020]
 *
 * @param {IPageToolbarProps} props
 * @returns {IPageToolbarProps}
 */
const mapPageToolbarProps = (props: IPageToolbarProps): IPageToolbarProps =>
  GenericMappers.paginatedLifeCycleEntity(props);

const mapSearchToolbarProps = (props: ISearchToolbarProps): ISearchToolbarProps =>
  GenericMappers.activeQueryEntity(props);

const mapPageToolbarContainerProps = (props: IPageToolbarContainerProps): IPageToolbarContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    ...GenericMappers.holderListEntity(props),
  });

/**
 * @container-props-mapper
 * @stable [09.05.2020]
 *
 * @param {IFormContainerProps} props
 * @returns {IFormContainerProps}
 */
const mapFormContainerProps = (props: IFormContainerProps): IFormContainerProps =>
  ({
    ...GenericMappers.extendedEntity(props),
    ...GenericMappers.holderFormEntity(props),
    ...GenericMappers.sectionNameWrapper(props),
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
    ...GenericMappers.holderListEntity(props),
    ...GenericMappers.sectionNameWrapper(props),
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
    ...GenericMappers.sectionNameWrapper(props),
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
  mapFormContainerProps(props);

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
      ...GenericMappers.sectionNameWrapper(props),
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
    ...GenericMappers.sectionNameWrapper(props),
    toolbarTools: {
      ...GenericMappers.listEntityAsDisabled(props),
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
      ...GenericMappers.secondaryFilterFormEntityAsFormEntity(props),
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
    ...GenericMappers.sectionNameWrapper(props),
    ...GenericMappers.queryFilterEntity(props),
    ...GenericMappers.holderListEntity(props),
  });

const mapSearchToolbarContainerPropsAsSearchToolbarProps = (props: ISearchToolbarContainerProps): ISearchToolbarProps =>
  ({
    ...mapSearchToolbarProps(Selectors.queryFilter(props)),
    ...GenericMappers.listEntityAsDisabled(props),
    ...props.toolbarConfiguration,
  });

/**
 * @map-container-as-component
 * @stable [10.06.2020]
 *
 * @param {IPageToolbarContainerProps} props
 * @returns {IPageToolbarProps}
 */
const mapPageToolbarContainerPropsAsPageToolbarProps = (props: IPageToolbarContainerProps): IPageToolbarProps =>
  ({
    ...mapPageToolbarProps(Selectors.list(props)),
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
      ...GenericMappers.holderFormEntity(props),
      ...props.dialogConfiguration,
    });

/**
 * @container-component-props-mapper
 * @stable [09.05.2020]
 * @param {IFormContainerProps} props
 * @returns {IFormProps}
 */
const mapFormContainerPropsAsFormProps = (props: IFormContainerProps): IFormProps =>
  ({
    ...mapFormProps(props),
    ...props.formConfiguration,
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
    ...GenericMappers.sectionNameWrapper(entity),
    ...GenericMappers.storeEntity(entity),
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
      ...GenericMappers.holderFormEntity(props),
      proxyContainer,
    });

/**
 * @stable [06.05.2020]
 */
export class ComponentMappers {
  public static filterFormDialogContainerProps = mapFilterFormDialogContainerProps;                                                                                           /* @stable [10.05.2020] */
  public static filterFormDialogSecondaryFilterContainerProps = mapFilterFormDialogSecondaryFilterContainerProps;                                                             /* @stable [10.05.2020] */
  public static formContainerProps = mapFormContainerProps;                                                                                                                   /* @stable [10.05.2020] */
  public static formContainerPropsAsFormProps = mapFormContainerPropsAsFormProps;                                                                                             /* @stable [10.05.2020] */
  public static formPrimaryFilterContainerProps = mapFormPrimaryFilterContainerProps;                                                                                         /* @stable [10.05.2020] */
  public static listContainerProps = mapListContainerProps;                                                                                                                   /* @stable [10.05.2020] */
  public static pageToolbarContainerProps = mapPageToolbarContainerProps;
  public static pageToolbarContainerPropsAsPageToolbarProps = mapPageToolbarContainerPropsAsPageToolbarProps;
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
