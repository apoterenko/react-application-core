import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../../component/base';
import { ISimpleListInternalProps } from './simple-list.interface';

export class SimpleList extends BaseComponent<SimpleList, ISimpleListInternalProps, {}> {

  public static defaultProps: ISimpleListInternalProps = {
    useTwoLine: true,
    useAvatar: false,
    nonInteractive: true,
    simple: true,
  };

  public render(): JSX.Element {
    const props = this.props;

    return (
        <ul ref='self'
            className={toClassName(
                this.uiFactory.list,
                props.className,
                props.simple && 'rac-simple-list',
                props.useAvatar && this.uiFactory.listAvatar,
                props.nonInteractive && this.uiFactory.listNonInteractive,
                props.useTwoLine && this.uiFactory.listTwoLine,
            )}>
          {props.children}
        </ul>
    );
  }
}
