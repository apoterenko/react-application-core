import * as React from 'react';

import { GenericContainer } from '../../base/generic.container';
import {
  IPageToolbarContainerProps,
  IPageToolbarProps,
} from '../../../definition';
import {
  ConditionUtils,
  Mappers,
} from '../../../util';
import { PageToolbar } from './page-toolbar.component';
import { PageToolbarActionBuilder } from '../../../action';

/**
 * @component-container-impl
 * @stable [10.06.2020]
 *
 * Please use the "Mappers.pageToolbarContainerProps"
 */
export class PageToolbarContainer extends GenericContainer<IPageToolbarContainerProps> {

  /**
   * @stable [06.05.2020]
   * @param {IPageToolbarContainerProps} props
   */
  constructor(props: IPageToolbarContainerProps) {
    super(props);

    this.onFirst = this.onFirst.bind(this);
    this.onLast = this.onLast.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onPrevious = this.onPrevious.bind(this);
  }

  /**
   * @stable [10.06.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <PageToolbar
        {...Mappers.pageToolbarContainerPropsAsPageToolbarProps(this.originalProps)}
        onFirst={this.onFirst}
        onLast={this.onLast}
        onNext={this.onNext}
        onPrevious={this.onPrevious}
      >
        {this.props.children}
      </PageToolbar>
    );
  }

  /**
   * @stable [06.05.2020]
   */
  private onNext(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildNextPagePlainAction(this.sectionName));
    ConditionUtils.ifNotNilThanValue(this.toolbarConfiguration.onNext, (onNext) => onNext());
  }

  /**
   * @stable [06.05.2020]
   */
  private onPrevious(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildPreviousPagePlainAction(this.sectionName));
    ConditionUtils.ifNotNilThanValue(this.toolbarConfiguration.onPrevious, (onPrevious) => onPrevious());
  }

  /**
   * @stable [06.05.2020]
   */
  private onLast(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildLastPagePlainAction(this.sectionName));
    ConditionUtils.ifNotNilThanValue(this.toolbarConfiguration.onLast, (onLast) => onLast());
  }

  /**
   * @stable [06.05.2020]
   */
  private onFirst(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildFirstPagePlainAction(this.sectionName));
    ConditionUtils.ifNotNilThanValue(this.toolbarConfiguration.onFirst, (onFirst) => onFirst());
  }

  /**
   * @stable [06.05.2020]
   * @returns {IPageToolbarProps}
   */
  private get toolbarConfiguration(): IPageToolbarProps {
    return this.originalProps.toolbarConfiguration || {};
  }
}
