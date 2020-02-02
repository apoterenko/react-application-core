import * as React from 'react';

import { BaseContainer } from '../base';
import { Button } from '../button';
import { FlexLayout } from '../layout/flex';
import { IButtonProps, ToolbarToolsEnum } from '../../definition';
import { isPrimitive, isFn, joinClassName, calc } from '../../util';
import {
  IToolbarToolsContainerProps,
  TOOLBAR_TOOLS_DOWNLOAD_FILE_ACTION_TYPE,
  TOOLBAR_TOOLS_FILTER_ACTION_TYPE,
  TOOLBAR_TOOLS_REFRESH_ACTION_TYPE,
} from './toolbar-tools.interface';

export class ToolbarToolsContainer extends BaseContainer<IToolbarToolsContainerProps> {

  private readonly defaultActions = {
    [ToolbarToolsEnum.FILTER]: {
      icon: 'filter',
      onClick: this.onFilterClick.bind(this),
    },
    [ToolbarToolsEnum.DOWNLOAD_FILE]: {
      icon: 'download',
      onClick: this.onDownloadFileClick.bind(this),
    },
    [ToolbarToolsEnum.REFRESH]: {
      icon: 'refresh',
      onClick: this.onRefreshClick.bind(this),
    },
  };

  /**
   * @stable [10.03.2019]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const { actions = [ToolbarToolsEnum.REFRESH] } = this.props;

    return (
      <FlexLayout
        row={true}
        justifyContentEnd={true}
        {...props.flex}
        className={joinClassName(calc(props.className), 'rac-toolbar-tools')}
      >
        {props.leftSlot}
        {
          actions.map((cfg, index) => {
            const actionProps = isPrimitive(cfg) ? this.defaultActions[cfg] : cfg as IButtonProps;
            return (
              <Button
                key={`action-${index}-key`}
                disabled={props.actionsDisabled}
                className={joinClassName(
                  (props.activeActions || []).includes(cfg) && 'rac-toolbar-tool-active',
                )}
                {...actionProps}/>
            );
          })
        }
        {props.rightSlot}
      </FlexLayout>
    );
  }

  /**
   * @stable [10.03.2019]
   */
  private onRefreshClick(): void {
    const props = this.props;
    if (isFn(props.onRefreshClick)) {
      props.onRefreshClick();
    } else {
      this.dispatchFrameworkAction(TOOLBAR_TOOLS_REFRESH_ACTION_TYPE);
    }
  }

  /**
   * @stable [10.03.2019]
   */
  private onFilterClick(): void {
    const props = this.props;
    if (isFn(props.onFilterClick)) {
      props.onFilterClick();
    } else {
      this.dispatchFrameworkAction(TOOLBAR_TOOLS_FILTER_ACTION_TYPE);
    }
  }

  /**
   * @stable [16.04.2019]
   */
  private onDownloadFileClick(): void {
    const props = this.props;
    if (isFn(props.onDownloadFileClick)) {
      props.onDownloadFileClick();
    } else {
      this.dispatchFrameworkAction(TOOLBAR_TOOLS_DOWNLOAD_FILE_ACTION_TYPE);
    }
  }
}
