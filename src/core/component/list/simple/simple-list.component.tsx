import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../../component/base';
import { ISimpleListInternalProps } from './simple-list.interface';

export class SimpleList extends BaseComponent<SimpleList, ISimpleListInternalProps, {}> {

  public static defaultProps: ISimpleListInternalProps = {
    twoLine: true,
    nonInteractive: true,
  };

  public render(): JSX.Element {
    const props = this.props;

    return (
        <ul ref='self'
            className={toClassName(
                this.uiFactory.list,
                props.nonInteractive && this.uiFactory.listNonInteractive,
                props.twoLine && this.uiFactory.listTwoLine,
                props.className
            )}>
          {props.children}
        </ul>
    );
  }
}
