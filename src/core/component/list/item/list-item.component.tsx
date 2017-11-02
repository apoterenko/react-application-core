import * as React from 'react';

import { orNull, toClassName } from '../../../util';
import { BasicEventT } from '../../../definition.interface';
import { Ripple } from '../../../component/ripple';
import { IListItemInternalProps } from './list-item.interface';

export class ListItem extends Ripple<IListItemInternalProps> {

  constructor(props: IListItemInternalProps) {
    super(props);
    this.onActionClick = this.onActionClick.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    const itemProps = {
      ref: 'self',
      onClick: this.onActionClick,
    };

    return props.renderer
        ? React.cloneElement(props.renderer(props.rawData), itemProps)
        : (
            <li className={toClassName(
                    'mdc-list-item',
                    'mdc-ripple-surface',
                    props.className,
                    props.toClassName && props.toClassName(props.rawData)
                )}
                {...itemProps}>
              {
                orNull(
                    props.itemIcon,
                    <span className='mdc-list-item__start-detail'>
                      <i className='material-icons'>{props.itemIcon}</i>
                    </span>
                )
              }
              <span className='mdc-list-item__text'>
                {
                  props.itemValue
                      ? props.itemValue(props.rawData)
                      : props.rawData.id || JSON.stringify(props.rawData)
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
