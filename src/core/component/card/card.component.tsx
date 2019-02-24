import * as React from 'react';

import { toClassName, orNull } from '../../util';
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
                       this.uiFactory.card,
                       props.rippable && this.uiFactory.rippleSurface,
                       props.className
                     )}
           onClick={props.onClick}>
        {props.children}
        {
          orNull<JSX.Element>(
            props.actionButtons || props.actionIcons,
            () => (
              <div className={toClassName('rac-card-actions', this.uiFactory.cardActions)}>
                {
                  orNull<JSX.Element>(
                    props.actionButtons,
                    () => (
                      <div className={toClassName(
                                        'rac-card-action-buttons',
                                        this.uiFactory.cardActionButtons
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
                      <div className={toClassName('rac-card-action-items', this.uiFactory.cardActionIcons)}>
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
