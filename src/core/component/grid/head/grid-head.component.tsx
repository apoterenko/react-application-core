import * as React from 'react';

import {
  GridClassesEnum,
  IGridHeadProps,
  UniversalStickyContext,
} from '../../../definition';
import { ClsUtils } from '../../../util';
import { GenericComponent } from '../../base/generic.component';

/**
 * @component-impl
 * @stable [20.05.2020]
 */
export class GridHead extends GenericComponent<IGridHeadProps> {

  /**
   * @stable [20.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;

    return (
      <UniversalStickyContext.Consumer>
        {(stickyElementClassName) => (
          <thead className={
            ClsUtils.joinClassName(
              GridClassesEnum.HEAD,
              mergedProps.stickyHead && stickyElementClassName
            )
          }>
            {this.props.children}
          </thead>
        )}
      </UniversalStickyContext.Consumer>
    );
  }

  /**
   * @stable [02.06.2020]
   * @returns {IGridHeadProps}
   */
  protected get componentsSettingsProps(): IGridHeadProps {
    return this.componentsSettings.gridHead;
  }
}
