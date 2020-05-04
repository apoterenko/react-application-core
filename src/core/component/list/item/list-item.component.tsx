import * as React from 'react';

import {
  calc,
  handlerPropsFactory,
  isDisabled,
  isFn,
  isHovered,
  isIconLeftAligned,
  isLast,
  isOdd,
  isSelectable,
  isSelected,
  joinClassName,
  mergeWithSystemProps,
} from '../../../util';
import { GenericBaseComponent } from '../../base/generic-base.component';
import {
  IListItemProps,
  ListClassesEnum,
  UniversalScrollableContext,
} from '../../../definition';
import { ISelectedElementClassNameWrapper } from '../../../definitions.interface';

export class ListItem extends GenericBaseComponent<IListItemProps> {

  /**
   * @stable [04.05.2020]
   * @param {IListItemProps} props
   */
  constructor(props: IListItemProps) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * @stable [23.09.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;

    return (
      <UniversalScrollableContext.Consumer>
        {(selectedElementClassName) => (
          isFn(mergedProps.renderer)
            ? React.cloneElement(
                mergedProps.renderer(mergedProps.rawData, mergedProps.index),
                this.getItemProps({selectedElementClassName})
              )
            : (
              <li {...this.getItemProps({selectedElementClassName})}>
                {isIconLeftAligned(mergedProps) && this.iconElement}
                <div className={ListClassesEnum.LIST_ITEM_CONTENT}>
                  {
                    isFn(mergedProps.tpl)
                      ? mergedProps.tpl(mergedProps.rawData)
                      : this.props.children
                  }
                </div>
                {!isIconLeftAligned(mergedProps) && this.iconElement}
              </li>
            )
        )}
      </UniversalScrollableContext.Consumer>
    );
  }

  /**
   * @stable [04.05.2020]
   * @param {ISelectedElementClassNameWrapper} context
   * @returns {React.DetailedHTMLProps<React.HTMLAttributes<HTMLLIElement>, HTMLLIElement>}
   */
  private getItemProps(context: ISelectedElementClassNameWrapper): React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    const mergedProps = this.mergedProps;
    const selectable = isSelectable(mergedProps);

    return (
      {
        ref: this.selfRef,
        className: joinClassName(
          ListClassesEnum.LIST_ITEM,
          calc(mergedProps.className),
          selectable && ListClassesEnum.LIST_ITEM_SELECTABLE,
          mergedProps.icon && ListClassesEnum.LIST_ITEM_DECORATED,
          isOdd(mergedProps) && ListClassesEnum.LIST_ITEM_ODD,
          isHovered(mergedProps) && ListClassesEnum.LIST_ITEM_HOVERED,
          isLast(mergedProps) && ListClassesEnum.LIST_ITEM_LAST,  // We can't use :not(:last-child) because of PerfectScrollbar Plugin
          ...(
            selectable && (
              isSelected(mergedProps)
                ? [ListClassesEnum.LIST_ITEM_SELECTED, context.selectedElementClassName]
                : [ListClassesEnum.LIST_ITEM_UNSELECTED]
            )
          )
        ),
        ...handlerPropsFactory(
          this.onClick,
          !isDisabled(mergedProps) && selectable && isFn(mergedProps.onClick),
          false
        ),
      }
    );
  }

  /**
   * @stable [27.10.2019]
   */
  private onClick(): void {
    const mergedProps = this.mergedProps;
    mergedProps.onClick(mergedProps.rawData);
  }

  /**
   * @stable [12.02.2020]
   * @returns {JSX.Element}
   */
  private get iconElement(): JSX.Element {
    const icon = this.mergedProps.icon;
    return (
      icon && this.uiFactory.makeIcon({
        type: icon,
        className: ListClassesEnum.LIST_ITEM_ICON,
      })
    );
  }

  /**
   * @stable [04.05.2020]
   * @returns {IListItemProps}
   */
  private get mergedProps(): IListItemProps {
    return mergeWithSystemProps(this.props, this.settings.components.listItem);
  }
}
