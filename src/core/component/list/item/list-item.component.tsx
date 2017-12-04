import * as React from 'react';

import { orNull, toClassName } from '../../../util';
import { BasicEventT, IRippleable } from '../../../definition.interface';
import { Ripple } from '../../../component/ripple';
import { IListItemInternalProps } from './list-item.interface';

export class ListItem extends Ripple<IListItemInternalProps> {

  public static defaultProps: IRippleable = {
    rippled: true,
  };

  private props0 = Object.freeze({
    ref: 'self',
    onClick: this.onActionClick.bind(this),
  });

  public render(): JSX.Element {
    const props = this.props;

    return props.renderer
        ? React.cloneElement(props.renderer(props.rawData), this.props0)
        : (
            <li className={toClassName(
                    'mdc-list-item',
                    props.rippled && 'mdc-ripple-surface',
                    props.className,
                    props.toClassName && props.toClassName(props.rawData)
                )}
                {...this.props0}>
              {
                orNull(
                    props.icon,
                    <span className='mdc-list-item__start-detail'>
                      {this.uiFactory.makeIcon(props.icon)}
                    </span>
                )
              }
              <span className='mdc-list-item__text'>
                {
                  props.tpl
                      ? props.tpl(props.rawData)
                      : props.children
                }
              </span>
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
