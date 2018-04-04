import * as React from 'react';

import { toClassName, orNull } from '../../util';
import { BaseComponent, IBaseComponentInternalProps } from '../base';
import { IEntity } from '../../definitions.interface';
import { IBaseListEntity } from '../../entities-definitions.interface';
import { IBaseListConfiguration } from '../../configurations-definitions.interface';

export class BaseList<TList extends BaseList<TList, TInternalProps>,
                      TInternalProps extends IBaseComponentInternalProps
                                              & IBaseListConfiguration
                                              & IBaseListEntity>
  extends BaseComponent<TList, TInternalProps, {}> {

  /**
   * @stable - 04.04.2018
   */
  constructor(props: TInternalProps) {
    super(props);
    this.onCreate = this.onCreate.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  /**
   * @stable - 04.04.2018
   * @returns {JSX.Element}
   */
  protected getAddAction(): JSX.Element {
    return orNull<JSX.Element>(
      this.props.useAddAction,
      () => this.uiFactory.makeIcon({
        type: 'add',
        className: toClassName(
          'rac-list-add-button',
          'rac-flex-center',
          this.uiFactory.fab
        ),
        onClick: this.onCreate,
      })
    );
  }

  /**
   * @stable - 04.04.2018
   */
  protected onCreate(): void {
    if (this.props.onCreate) {
      this.props.onCreate();
    }
  }

  /**
   * @stable - 04.04.2018
   * @param {IEntity} entity
   */
  protected onSelect(entity: IEntity): void {
    if (this.props.onSelect) {
      this.props.onSelect(entity);
    }
  }
}
