import * as React from 'react';

import { orNull } from '../../util';
import { BaseComponent } from '../base';
import { Link } from '../link';
import { IProfileProps } from './profile.interface';

export class Profile extends BaseComponent<Profile, IProfileProps> {

  /**
   * @stable [17.09.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <Link to={props.path}
            className='rac-profile rac-flex rac-flex-row rac-flex-full rac-flex-align-items-center'>
        {
          orNull<JSX.Element>(
            props.appVersion,
            () => <div className='rac-profile-app-version'>{props.appVersion}</div>
          )
        }
        <div className='rac-profile-avatar'/>
      </Link>
    );
  }
}
