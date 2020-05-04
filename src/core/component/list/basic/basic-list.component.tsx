import * as React from 'react';

import {
  calc,
  isDefault,
  isFull,
  joinClassName,
} from '../../../util';
import { GenericComponent } from '../../base/generic.component';
import { IBasicListProps } from './basic-list.interface';
import { ListClassesEnum } from '../../../definition';

export class BasicList extends GenericComponent<IBasicListProps> {

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
