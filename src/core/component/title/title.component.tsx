import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
} from '../../util';
import { ITitleProps } from '../../definition';
import { GenericComponent } from '../base/generic.component';

/**
 * @component-impl
 * @stable [01.06.2020]
 */
export class Title extends GenericComponent<ITitleProps> {

  /**
   * @stable [01.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const {
      className,
      contentBorder,
      items,
    } = this.mergedProps;

    return (
      <div className={ClsUtils.joinClassName('rac-title', CalcUtils.calc(className))}>
        <div className='rac-title__content'>
          {this.t(this.props.children as string)}
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
   * @stable [02.06.2020]
   * @returns {ITitleProps}
   */
  protected get settingsProps(): ITitleProps {
    return this.componentsSettings.title;
  }
}
