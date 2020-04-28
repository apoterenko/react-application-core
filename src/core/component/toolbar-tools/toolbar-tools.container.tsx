import * as React from 'react';

import { GenericContainer } from '../base';
import { isFn} from '../../util';
import {
  IToolbarToolsContainerProps,
  IToolbarToolsProps,
} from '../../definition';
import { ToolbarTools } from './toolbar-tools.component';
import { ToolbarToolsActionBuilder } from '../../action';

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
   * @stable [22.04.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    return (
      <ToolbarTools
        {...this.toolbarToolsProps}
        {...this.props.toolbarTools}
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
    if (isFn(props.onRefreshClick)) {
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
    if (isFn(props.onFilterClick)) {
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
    if (isFn(props.onDownloadFileClick)) {
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
    return this.props.toolbarToolsConfiguration || {};
  }
}
