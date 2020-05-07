import * as React from 'react';

import {
  calc,
  isFull,
  isPrimitive,
  joinClassName,
} from '../../util';
import { GenericComponent } from '../base/generic.component';
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
    full: true,
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
      <div
        className={
          joinClassName(
            ToolbarToolsClassesEnum.TOOLBAR_TOOLS,
            calc(props.className),
            isFull(props) && ToolbarToolsClassesEnum.FULL_TOOLBAR_TOOLS
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
                disabled={props.disabled}
                className={
                  joinClassName(
                    (props.activeTools || []).includes(cfgAsPrimitive) && ToolbarToolsClassesEnum.TOOLBAR_TOOLS_ACTIVE_TOOL,
                  )
                }
                {...actionProps}/>
            );
          })
        }
        {rightContent}
      </div>
    );
  }

  /**
   * @stable [07.05.2020]
   */
  private readonly defaultActions = (): Record<StringNumberT, IButtonProps> =>
    ({
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
    })
}
