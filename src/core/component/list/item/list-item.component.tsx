import * as React from 'react';
import * as R from 'ramda';

import { IListItemProps } from './list-item.interface';
import { joinClassName, handlerPropsFactory, calc, isFn } from '../../../util';
import { ListItemGraphic, ListItemText } from '../../list';
import { UNIVERSAL_SELECTED_ELEMENT_SELECTOR } from '../../../definitions.interface';
import { UniversalComponent } from '../../base';

export class ListItem extends UniversalComponent<IListItemProps> {

  /**
   * @stable [23.09.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return props.renderer
      ? React.cloneElement(props.renderer(props.rawData, props.index), this.itemProps)
      : (
        <li {...this.itemProps}>
          {
            props.icon && (
              <ListItemGraphic>
                {this.uiFactory.makeIcon(props.icon)}
              </ListItemGraphic>
            )
          }
          <ListItemText>
            {
              isFn(props.tpl)
                ? props.tpl(props.rawData)
                : props.children
            }
          </ListItemText>
        </li>
      );
  }

  /**
   * @stable [23.09.2019]
   * @returns {React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>}
   */
  private get itemProps(): React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement> {
    const props = this.props;
    return (
      {
        ref: this.selfRef,
        className: joinClassName(
          'rac-list-item',
          props.selected
            ? `rac-list-item-selected ${UNIVERSAL_SELECTED_ELEMENT_SELECTOR}`
            : 'rac-list-item-unselected',
          props.className,
          calc(props.toClassName, props.rawData),
          'rac-flex',
          'rac-flex-row',
          'rac-flex-align-items-center'
        ),
        ...handlerPropsFactory<HTMLLIElement>(
          () => props.onClick(props.rawData),
          !props.disabled && !R.isNil(props.onClick),
          false
        ),
      }
    );
  }
}
