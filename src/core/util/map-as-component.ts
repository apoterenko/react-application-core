import {
  IFormContainerProps,
  IFormTabPanelContainerProps,
  IPageToolbarContainerProps,
  IPageToolbarProps,
  ITabPanelContainerProps,
  ITabPanelProps,
} from '../definition';
import { MapAsOriginalUtils } from './map-as-original';
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
 * @param pageToolbar
 */
const mapPageToolbarProps = (pageToolbar: IPageToolbarProps): IPageToolbarProps =>
  MapAsOriginalUtils.paginatedLifeCycleEntity(pageToolbar);

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
  public static readonly formTabPanelContainerProps = mapFormTabPanelContainerProps;
  public static readonly formTabPanelContainerPropsAsTabPanelProps = mapFormTabPanelContainerPropsAsTabPanelProps;
  public static readonly pageToolbarContainerPropsAsPageToolbarProps = mapPageToolbarContainerPropsAsPageToolbarProps;
  public static readonly tabPanelContainerProps = mapTabPanelContainerProps;
  public static readonly tabPanelContainerPropsAsTabPanelProps = mapTabPanelContainerPropsAsTabPanelProps;
}
