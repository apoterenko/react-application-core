import * as React from 'react';

import { toClassName } from '../../../util';
import { BaseComponent } from '../../base';
import { ISimpleListInternalProps } from './simple-list.interface';

export class SimpleList extends BaseComponent<SimpleList, ISimpleListInternalProps, {}> {

  public static defaultProps: ISimpleListInternalProps = {
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
                'rac-flex-full',
                props.simple && 'rac-simple-list',
                props.useAvatar && this.uiFactory.listAvatar,
                props.nonInteractive && this.uiFactory.listNonInteractive,
            )}>
          {props.children}
        </ul>
    );
  }
}
