import * as React from 'react';

import {
  calc,
  isDefault,
  isFull,
  joinClassName,
} from '../../../util';
import { EnhancedGenericComponent } from '../../base/enhanced-generic.component';
import { IBasicListProps } from './basic-list.interface';
import { ListClassesEnum } from '../../../definition';

export class BasicList extends EnhancedGenericComponent<IBasicListProps> {

  /**
   * @stable [04.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;

    return (
      <ul
        ref={this.actualRef}
        className={
          joinClassName(
            ListClassesEnum.LIST,
            isDefault(props) && ListClassesEnum.DEFAULT_LIST,
            isFull(props) && ListClassesEnum.FULL_LIST,
            calc(props.className)
          )
        }
      >
        {props.children}
      </ul>
    );
  }
}
