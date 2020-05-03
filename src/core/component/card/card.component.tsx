import * as React from 'react';

import {
  calc,
  handlerPropsFactory,
  joinClassName,
} from '../../util';
import { GenericBaseComponent } from '../base/generic-base.component';
import { ICardProps } from './card.interface';

export class Card extends GenericBaseComponent<ICardProps> {

  /**
   * @stable [03.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div
        ref={this.selfRef}
        className={joinClassName('rac-card', calc(props.className))}
        {...handlerPropsFactory(props.onClick, true, false)}
      >
        {props.children}
      </div>
    );
  }
}
