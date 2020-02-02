import * as React from 'react';

import {
  ElementsMarkersEnum,
  FlexClassNamesEnum,
  IMainProps,
  IScrollableEntity,
  UniversalScrollableContext,
  UniversalStickyContext,
} from '../../definition';
import { BaseComponent } from '../base/base.component';
import { FlexLayout } from '../layout/flex';
import {
  calc,
  joinClassName,
} from '../../util';

export class Main extends BaseComponent<IMainProps>
  implements IScrollableEntity {

  public static readonly defaultProps: IMainProps = {
    stickyElementClassName: ElementsMarkersEnum.STICKY_ELEMENT_275B4646,
    selectedElementClassName: ElementsMarkersEnum.SELECTED_ELEMENT_817ACCF6,
  };

  /**
   * @stable [23.11.2019]
   * @param {IMainProps} props
   */
  constructor(props: IMainProps) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
  }

  /**
   * @stable [23.10.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <UniversalStickyContext.Provider value={props.stickyElementClassName}>
        <UniversalScrollableContext.Provider value={props.selectedElementClassName}>
          <div
            className={
              joinClassName(
                'rac-main',
                FlexClassNamesEnum.FULL,
                calc(props.className)
              )
            }>
            <div
              ref={this.selfRef}
              className='rac-main-body-wrapper'
              onScroll={this.onScroll}
            >
              <FlexLayout className='rac-main-body'>
                {props.children}
              </FlexLayout>
            </div>
          </div>
        </UniversalScrollableContext.Provider>
      </UniversalStickyContext.Provider>
    );
  }

  /**
   * @stable [13.12.2018]
   */
  public onScroll() {
    // Each plugin should override this method
    // TODO Try move to eventManager service
  }
}
