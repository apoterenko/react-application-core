import * as React from 'react';

import { GenericContainer } from '../base';
import { Button } from '../button';
import { FlexLayout } from '../layout/flex';
import {
  IButtonProps,
  IconsEnum,
  ToolbarToolsEnum,
} from '../../definition';
import { isPrimitive, isFn, joinClassName, calc } from '../../util';
import {
  IDeprecatedToolbarToolsContainerProps,
} from './toolbar-tools.interface';
import { ToolbarToolsActionBuilder } from '../../action';

/**
 * TODO
 * @deprecated
 */
export class DeprecatedToolbarToolsContainer extends GenericContainer<IDeprecatedToolbarToolsContainerProps> {

  private readonly defaultActions = {
    [ToolbarToolsEnum.FILTER]: {
      icon: IconsEnum.FILTER,
      onClick: this.onFilterClick.bind(this),
    },
    [ToolbarToolsEnum.DOWNLOAD_FILE]: {
      icon: IconsEnum.FILE_DOWNLOAD,
      onClick: this.onDownloadFileClick.bind(this),
    },
    [ToolbarToolsEnum.REFRESH]: {
      icon: IconsEnum.SYNC,
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
        {props.leftContent}
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
        {props.rightContent}
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
      this.dispatchPlainAction(ToolbarToolsActionBuilder.buildRefreshPlainAction(this.props.sectionName));
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
      this.dispatchPlainAction(ToolbarToolsActionBuilder.buildFilterPlainAction(this.props.sectionName));
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
      this.dispatchPlainAction(ToolbarToolsActionBuilder.buildDownloadFilePlainAction(this.props.sectionName));
    }
  }
}