import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../../component/base';

export class ToolbarSection extends BaseComponent<ToolbarSection> {

  public render(): JSX.Element {
    const props = this.props;

    return (
        <section className={toClassName(
                    this.uiFactory.toolbarSection,
                    'rac-toolbar-section',
                    props.className
                )}>
          {this.props.children}
        </section>
    );
  }
}
