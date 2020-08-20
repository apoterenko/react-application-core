import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
  RowUtils,
  TypeUtils,
} from '../../../util';
import { GenericBaseComponent } from '../../base/generic-base.component';
import {
  IListItemProps,
  ListClassesEnum,
  UniversalScrollableContext,
} from '../../../definition';

/**
 * @component-impl
 * @stable [17.08.2020]
 */
export class ListItem extends GenericBaseComponent<IListItemProps> {

  public static readonly defaultProps: IListItemProps = {
    hovered: true,
    iconLeftAligned: true,
  };

  /**
   * @stable [17.08.2020]
   * @param originalProps
   */
  constructor(originalProps: IListItemProps) {
    super(originalProps);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @stable [09.08.2020]
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const {
      entity,
      iconLeftAligned,
      index,
      renderer,
      tpl,
    } = originalProps;

    return (
      <UniversalScrollableContext.Consumer>
        {(selectedElementClassName) => {
          const itemProps = this.getItemProps(selectedElementClassName);

          return (
            TypeUtils.isFn(renderer)
              ? React.cloneElement(renderer(entity, index), itemProps)
              : (
                <li {...itemProps}>
                  {iconLeftAligned && this.iconElement}
                  <div
                    className={ListClassesEnum.LIST_ITEM_CONTENT}
                  >
                    {TypeUtils.isFn(tpl)
                      ? tpl(entity)
                      : this.originalChildren}
                  </div>
                  {!iconLeftAligned && this.iconElement}
                </li>
              )
          );
        }}
      </UniversalScrollableContext.Consumer>
    );
  }

  /**
   * @stable [17.08.2020]
   * @param selectedElementClassName
   */
  private getItemProps(selectedElementClassName: string): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLLIElement>, HTMLLIElement> {

    const mergedProps = this.mergedProps;
    const originalProps = this.originalProps;
    const {
      className,
      entity,
      icon,
      last,
      selected,
    } = originalProps;

    const isHovered = RowUtils.isHovered(mergedProps);
    const isOddHighlighted = RowUtils.isOddHighlighted(mergedProps);
    const isSelectable = RowUtils.isSelectable(originalProps);
    const isIndexed = RowUtils.isIndexed(originalProps);

    return (
      {
        ref: this.actualRef,
        className: ClsUtils.joinClassName(
          ListClassesEnum.LIST_ITEM,
          CalcUtils.calc(className),
          icon && ListClassesEnum.LIST_ITEM_DECORATED,
          isHovered && ListClassesEnum.LIST_ITEM_HOVERED,
          isIndexed && `${ListClassesEnum.LIST_ITEM}-${entity.id}`,
          isOddHighlighted && ListClassesEnum.LIST_ITEM_ODD,
          isSelectable && ListClassesEnum.LIST_ITEM_SELECTABLE,
          last && ListClassesEnum.LIST_ITEM_LAST,  // We can't use :not(:last-child) because of PerfectScrollbar Plugin
          ...isSelectable && (
            selected
              ? [ListClassesEnum.LIST_ITEM_SELECTED, selectedElementClassName]
              : [ListClassesEnum.LIST_ITEM_UNSELECTED]
          ) || []
        ),
        ...PropsUtils.buildClickHandlerProps(this.onClick, isSelectable, false),
      }
    );
  }

  /**
   * @stable [09.08.2020]
   */
  private onClick(): void {
    const {
      entity,
      onClick,
    } = this.originalProps;

    onClick(entity);
  }

  /**
   * @stable [17.08.2020]
   */
  private get iconElement(): JSX.Element {
    const {
      icon,
    } = this.originalProps;

    return (
      icon && this.uiFactory.makeIcon({
        type: icon,
        className: ListClassesEnum.LIST_ITEM_ICON,
      })
    );
  }

  /**
   * @stable [17.08.2020]
   */
  protected get componentsSettingsProps(): IListItemProps {
    return this.componentsSettings.listItem;
  }
}
