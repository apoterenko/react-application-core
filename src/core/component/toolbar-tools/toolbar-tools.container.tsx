import * as React from 'react';

import { GenericContainer } from '../base';
import {
  Mappers,
  TypeUtils,
} from '../../util';
import {
  IToolbarToolsContainerProps,
  IToolbarToolsProps,
} from '../../definition';
import { ToolbarTools } from './toolbar-tools.component';
import { ToolbarToolsActionBuilder } from '../../action';

/**
 * @component-container-impl
 * @stable [10.06.2020]
 *
 * Please use the "Mappers.toolbarToolsContainerProps"
 */
export class ToolbarToolsContainer extends GenericContainer<IToolbarToolsContainerProps> {

  /**
   * @stable [22.04.2020]
   * @param {IToolbarToolsContainerProps} props
   */
  constructor(props: IToolbarToolsContainerProps) {
    super(props);

    this.onDownloadFileClick = this.onDownloadFileClick.bind(this);
    this.onFilterClick = this.onFilterClick.bind(this);
    this.onRefreshClick = this.onRefreshClick.bind(this);
  }

  /**
   * @stable [10.05.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <ToolbarTools
        {...Mappers.toolbarToolsContainerPropsAsToolbarTools(this.originalProps)}
        onDownloadFileClick={this.onDownloadFileClick}
        onFilterClick={this.onFilterClick}
        onRefreshClick={this.onRefreshClick}
      />
    );
  }

  /**
   * @stable [10.03.2019]
   */
  private onRefreshClick(): void {
    const props = this.toolbarToolsProps;
    if (TypeUtils.isFn(props.onRefreshClick)) {
      props.onRefreshClick();
    } else {
      this.dispatchPlainAction(ToolbarToolsActionBuilder.buildRefreshPlainAction(this.sectionName));
    }
  }

  /**
   * @stable [22.04.2020]
   */
  private onFilterClick(): void {
    const props = this.toolbarToolsProps;
    if (TypeUtils.isFn(props.onFilterClick)) {
      props.onFilterClick();
    } else {
      this.dispatchPlainAction(ToolbarToolsActionBuilder.buildFilterPlainAction(this.sectionName));
    }
  }

  /**
   * @stable [22.04.2020]
   */
  private onDownloadFileClick(): void {
    const props = this.toolbarToolsProps;
    if (TypeUtils.isFn(props.onDownloadFileClick)) {
      props.onDownloadFileClick();
    } else {
      this.dispatchPlainAction(ToolbarToolsActionBuilder.buildDownloadFilePlainAction(this.sectionName));
    }
  }

  /**
   * @stable [22.04.2020]
   * @returns {IToolbarToolsProps}
   */
  private get toolbarToolsProps(): IToolbarToolsProps {
    return this.originalProps.toolbarToolsConfiguration || {};
  }
}
