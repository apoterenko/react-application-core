import * as React from 'react';

import {
  calc,
  joinClassName,
} from '../../util';
import { GenericComponent } from '../base/generic.component';
import { ICardProps } from './card.interface';

export class Card extends GenericComponent<ICardProps> {

  /**
   * @stable [02.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div
        ref={this.selfRef}
        className={joinClassName(
          'rac-card',
          'mdc-card',
          calc(props.className)
        )}
        onClick={props.onClick}
      >
        {props.children}
      </div>
    );
  }
}
