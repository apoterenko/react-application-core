import * as React from 'react';

import { GenericContainer } from '../../base/generic.container';
import {
  IPageToolbarContainerProps,
  IPageToolbarProps,
} from '../../../definition';
import {
  ComponentMappers,
  ifNotNilThanValue,
} from '../../../util';
import { PageToolbar } from './page-toolbar.component';
import { PageToolbarActionBuilder } from '../../../action';

/**
 * @component-container-impl
 * @stable [06.05.2020]
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
   * @stable [06.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <PageToolbar
        {...ComponentMappers.pageToolbarContainerPropsAsPageToolbarProps(props)}
        onFirst={this.onFirst}
        onLast={this.onLast}
        onNext={this.onNext}
        onPrevious={this.onPrevious}
      >
        {props.children}
      </PageToolbar>
    );
  }

  /**
   * @stable [06.05.2020]
   */
  private onNext(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildNextPagePlainAction(this.sectionName));
    ifNotNilThanValue(this.toolbarConfiguration.onNext, (onNext) => onNext());
  }

  /**
   * @stable [06.05.2020]
   */
  private onPrevious(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildPreviousPagePlainAction(this.sectionName));
    ifNotNilThanValue(this.toolbarConfiguration.onPrevious, (onPrevious) => onPrevious());
  }

  /**
   * @stable [06.05.2020]
   */
  private onLast(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildLastPagePlainAction(this.sectionName));
    ifNotNilThanValue(this.toolbarConfiguration.onLast, (onLast) => onLast());
  }

  /**
   * @stable [06.05.2020]
   */
  private onFirst(): void {
    this.dispatchPlainAction(PageToolbarActionBuilder.buildFirstPagePlainAction(this.sectionName));
    ifNotNilThanValue(this.toolbarConfiguration.onFirst, (onFirst) => onFirst());
  }

  /**
   * @stable [06.05.2020]
   * @returns {IPageToolbarProps}
   */
  private get toolbarConfiguration(): IPageToolbarProps {
    return this.props.toolbarConfiguration || {};
  }
}
