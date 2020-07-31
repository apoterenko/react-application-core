import {
  IFormContainerProps,
  IFormProps,
  IFormTabPanelContainerProps,
  IListContainerProps,
  IPageToolbarContainerProps,
  IPageToolbarProps,
  ITabPanelContainerProps,
  ITabPanelProps,
} from '../definition';
import { MapAsOriginalUtils } from './map-as-original';
import { Selectors } from './select';
import { IEntity } from '../definitions.interface';

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
 * @param pageToolbar
 */
const mapPageToolbarProps = (pageToolbar: IPageToolbarProps): IPageToolbarProps =>
  MapAsOriginalUtils.paginatedLifeCycleEntity(pageToolbar);

/**
 * @map-as-component
 *
 * @stable [31.07.2020]
 * @param props
 */
const mapFormProps = <TEntity = IEntity>(props: IFormProps<TEntity>): IFormProps<TEntity> =>
  ({
    ...MapAsOriginalUtils.extendedEntity(props),
    ...MapAsOriginalUtils.formHolderEntity(props),
  });

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
 * @param formContainerProps
 */
const mapFormContainerProps = (formContainerProps: IFormContainerProps): IFormContainerProps =>
  ({
    ...MapAsOriginalUtils.extendedEntity(formContainerProps),
    ...MapAsOriginalUtils.formHolderEntity(formContainerProps),
    ...MapAsOriginalUtils.sectionNameWrapper(formContainerProps),
  });

/**
 * @map-as-container
 *
 * @stable [31.07.2020]
 * @param props
 */
const mapListContainerProps = (props: IListContainerProps): IListContainerProps => ({
  ...MapAsOriginalUtils.listHolderEntity(props),
  ...MapAsOriginalUtils.sectionNameWrapper(props),
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
 * @param props
 */
const mapFormContainerPropsAsFormProps = (props: IFormContainerProps): IFormProps =>
  ({
    ...mapFormProps(props),
    ...props.formConfiguration,
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
  public static readonly tabPanelContainerProps = mapTabPanelContainerProps;
  public static readonly tabPanelContainerPropsAsTabPanelProps = mapTabPanelContainerPropsAsTabPanelProps;
}
