import * as React from 'react';

import { BaseComponent } from '../../base';
import { IListItem } from './list-item.interface';
import { IListItemProps } from './list-item.interface';
import { ListItemGraphic, ListItemText } from '../../list';
import { orNull, joinClassName, ifNotNilThanValue, handlerPropsFactory } from '../../../util';
import { UNIVERSAL_SELECTED_ELEMENT_SELECTOR } from '../../../definitions.interface';

export class ListItem extends BaseComponent<IListItemProps>
  implements IListItem {

  public render(): JSX.Element {
    const props = this.props;
    const defaultProps = {
      ref: 'self',
      className: joinClassName(
        'rac-list-item',
        props.selected ? `rac-list-item-selected ${UNIVERSAL_SELECTED_ELEMENT_SELECTOR}` : 'rac-list-item-unselected',
        props.className,
        props.warning && 'rac-list-item-warning',
        props.toClassName && props.toClassName(props.rawData),
        'rac-flex',
        'rac-flex-row',
        'rac-flex-align-items-center'
      ),
      ...handlerPropsFactory<HTMLLIElement>(ifNotNilThanValue(props.onClick, () => () => props.onClick(props.rawData))),
    };

    return props.renderer
        ? React.cloneElement(props.renderer(props.rawData, props.index), defaultProps)
        : (
            <li {...defaultProps}>
              {
                orNull<JSX.Element>(
                    props.icon,
                    () => (
                      <ListItemGraphic>
                        {this.uiFactory.makeIcon(props.icon)}
                      </ListItemGraphic>
                    )
                )
              }
              <ListItemText>
                {
                  props.tpl
                      ? props.tpl(props.rawData)
                      : props.children
                }
              </ListItemText>
            </li>
        );
  }
}
