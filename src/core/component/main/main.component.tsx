import * as React from 'react';

import {
  IMainProps,
  MainClassesEnum,
} from '../../definition';
import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
} from '../../util';
import { EnhancedGenericComponent } from '../base/enhanced-generic.component';

export class Main extends EnhancedGenericComponent<IMainProps> {

  /**
   * @stable [20.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;

    return (
      <div
        className={ClsUtils.joinClassName(MainClassesEnum.MAIN, CalcUtils.calc(mergedProps.className))}>
        <div
          ref={this.actualRef}
          className={MainClassesEnum.MAIN_BODY}
        >
          <div className={MainClassesEnum.MAIN_BODY_CONTENT}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }

  /**
   * @stable [20.05.2020]
   * @returns {IMainProps}
   */
  private get mergedProps(): IMainProps {
    return PropsUtils.mergeWithSystemProps(this.props, this.settings.components.main);
  }
}
