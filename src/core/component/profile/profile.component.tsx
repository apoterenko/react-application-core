import * as React from 'react';

import { orNull } from '../../util';
import { BaseComponent } from '../base';
import { Link } from '../link';
import { IProfileInternalProps } from './profile.interface';
import { IBasicEvent } from '../../definitions.interface';
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
        <div className='rac-profile-avatar'/>
        <div ref='menuAnchor'
             className='rac-profile-menu-wrapper'>
          {this.uiFactory.makeIcon({type: 'more_vert', onClick: this.onMenuClick})}
          <Menu ref='menu'
                renderToBody={true}
                options={props.menuItems}
                anchor={() => this.refs.menuAnchor as HTMLElement}
                onSelect={this.onMenuActionClick}/>
        </div>
        {
          orNull(
            props.name,
            () => (
              <div className='rac-profile-name rac-profile-text rac-overflow-ellipsis'
                   title={props.name}>{props.name}</div>
            )
          )
        }
        {
          orNull(
            props.email,
            () => <div className='rac-profile-email rac-profile-text rac-overflow-ellipsis' title={props.email}>{props.email}</div>
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

  private onMenuClick(event: IBasicEvent): void {
    this.stopEvent(event);
    this.menu.show();
  }

  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }
}
