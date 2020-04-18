import * as React from 'react';

import { toClassName, orNull, ifNotFalseThanValue, calc } from '../../util';
import { BaseComponent } from '../base';
import { ICardProps } from './card.interface';

export class Card extends BaseComponent<ICardProps> {

  /**
   * @stable [02.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div ref='self'
           className={toClassName(
                       'rac-card',
                       'mdc-card',
                       ifNotFalseThanValue(props.rippled, () => 'mdc-ripple-surface'),
                       calc(props.className)
                     )}
           onClick={props.onClick}>
        {props.children}
        {
          orNull<JSX.Element>(
            props.actionButtons || props.actionIcons,
            () => (
              <div className={toClassName('rac-card-actions', 'mdc-card__actions')}>
                {
                  orNull<JSX.Element>(
                    props.actionButtons,
                    () => (
                      <div className={toClassName(
                                        'rac-card-action-buttons',
                                        'mdc-card__action-buttons'
                                      )}>
                        {props.actionButtons}
                      </div>
                    )
                  )
                }
                {
                  orNull<JSX.Element>(
                    props.actionIcons,
                    () => (
                      <div className={toClassName('rac-card-action-items', 'mdc-card__action-icons')}>
                        {props.actionIcons}
                      </div>
                    )
                  )
                }
              </div>
            )
          )
        }
      </div>
    );
  }
}
