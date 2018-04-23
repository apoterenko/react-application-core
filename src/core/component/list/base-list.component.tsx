import * as React from 'react';

import { IUIFactory } from '../factory';
import { DI_TYPES, lazyInject } from '../../di';
import { toClassName, orNull, scrollIntoView } from '../../util';
import { IUniversalListEntity } from '../../entities-definitions.interface';
import { IUniversalListConfiguration } from '../../configurations-definitions.interface';
import { Message } from '../message';
import { UniversalList } from './universal-list.component';

export abstract class BaseList<TComponent extends BaseList<TComponent, TProps>,
                               TProps extends IUniversalListConfiguration & IUniversalListEntity>
  extends UniversalList<TComponent, TProps> {

  @lazyInject(DI_TYPES.UIFactory) protected uiFactory: IUIFactory;

  /**
   * @stable [23.04.2018]
   * @param {HTMLElement} item
   * @param {HTMLElement} view
   */
  protected doScrollIntoView(item: HTMLElement, view: HTMLElement): void {
    scrollIntoView(item, view);
  }

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  protected getMessage(): JSX.Element {
    const props = this.props;
    return (
      <Message emptyData={this.isOriginalDataSourceEmpty()}
               error={props.error}
               progress={props.progress}>
        {this.getAddAction()}
      </Message>
    );
  }

  /**
   * @stable [23.04.2018]
   * @returns {JSX.Element}
   */
  protected getAddAction(): JSX.Element {
    return orNull<JSX.Element>(
      this.props.useAddAction,
      () => this.uiFactory.makeIcon({
        type: 'add',
        className: toClassName('rac-add-button', this.uiFactory.fab),
        onClick: this.onCreate,
      })
    );
  }
}
