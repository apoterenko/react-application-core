import * as React from 'react';

import { GenericContainer } from '../../base/generic.container';
import { IPageToolbarContainerProps } from '../../../definition';
import { Mappers } from '../../../util';
import { PageToolbar } from './page-toolbar.component';
import { PageToolbarActionBuilder } from '../../../action';

/**
 * @component-container-impl
 * @stable [31.07.2020]
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
   * @stable [31.07.2020]
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
        {this.originalChildren}
      </PageToolbar>
    );
  }

  /**
   * @stable [06.05.2020]
   */
  private onNext(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildNextPagePlainAction(this.sectionName));
  }

  /**
   * @stable [06.05.2020]
   */
  private onPrevious(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildPreviousPagePlainAction(this.sectionName));
  }

  /**
   * @stable [06.05.2020]
   */
  private onLast(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildLastPagePlainAction(this.sectionName));
  }

  /**
   * @stable [06.05.2020]
   */
  private onFirst(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildFirstPagePlainAction(this.sectionName));
  }
}
