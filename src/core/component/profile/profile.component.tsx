import * as React from 'react';

import { orNull, cancelEvent, isFn } from '../../util';
import { BaseComponent } from '../base';
import { Link } from '../link';
import { IProfileProps } from './profile.interface';
import { IBasicEvent } from '../../definitions.interface';

export class Profile extends BaseComponent<Profile, IProfileProps> {

  /**
   * @stable [18.09.2018]
   * @param {IProfileProps} props
   */
  constructor(props: IProfileProps) {
    super(props);
    this.onLogoMenuActionClick = this.onLogoMenuActionClick.bind(this);
  }

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
        {this.uiFactory.makeIcon({
          type: 'menu',
          className: 'rac-logo-menu-action',
          onClick: this.onLogoMenuActionClick,
        })}
      </Link>
    );
  }

  /**
   * @stable [17.09.2018]
   * @param {IBasicEvent} event
   */
  private onLogoMenuActionClick(event: IBasicEvent): void {
    cancelEvent(event);

    const props = this.props;
    if (isFn(props.onActionClick)) {
      props.onActionClick();
    }
  }
}
