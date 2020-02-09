import * as React from 'react';

import {
  calc,
  joinClassName,
  nvl,
} from '../../util';
import { BaseComponent } from '../base';
import {
  IComponentsSettingsEntity,
  ITitleProps,
} from '../../definition';

export class Title extends BaseComponent<ITitleProps> {

  /**
   * @stable [09.02.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {items} = props;
    const contentBorder = nvl(this.systemSettings.contentBorder, props.contentBorder);

    return (
      <div className={joinClassName('rac-title', calc(props.className))}>
        <div
          className='rac-title__content'>
          {this.t(props.children as string)}
          {contentBorder && <div className='rac-title__content-edge'/>}
        </div>
        {items && (
          <div className='rac-title__right-content'>
            {items}
          </div>
        )}
      </div>
    );
  }

  /**
   * @stable [09.02.2020]
   * @returns {ITitleProps}
   */
  private get systemSettings(): ITitleProps {
    const {title = {}} = this.settings.components || {} as IComponentsSettingsEntity;
    return title;
  }
}
