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
  isSelected,
  joinClassName,
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
    const props = this.props;

    return (
      <UniversalScrollableContext.Consumer>
        {(selectedElementClassName) => (
          isFn(props.renderer)
            ? React.cloneElement(
                props.renderer(props.rawData, props.index),
                this.getItemProps({selectedElementClassName})
              )
            : (
              <li {...this.getItemProps({selectedElementClassName})}>
                {isIconLeftAligned(props) && this.iconElement}
                <div className={ListClassesEnum.LIST_ITEM_CONTENT}>
                  {
                    isFn(props.tpl)
                      ? props.tpl(props.rawData)
                      : props.children
                  }
                </div>
                {!isIconLeftAligned(props) && this.iconElement}
              </li>
            )
        )}
      </UniversalScrollableContext.Consumer>
    );
  }

  /**
   * @stable [27.10.2019]
   * @param {ISelectedElementClassNameWrapper} context
   * @returns {React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>}
   */
  private getItemProps(context: ISelectedElementClassNameWrapper): React.DetailedHTMLProps<
    React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    const props = this.props;
    return (
      {
        ref: this.selfRef,
        className: joinClassName(
          ListClassesEnum.LIST_ITEM,
          calc(props.className),
          props.icon && ListClassesEnum.LIST_ITEM_DECORATED,
          isOdd(props) && ListClassesEnum.LIST_ITEM_ODD,
          isHovered(props) && ListClassesEnum.LIST_ITEM_HOVERED,
          isLast(props) && ListClassesEnum.LIST_ITEM_LAST,  // We can't use :not(:last-child) because of PerfectScrollbar Plugin
          ...(
            isSelected(props)
              ? [ListClassesEnum.LIST_ITEM_SELECTED, context.selectedElementClassName]
              : [ListClassesEnum.LIST_ITEM_UNSELECTED]
          )
        ),
        ...handlerPropsFactory(this.onClick, !isDisabled(props) && isFn(props.onClick), false),
      }
    );
  }

  /**
   * @stable [12.02.2020]
   * @returns {JSX.Element}
   */
  private get iconElement(): JSX.Element {
    const icon = this.props.icon;
    return (
      icon && this.uiFactory.makeIcon({
        type: icon,
        className: ListClassesEnum.LIST_ITEM_ICON,
      })
    );
  }

  /**
   * @stable [27.10.2019]
   */
  private onClick(): void {
    const props = this.props;
    props.onClick(props.rawData);
  }
}
