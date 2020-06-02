import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
  TypeUtils,
  WrapperUtils,
} from '../../../util';
import { GenericBaseComponent } from '../../base/generic-base.component';
import {
  IListItemProps,
  ListClassesEnum,
  UniversalScrollableContext,
} from '../../../definition';
import { ISelectedElementClassNameWrapper } from '../../../definitions.interface';

/**
 * @component-impl
 * @stable [01.06.2020]
 */
export class ListItem extends GenericBaseComponent<IListItemProps> {

  /**
   * @stable [01.06.2020]
   * @param {IListItemProps} props
   */
  constructor(props: IListItemProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @stable [01.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;
    const {
      index,
      rawData,
      renderer,
      tpl,
    } = mergedProps;

    return (
      <UniversalScrollableContext.Consumer>
        {(selectedElementClassName) => {
          const itemProps = this.getItemProps({selectedElementClassName}, mergedProps);

          return (
            TypeUtils.isFn(renderer)
              ? React.cloneElement(renderer(rawData, index), itemProps)
              : (
                <li {...itemProps}>
                  {WrapperUtils.isIconLeftAligned(mergedProps) && this.getIconElement(mergedProps)}
                  <div className={ListClassesEnum.LIST_ITEM_CONTENT}>
                    {
                      TypeUtils.isFn(tpl)
                        ? tpl(rawData)
                        : this.props.children
                    }
                  </div>
                  {!WrapperUtils.isIconLeftAligned(mergedProps) && this.getIconElement(mergedProps)}
                </li>
              )
          );
        }}
      </UniversalScrollableContext.Consumer>
    );
  }

  /**
   * @stable [01.06.2020]
   * @param {ISelectedElementClassNameWrapper} context
   * @param {IListItemProps} mergedProps
   * @returns {React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>}
   */
  private getItemProps(context: ISelectedElementClassNameWrapper,
                       mergedProps: IListItemProps): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLLIElement>, HTMLLIElement> {

    const {
      className,
      icon,
      onClick,
    } = mergedProps;

    const {
      selectedElementClassName,
    } = context;

    const isSelectable = WrapperUtils.isSelectable(mergedProps);

    return (
      {
        ref: this.actualRef,
        className: ClsUtils.joinClassName(
          ListClassesEnum.LIST_ITEM,
          CalcUtils.calc(className),
          isSelectable && ListClassesEnum.LIST_ITEM_SELECTABLE,
          icon && ListClassesEnum.LIST_ITEM_DECORATED,
          WrapperUtils.isOdd(mergedProps) && ListClassesEnum.LIST_ITEM_ODD,
          WrapperUtils.isHovered(mergedProps) && ListClassesEnum.LIST_ITEM_HOVERED,
          WrapperUtils.isLast(mergedProps) && ListClassesEnum.LIST_ITEM_LAST,  // We can't use :not(:last-child) because of PerfectScrollbar Plugin
          ...(
            isSelectable && (
              WrapperUtils.isSelected(mergedProps)
                ? [ListClassesEnum.LIST_ITEM_SELECTED, selectedElementClassName]
                : [ListClassesEnum.LIST_ITEM_UNSELECTED]
            )
          )
        ),
        ...PropsUtils.buildClickHandlerProps(
          this.onClick,
          TypeUtils.isFn(onClick) && !WrapperUtils.isDisabled(mergedProps) && isSelectable,
          false
        ),
      }
    );
  }

  /**
   * @stable [01.06.2020]
   */
  private onClick(): void {
    const {
      onClick,
      rawData,
    } = this.mergedProps;

    onClick(rawData);
  }

  /**
   * @stable [01.06.2020]
   * @param {IListItemProps} mergedProps
   * @returns {JSX.Element}
   */
  private getIconElement(mergedProps: IListItemProps): JSX.Element {
    const {
      icon,
    } = mergedProps;

    return (
      icon && this.uiFactory.makeIcon({
        type: icon,
        className: ListClassesEnum.LIST_ITEM_ICON,
      })
    );
  }

  /**
   * @stable [02.06.2020]
   * @returns {IListItemProps}
   */
  protected get settingsProps(): IListItemProps {
    return this.componentsSettings.listItem;
  }
}
