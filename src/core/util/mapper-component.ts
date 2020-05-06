import { GenericMappers } from './mapper-generic';
import {
  IPageToolbarContainerProps,
  IPageToolbarProps,
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
 * @container-component-props-mapper
 * @stable [06.05.2020]
 *
 * @param {IPageToolbarContainerProps} props
 * @returns {IPageToolbarProps}
 */
const mapPageToolbarContainerPropsAsPageToolbarProps = (props: IPageToolbarContainerProps): IPageToolbarProps =>
  mapPageToolbarProps(Selectors.list(props));

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
 * @stable [06.05.2020]
 */
export class ComponentMappers {

  public static pageToolbarContainerProps = mapPageToolbarContainerProps;
  public static pageToolbarContainerPropsAsPageToolbarProps = mapPageToolbarContainerPropsAsPageToolbarProps;
  public static pageToolbarProps = mapPageToolbarProps;
}
