import * as React from 'react';

import { orNull, toClassName } from '../../../util';
import { BasicEventT, IRippleable } from '../../../definition.interface';
import { Ripple } from '../../../component/ripple';
import { IListItemInternalProps } from './list-item.interface';
import { ListItemGraphic, ListItemText } from '../../../component/list';

export class ListItem extends Ripple<IListItemInternalProps> {

  public static defaultProps: IRippleable = {
    rippled: true,
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
          this.uiFactory.listItem,
          props.rippled && this.uiFactory.rippleSurface,
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

    if (this.props.onClick) {
      this.props.onClick(this.props.rawData);
    }
  }
}
