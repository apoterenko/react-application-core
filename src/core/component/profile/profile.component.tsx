import * as React from 'react';

import { orNull } from '../../util';
import { BaseComponent } from '../base/base.component';
import { IProfileProps } from './profile.interface';
import { FlexLayout } from '../layout/flex';

export class Profile extends BaseComponent<IProfileProps> {

  /**
   * @stable [17.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout row={true}
                  alignItemsCenter={true}
                  className='rac-profile'>
        {
          orNull<JSX.Element>(
            props.appVersion,
            () => <div className='rac-profile-app-version'>{props.appVersion}</div>
          )
        }
        {
          orNull<JSX.Element>(
            props.avatarRendered,
            () => <div className='rac-profile-avatar'/>
          )
        }
        {this.uiFactory.makeIcon({
          type: 'menu',
          className: 'rac-logo-menu-icon',
          onClick: props.onClick,
        })}
      </FlexLayout>
    );
  }
}
