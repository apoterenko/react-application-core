import * as React from 'react';

import { orNull, toClassName } from '../../../util';
import { BasicEventT, UNIVERSAL_SELECTED_ELEMENT_SELECTOR } from '../../../definitions.interface';
import { IListItemProps } from './list-item.interface';
import { ListItemGraphic, ListItemText } from '../../list';
import { BaseComponent } from '../../base';
import { IListItem } from './list-item.interface';

export class ListItem extends BaseComponent<ListItem, IListItemProps>
  implements IListItem {

  private readonly initialProps = {
    ref: 'self',
    onClick: this.onActionClick.bind(this),
  };

  public render(): JSX.Element {
    const props = this.props;
    const defaultProps = {
      ...this.initialProps,
      className: toClassName(
        'rac-list-item',
        props.selected ? `rac-list-item-selected ${UNIVERSAL_SELECTED_ELEMENT_SELECTOR}` : 'rac-list-item-unselected',
        props.className,
        props.warning && 'rac-list-item-warning',
        props.toClassName && props.toClassName(props.rawData),
        'rac-flex',
        'rac-flex-row',
        'rac-flex-align-items-center'
      ),
    };

    return props.renderer
        ? React.cloneElement(props.renderer(props.rawData), defaultProps)
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

  private onActionClick(event: BasicEventT): void {
    this.stopEvent(event);

    const props = this.props;
    if (props.onClick) {
      props.onClick(props.rawData);
    }
  }
}
