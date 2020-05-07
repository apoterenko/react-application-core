import { GenericMappers } from './mapper-generic';
import {
  IPageToolbarContainerProps,
  IPageToolbarProps,
  ISearchToolbarContainerProps,
  ISearchToolbarProps,
} from '../definition';
import { Selectors } from './select';

/**
 * @component-props-mapper
 * @stable [06.05.2020]
 *
 * @param {IPageToolbarProps} props
 * @returns {IPageToolbarProps}
 */
const mapPageToolbarProps = (props: IPageToolbarProps): IPageToolbarProps =>
  GenericMappers.paginatedLifeCycleEntity(props);

/**
 * @component-props-mapper
 * @stable [06.05.2020]
 *
 * @param {ISearchToolbarProps} props
 * @returns {ISearchToolbarProps}
 */
const mapSearchToolbarProps = (props: ISearchToolbarProps): ISearchToolbarProps =>
  GenericMappers.activeQueryEntity(props);

/**
 * @container-props-mapper
 * @stable [06.05.2020]
 *
 * @param {IPageToolbarContainerProps} props
 * @returns {IPageToolbarContainerProps}
 */
const mapPageToolbarContainerProps = (props: IPageToolbarContainerProps): IPageToolbarContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    ...GenericMappers.listWrapperEntity(props),
  });

/**
 * @container-props-mapper
 * @stable [06.05.2020]
 *
 * @param {ISearchToolbarContainerProps} props
 * @returns {ISearchToolbarContainerProps}
 */
const mapSearchToolbarContainerProps = (props: ISearchToolbarContainerProps): ISearchToolbarContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    ...GenericMappers.queryFilterEntity(props),
    ...GenericMappers.listWrapperEntity(props),
  });

/**
 * @container-component-props-mapper
 * @stable [07.05.2020]
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
 * @container-component-props-mapper
 * @stable [06.05.2020]
 *
 * @param {IPageToolbarContainerProps} props
 * @returns {IPageToolbarProps}
 */
const mapSearchToolbarContainerPropsAsSearchToolbarProps = (props: ISearchToolbarContainerProps): ISearchToolbarProps =>
  ({
    ...mapSearchToolbarProps(Selectors.queryFilter(props)),
    ...GenericMappers.listWrapperEntityAsDisabledWrapper(props),
    ...props.toolbarConfiguration,
  });

/**
 * @stable [06.05.2020]
 */
export class ComponentMappers {
  public static pageToolbarContainerProps = mapPageToolbarContainerProps;
  public static pageToolbarContainerPropsAsPageToolbarProps = mapPageToolbarContainerPropsAsPageToolbarProps;
  public static pageToolbarProps = mapPageToolbarProps;
  public static searchToolbarContainerProps = mapSearchToolbarContainerProps;
  public static searchToolbarContainerPropsAsSearchToolbarProps = mapSearchToolbarContainerPropsAsSearchToolbarProps;
  public static searchToolbarProps = mapSearchToolbarProps;
}
