import * as React from 'react';

import { orNull } from '../../util';
import { BaseComponent } from '../base';
import { Link } from '../link';
import { IProfileInternalProps } from './profile.interface';
import { BasicEventT } from '../../definitions.interface';
import { Menu, IMenu } from '../menu';

export class Profile extends BaseComponent<Profile, IProfileInternalProps, {}> {

  constructor(props: IProfileInternalProps) {
    super(props);
    this.onMenuClick = this.onMenuClick.bind(this);
    this.onMenuActionClick = this.onMenuActionClick.bind(this);
  }

  public render(): JSX.Element {
    const props = this.props;
    return (
      <Link to={props.path}
            className='rac-profile'>
        <div ref='menuAnchor'
             className='rac-profile-logo-wrapper rac-profile-menu'
             onClick={this.onMenuClick}>
          {this.uiFactory.makeIcon({
            type: 'more_vert',
            className: 'rac-profile-icon',
          })}
          <Menu ref='menu'
                className='rac-profile-actions-menu'
                renderToBody={true}
                options={props.menuItems}
                getAnchor={() => this.refs.menuAnchor as HTMLElement}
                onSelect={this.onMenuActionClick}/>
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

  private onMenuActionClick(option: any): void {  // TODO
    const props = this.props;
    if (props.onClick) {
      props.onClick(option);
    }
  }

  private onMenuClick(event: BasicEventT): void {
    this.stopEvent(event);
    this.menu.show();
  }

  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }
}
