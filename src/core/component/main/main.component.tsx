import * as React from 'react';

import { IOnScrollWrapper } from '../../definitions.interface';
import { IComponentProps } from '../../props-definitions.interface';
import { toClassName } from '../../util';
import { BaseComponent } from '../base';
import { FlexLayout } from '../layout';
import { StickyHeaderPlugin, PersistentScrollPlugin } from '../plugin';

export class Main extends BaseComponent implements IOnScrollWrapper {

  /**
   * @stable [13.12.2018]
   * @param {IComponentProps} props
   */
  constructor(props: IComponentProps) {
    super(props);
    this.onScroll = this.onScroll.bind(this);
    this.registerPlugin(StickyHeaderPlugin);
    this.registerPlugin(PersistentScrollPlugin);
  }

  /**
   * @stable [12.10.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div className={toClassName('rac-main rac-flex-full', props.className)}>
        <div ref={this.getSelfRef()}
             className='rac-main-body-wrapper'
             onScroll={this.onScroll}>
          <FlexLayout className='rac-main-body'>
            {props.children}
          </FlexLayout>
        </div>
      </div>
    );
  }

  /**
   * @stable [13.12.2018]
   */
  public onScroll() {
    // Each plugin should override this method
  }
}
