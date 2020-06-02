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
  WrapperUtils,
} from '../../util';
import { EnhancedGenericComponent } from '../base/enhanced-generic.component';

/**
 * @component-impl
 * @stable [22.05.2020]
 */
export class Main extends EnhancedGenericComponent<IMainProps> {

  /**
   * @stable [22.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;
    const {
      className,
      selectedElementClassName,
      stickyElementClassName,
      subHeaderRendered,
    } = mergedProps;

    return (
      <UniversalStickyContext.Provider value={stickyElementClassName}>
        <UniversalScrollableContext.Provider value={selectedElementClassName}>
          <div
            className={
              ClsUtils.joinClassName(
                MainClassesEnum.MAIN,
                WrapperUtils.isFull(mergedProps) && MainClassesEnum.FULL_MAIN,
                subHeaderRendered && MainClassesEnum.MAIN_WITH_SUB_HEADER,
                CalcUtils.calc(className)
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
   * @stable [02.06.2020]
   * @returns {IMainProps}
   */
  protected get settingsProps(): IMainProps {
    return this.componentsSettings.main;
  }
}
