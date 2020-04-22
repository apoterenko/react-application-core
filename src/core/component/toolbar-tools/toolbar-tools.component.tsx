import * as React from 'react';

import {
  calc,
  isPrimitive,
  joinClassName,
} from '../../util';
import { GenericComponent } from '../base/generic.component';
import { FlexLayout } from '../layout';
import {
  IButtonProps,
  IconsEnum,
  IToolbarToolsProps,
  ToolbarToolsClassesEnum,
  ToolbarToolsEnum,
} from '../../definition';
import { Button } from '../button';
import { StringNumberT } from '../../definitions.interface';

export class ToolbarTools extends GenericComponent<IToolbarToolsProps> {

  public static readonly defaultProps: IToolbarToolsProps = {
    actions: [ToolbarToolsEnum.REFRESH],
  };

  private readonly defaultActions: Record<StringNumberT, IButtonProps> = {
    [ToolbarToolsEnum.FILTER]: {
      icon: IconsEnum.FILTER,
      onClick: this.props.onFilterClick,
    },
    [ToolbarToolsEnum.DOWNLOAD_FILE]: {
      icon: IconsEnum.FILE_DOWNLOAD,
      onClick: this.props.onDownloadFileClick,
    },
    [ToolbarToolsEnum.REFRESH]: {
      icon: IconsEnum.SYNC,
      onClick: this.props.onRefreshClick,
    },
  };

  /**
   * @stable [03.04.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const {
      actions,
      leftContent,
      rightContent,
    } = this.props;

    return (
      <FlexLayout
        row={true}
        justifyContentEnd={true}
        className={
          joinClassName(
            calc(props.className),
            ToolbarToolsClassesEnum.TOOLBAR_TOOLS
          )
        }
      >
        {leftContent}
        {
          actions.map((cfg, index) => {
            const cfgAsPrimitive = cfg as ToolbarToolsEnum;
            const actionProps = isPrimitive(cfg)
              ? this.defaultActions[cfgAsPrimitive]
              : cfg as IButtonProps;

            return (
              <Button
                key={`action-${index}-key`}
                disabled={props.actionsDisabled}
                className={joinClassName(
                  (props.activeActions || []).includes(cfgAsPrimitive) && 'rac-toolbar-tool-active',
                )}
                {...actionProps}/>
            );
          })
        }
        {rightContent}
      </FlexLayout>
    );
  }
}
