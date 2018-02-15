import * as React from 'react';

import { orNull } from '../../util';
import { BaseComponent } from '../base';
import { Link } from '../link';
import { IProfileInternalProps } from './profile.interface';
import { BasicEventT } from '../../definition.interface';

export class Profile extends BaseComponent<Profile, IProfileInternalProps, {}> {

  constructor(props: IProfileInternalProps) {
    super(props);
    this.onMenuClick = this.onMenuClick.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
      <Link to={props.path}
            className='rac-profile'>
        <div className='rac-profile-logo-wrapper rac-profile-menu'>
          {this.uiFactory.makeIcon({
            type: 'menu',
            className: 'rac-profile-icon',
            onClick: this.onMenuClick,
          })}
        </div>
        <div className='rac-profile-logo-wrapper rac-profile-avatar'>
          {this.uiFactory.makeIcon({
            type: 'person',
            className: 'rac-profile-icon',
          })}
        </div>
        {
          orNull(
            props.name,
            () => (
              <div className='rac-profile-name rac-overflow-ellipsis'
                   title={props.name}>{props.name}</div>
            )
          )
        }
        {
          orNull(
            props.email,
            () => <div className='rac-overflow-ellipsis' title={props.email}>{props.email}</div>
          )
        }
      </Link>
    );
  }

  private onMenuClick(event: BasicEventT): void {
    this.stopEvent(event);

    const props = this.props;
    if (props.onClick) {
      props.onClick(event);
    }
  }
}
