import * as React from 'react';

import { orDefault, orNull, toClassName, pageFromNumber, pageToNumber } from '../../../util';
import { FIRST_PAGE } from '../../../definitions.interface';
import { BaseComponent } from '../../../component/base';
import { IPageToolbarProps } from './page-toolbar.interface';

export class PageToolbar extends BaseComponent<PageToolbar, IPageToolbarProps> {

  /**
   * @stable [16.05.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const toNumber = pageToNumber(props);
    const fromNumber = pageFromNumber(props);
    const isPreviousBtnDisabled = props.page === FIRST_PAGE;
    const isNextBtnDisabled = toNumber === props.totalCount;

    return (
        <div className={toClassName(this.uiFactory.toolbar, 'rac-toolbar', 'rac-page-toolbar', props.className)}>
          {
            orDefault<JSX.Element, JSX.Element>(
              props.totalCount > 0,
              () => (
                <div className={toClassName(this.uiFactory.toolbarRow, 'rac-page-toolbar-content')}>
                  <div className='rac-flex-full'>
                    {props.children}
                  </div>
                  <div className='rac-toolbar-pages-info'>
                    {fromNumber}-{toNumber} {this.t('of')} {props.totalCount}
                  </div>
                  {
                    orNull(
                      !(isPreviousBtnDisabled && isNextBtnDisabled),
                      <div>
                        {
                          this.uiFactory.makeIcon({
                            type: 'first_page',
                            disabled: isPreviousBtnDisabled,
                            onClick: props.onFirst,
                          })
                        }
                        {
                          this.uiFactory.makeIcon({
                            type: 'keyboard_arrow_left',
                            disabled: isPreviousBtnDisabled,
                            onClick: props.onPrevious,
                          })
                        }
                        {
                          this.uiFactory.makeIcon({
                            type: 'keyboard_arrow_right',
                            disabled: isNextBtnDisabled,
                            onClick: props.onNext,
                          })
                        }
                        {
                          this.uiFactory.makeIcon({
                            type: 'last_page',
                            disabled: isNextBtnDisabled,
                            onClick: props.onLast,
                          })
                        }
                      </div>
                    )
                  }
                </div>
              ),
              () => <div className={toClassName(this.uiFactory.toolbarRow, 'rac-page-toolbar-content')}/>
            )
          }
        </div>
    );
  }
}
