import * as React from 'react';

import { orNull, toClassName } from '../../../util';
import { BasicEventT } from '../../../definition.interface';
import { IListItemInternalProps } from './list-item.interface';
import { ListItemGraphic, ListItemText } from '../../list';
import { BaseComponent } from '../../base';
import { IListItem } from './list-item.interface';

export class ListItem extends BaseComponent<ListItem, IListItemInternalProps, {}>
  implements IListItem {

  public static defaultProps: IListItemInternalProps = {
    rippable: true,
  };

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
          this.uiFactory.listItem,
          props.rippable && this.uiFactory.rippleSurface,
          props.className,
          props.toClassName && props.toClassName(props.rawData)
      ),
    };

    return props.renderer
        ? React.cloneElement(props.renderer(props.rawData), defaultProps)
        : (
            <li {...defaultProps}>
              {
                orNull(
                    props.icon,
                    () => <ListItemGraphic>{this.uiFactory.makeIcon(props.icon)}</ListItemGraphic>
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
