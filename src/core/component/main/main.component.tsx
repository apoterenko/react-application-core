import * as React from 'react';

import {
  IMainProps,
  MainClassesEnum,
  UniversalScrollableContext,
  UniversalStickyContext,
} from '../../definition';
import {
  CalcUtils,
  ClsUtils,
  PropsUtils,
  WrapperUtils,
} from '../../util';
import { EnhancedGenericComponent } from '../base/enhanced-generic.component';

/**
 * @component-impl
 * @stable [20.05.2020]
 */
export class Main extends EnhancedGenericComponent<IMainProps> {

  /**
   * @stable [20.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;

    return (
      <UniversalStickyContext.Provider value={mergedProps.stickyElementClassName}>
        <UniversalScrollableContext.Provider value={mergedProps.selectedElementClassName}>
          <div
            className={
              ClsUtils.joinClassName(
                MainClassesEnum.MAIN,
                WrapperUtils.isFull(mergedProps) && MainClassesEnum.FULL_MAIN,
                CalcUtils.calc(mergedProps.className)
              )
            }>
            <div
              ref={this.actualRef}
              className={MainClassesEnum.MAIN_BODY}
            >
              <div className={MainClassesEnum.MAIN_BODY_CONTENT}>
                {this.props.children}
              </div>
            </div>
          </div>
        </UniversalScrollableContext.Provider>
      </UniversalStickyContext.Provider>
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
