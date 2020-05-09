import { GenericMappers } from './mapper-generic';
import {
  IFilterFormDialogContainerProps,
  IFormContainerProps,
  IFormProps,
  IListContainerProps,
  IPageToolbarContainerProps,
  IPageToolbarProps,
  ISearchToolbarContainerProps,
  ISearchToolbarProps,
  IToolbarToolsContainerProps,
} from '../definition';
import { Selectors } from './select';
import { IEntity } from '../definitions.interface';

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
    ...GenericMappers.formEntity(props),
  });

const mapPageToolbarProps = (props: IPageToolbarProps): IPageToolbarProps =>
  GenericMappers.paginatedLifeCycleEntity(props);

const mapSearchToolbarProps = (props: ISearchToolbarProps): ISearchToolbarProps =>
  GenericMappers.activeQueryEntity(props);

const mapPageToolbarContainerProps = (props: IPageToolbarContainerProps): IPageToolbarContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    ...GenericMappers.listEntity(props),
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
    ...GenericMappers.formEntity(props),
    ...GenericMappers.sectionNameWrapper(props),
  });

/**
 * @container-props-mapper
 * @stable [09.05.2020]
 *
 * @param {IFilterFormDialogContainerProps} props
 * @returns {IFilterFormDialogContainerProps}
 */
const mapFilterFormDialogContainerProps = (props: IFilterFormDialogContainerProps): IFilterFormDialogContainerProps =>
  mapFormContainerProps(props);

export const mapListContainerProps = (props: IListContainerProps): IListContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    ...GenericMappers.listEntity(props),
  });

const mapSearchToolbarContainerProps = (props: ISearchToolbarContainerProps): ISearchToolbarContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    ...GenericMappers.queryFilterEntity(props),
    ...GenericMappers.listEntity(props),
  });

const mapSearchToolbarContainerPropsAsSearchToolbarProps = (props: ISearchToolbarContainerProps): ISearchToolbarProps =>
  ({
    ...mapSearchToolbarProps(Selectors.queryFilter(props)),
    ...GenericMappers.listEntityAsDisabled(props),
    ...props.toolbarConfiguration,
  });

export const mapToolbarToolsContainerProps = (props: IToolbarToolsContainerProps): IToolbarToolsContainerProps =>
  ({
    ...GenericMappers.sectionNameWrapper(props),
    toolbarTools: {
      ...GenericMappers.listEntityAsDisabled(props),
      activeTools: Selectors.activeToolbarToolsFromDirtyWrapper(Selectors.form(props)) || [],
    },
  });

const mapPageToolbarContainerPropsAsPageToolbarProps = (props: IPageToolbarContainerProps): IPageToolbarProps =>
  ({
    ...mapPageToolbarProps(Selectors.list(props)),
    ...props.toolbarConfiguration,
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
 * @stable [06.05.2020]
 */
export class ComponentMappers {
  public static filterFormDialogContainerProps = mapFilterFormDialogContainerProps;
  public static formContainerProps = mapFormContainerProps;
  public static formContainerPropsAsFormProps = mapFormContainerPropsAsFormProps;
  public static pageToolbarContainerProps = mapPageToolbarContainerProps;
  public static pageToolbarContainerPropsAsPageToolbarProps = mapPageToolbarContainerPropsAsPageToolbarProps;
  public static pageToolbarProps = mapPageToolbarProps;
  public static searchToolbarContainerProps = mapSearchToolbarContainerProps;
  public static searchToolbarContainerPropsAsSearchToolbarProps = mapSearchToolbarContainerPropsAsSearchToolbarProps;
  public static searchToolbarProps = mapSearchToolbarProps;
  public static toolbarToolsContainerProps = mapToolbarToolsContainerProps;
}
