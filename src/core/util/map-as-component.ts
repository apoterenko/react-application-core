import {
  IFormContainerProps,
  IFormProps,
  IFormTabPanelContainerProps,
  IListContainerProps,
  IPageToolbarContainerProps,
  IPageToolbarProps,
  IPrimaryFilterExtendedFormEntity,
  ISearchToolbarContainerProps,
  ISearchToolbarProps,
  ISecondaryFilterExtendedFormEntity,
  ITabPanelContainerProps,
  ITabPanelProps,
  IToolbarToolsContainerProps,
  IToolbarToolsProps,
} from '../definition';
import {
  IEntity,
  ISectionNameWrapper,
  UNDEF_SYMBOL,
} from '../definitions.interface';
import { ConditionUtils } from './cond';
import { FilterUtils } from './filter';
import { MapAsOriginalUtils } from './map-as-original';
import { MapAsUtils } from './map-as';
import { Selectors } from './select';

/**
 * @map-as-component
 *
 * @stable [30.07.2020]
 * @param tabPanel
 */
const mapTabPanelProps = (tabPanel: ITabPanelProps): ITabPanelProps =>
  MapAsOriginalUtils.activeValueHolderEntity(tabPanel);

/**
 * @map-as-component
 *
 * @stable [31.07.2020]
 * @param searchToolbar
 */
const mapSearchToolbarProps = (searchToolbar: ISearchToolbarProps): ISearchToolbarProps =>
  MapAsOriginalUtils.queryFilterEntity(searchToolbar);

/**
 * @map-as-component
 *
 * @stable [31.07.2020]
 * @param pageToolbar
 */
const mapPageToolbarProps = (pageToolbar: IPageToolbarProps): IPageToolbarProps =>
  MapAsOriginalUtils.paginatedLifeCycleEntity(pageToolbar);

/**
 * @map-as-component
 *
 * @stable [31.07.2020]
 * @param form
 */
const mapFormProps = <TEntity = IEntity>(form: IFormProps<TEntity>): IFormProps<TEntity> =>
  MapAsOriginalUtils.extendedFormEntity(form);

/**
 * @map-as-component
 *
 * @stable [01.08.2020]
 * @param toolbarTools
 */
const mapToolbarToolsProps = (toolbarTools: IToolbarToolsProps): IToolbarToolsProps =>
  ConditionUtils.ifNotNilThanValue(
    toolbarTools,
    () => FilterUtils.defValuesFilter<IToolbarToolsProps, IToolbarToolsProps>({
      disabled: toolbarTools.disabled,
      activeTools: toolbarTools.activeTools,
    }),
    UNDEF_SYMBOL
  );

/**
 * @map-as-container
 *
 * @stable [30.07.2020]
 * @param tabPanelContainer
 */
const mapTabPanelContainerProps = (tabPanelContainer: ITabPanelContainerProps): ITabPanelContainerProps => ({
  ...MapAsOriginalUtils.tabPanelHolderEntity(tabPanelContainer),
  ...MapAsOriginalUtils.sectionNameWrapper(tabPanelContainer),
});

/**
 * @map-as-container
 *
 * @stable [31.07.2020]
 * @param pageToolbarContainer
 */
const mapPageToolbarContainerProps = (pageToolbarContainer: IPageToolbarContainerProps): IPageToolbarContainerProps => ({
  ...MapAsOriginalUtils.listHolderEntity(pageToolbarContainer),
  ...MapAsOriginalUtils.sectionNameWrapper(pageToolbarContainer),
});

/**
 * @map-as-container
 *
 * @stable [30.07.2020]
 * @param formTabPanelContainer
 */
const mapFormTabPanelContainerProps = (formTabPanelContainer: IFormTabPanelContainerProps): IFormTabPanelContainerProps => ({
  ...MapAsOriginalUtils.formHolderEntity(formTabPanelContainer),
  ...MapAsOriginalUtils.sectionNameWrapper(formTabPanelContainer),
});

/**
 * @map-as-container
 *
 * @stable [30.07.2020]
 * @param formContainer
 */
const mapFormContainerProps = (formContainer: IFormContainerProps): IFormContainerProps =>
  ({
    ...MapAsOriginalUtils.extendedFormEntity(formContainer),
    ...MapAsOriginalUtils.sectionNameWrapper(formContainer),
  });

/**
 * @map-as-container
 *
 * @stable [31.07.2020]
 * @param listContainer
 */
const mapListContainerProps = (listContainer: IListContainerProps): IListContainerProps => ({
  ...MapAsOriginalUtils.listHolderEntity(listContainer),
  ...MapAsOriginalUtils.sectionNameWrapper(listContainer),
});

/**
 * @map-as-container
 *
 * @stable [31.07.2020]
 * @param searchToolbarContainer
 */
const mapSearchToolbarContainerProps = (searchToolbarContainer: ISearchToolbarContainerProps): ISearchToolbarContainerProps => ({
  ...MapAsOriginalUtils.listHolderEntity(searchToolbarContainer),
  ...MapAsOriginalUtils.queryFilterHolderEntity(searchToolbarContainer),
  ...MapAsOriginalUtils.sectionNameWrapper(searchToolbarContainer),
});

/**
 * @map-as-container
 *
 * @stable [01.08.2020]
 * @param toolbarToolsContainer
 */
const mapToolbarToolsContainerProps = (toolbarToolsContainer: IToolbarToolsContainerProps): IToolbarToolsContainerProps => ({
  ...MapAsOriginalUtils.formHolderEntity(toolbarToolsContainer),
  ...MapAsOriginalUtils.listHolderEntity(toolbarToolsContainer),
  ...MapAsOriginalUtils.sectionNameWrapper(toolbarToolsContainer),
});

/**
 * @map-container-as-component
 *
 * @stable [30.07.2020]
 * @param tabPanelContainer
 */
const mapTabPanelContainerPropsAsTabPanelProps = (tabPanelContainer: ITabPanelContainerProps): ITabPanelProps => ({
  ...mapTabPanelProps(Selectors.tabPanel(tabPanelContainer)),
  ...tabPanelContainer.tabPanelConfiguration,
});

/**
 * @map-container-as-component
 *
 * @stable [30.07.2020]
 * @param formTabPanelContainer
 */
const mapFormTabPanelContainerPropsAsTabPanelProps = (formTabPanelContainer: IFormTabPanelContainerProps): ITabPanelProps => ({
  ...mapTabPanelProps(Selectors.form(formTabPanelContainer)),
  ...formTabPanelContainer.tabPanelConfiguration,
});

/**
 * @map-container-as-component
 *
 * @stable [31.07.2020]
 * @param formContainer
 */
const mapFormContainerPropsAsFormProps = (formContainer: IFormContainerProps): IFormProps => ({
  ...mapFormProps(formContainer),
  ...formContainer.formConfiguration,
});

/**
 * @map-container-as-component
 *
 * @stable [31.07.2020]
 * @param pageToolbarContainer
 */
const mapPageToolbarContainerPropsAsPageToolbarProps = (pageToolbarContainer: IPageToolbarContainerProps): IPageToolbarProps =>
  ({
    ...mapPageToolbarProps(Selectors.list(pageToolbarContainer)),
    ...pageToolbarContainer.toolbarConfiguration,
  });

/**
 * @map-container-as-component
 *
 * @stable [31.07.2020]
 * @param searchToolbarContainer
 */
const mapSearchToolbarContainerPropsAsSearchToolbarProps = (searchToolbarContainer: ISearchToolbarContainerProps): ISearchToolbarProps => ({
  ...mapSearchToolbarProps(Selectors.queryFilter(searchToolbarContainer)),
  ...searchToolbarContainer.toolbarConfiguration,
  ...MapAsUtils.listHolderEntityAsDisabled(searchToolbarContainer),
});

/**
 * @map-container-as-component
 *
 * @stable [01.08.2020]
 * @param toolbarToolsContainer
 */
const mapToolbarToolsContainerPropsAsToolbarToolsProps = (toolbarToolsContainer: IToolbarToolsContainerProps): IToolbarToolsProps => ({
  ...mapToolbarToolsProps({
    activeTools: Selectors.activeToolbarToolsFromDirtyWrapper(Selectors.form(toolbarToolsContainer)),
  }),
  ...toolbarToolsContainer.toolbarToolsConfiguration,
  ...MapAsUtils.listHolderEntityAsDisabled(toolbarToolsContainer),
});

/**
 * @map-entity-as-container
 *
 * @stable [31.07.2020]
 * @param entity
 */
const mapPrimaryFilterExtendedFormEntityAsFormContainerProps =
  <TValue = IEntity>(entity: ISectionNameWrapper & IPrimaryFilterExtendedFormEntity<TValue>): IFormContainerProps => ({
    ...MapAsOriginalUtils.sectionNameWrapper(entity),
    ...Selectors.primaryFilter(entity),
  });

/**
 * @map-entity-as-container
 *
 * @stable [31.07.2020]
 * @param entity
 */
const mapSecondaryFilterExtendedFormEntityAsFormContainerProps =
  <TValue = IEntity>(entity: ISectionNameWrapper & ISecondaryFilterExtendedFormEntity<TValue>): IFormContainerProps => ({
    ...MapAsOriginalUtils.sectionNameWrapper(entity),
    ...Selectors.secondaryFilter(entity),
  });

/**
 * @stable [30.07.2020]
 */
export class MapAsComponentUtils {
  public static readonly formContainerProps = mapFormContainerProps;
  public static readonly formContainerPropsAsFormProps = mapFormContainerPropsAsFormProps;
  public static readonly formTabPanelContainerProps = mapFormTabPanelContainerProps;
  public static readonly formTabPanelContainerPropsAsTabPanelProps = mapFormTabPanelContainerPropsAsTabPanelProps;
  public static readonly listContainerProps = mapListContainerProps;
  public static readonly pageToolbarContainerProps = mapPageToolbarContainerProps;
  public static readonly pageToolbarContainerPropsAsPageToolbarProps = mapPageToolbarContainerPropsAsPageToolbarProps;
  public static readonly primaryFilterExtendedFormEntityAsFormContainerProps = mapPrimaryFilterExtendedFormEntityAsFormContainerProps;
  public static readonly searchToolbarContainerProps = mapSearchToolbarContainerProps;
  public static readonly searchToolbarContainerPropsAsSearchToolbarProps = mapSearchToolbarContainerPropsAsSearchToolbarProps;
  public static readonly secondaryFilterExtendedFormEntityAsFormContainerProps = mapSecondaryFilterExtendedFormEntityAsFormContainerProps;
  public static readonly tabPanelContainerProps = mapTabPanelContainerProps;
  public static readonly tabPanelContainerPropsAsTabPanelProps = mapTabPanelContainerPropsAsTabPanelProps;
  public static readonly toolbarToolsContainerProps = mapToolbarToolsContainerProps;
  public static readonly toolbarToolsContainerPropsAsToolbarToolsProps = mapToolbarToolsContainerPropsAsToolbarToolsProps;
}
