import * as React from 'react';

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
    const className = [
      'mdc-list-item',
      'app-list-item',
      props.className,
      props.toClassName && props.toClassName(props.rawData)
    ];
    const actionTypeEl = props.actionType
        ? (
            <i className='mdc-list-item__end-detail material-icons'>
              {props.actionType}
            </i>
        )
        : null;
    return (
        <li ref='self'
            className={className.filter((clsName) => !!clsName).join(' ')}
            onClick={this.onActionClick}>
          {
            props.renderer
                ? props.renderer(props.rawData)
                : (this.props.rawData.id || JSON.stringify(this.props.rawData))
          }
          {actionTypeEl}
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
