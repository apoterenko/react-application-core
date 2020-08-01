import * as React from 'react';

import {
  CalcUtils,
  ClsUtils,
  TypeUtils,
  WrapperUtils,
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

/**
 * @component-impl
 * @stable [01.08.2020]
 *
 * Please use the "Mappers.toolbarToolsProps"
 */
export class ToolbarTools extends GenericComponent<IToolbarToolsProps> {

  public static readonly defaultProps: IToolbarToolsProps = {
    actions: [ToolbarToolsEnum.REFRESH],
    full: false,
  };

  /**
   * @stable [01.08.2020]
   */
  private defaultActions: Record<StringNumberT, IButtonProps> = {
    [ToolbarToolsEnum.FILTER]: {
      icon: IconsEnum.FILTER,
      onClick: this.originalProps.onFilterClick,
    },
    [ToolbarToolsEnum.DOWNLOAD_FILE]: {
      icon: IconsEnum.FILE_DOWNLOAD,
      onClick: this.originalProps.onDownloadFileClick,
    },
    [ToolbarToolsEnum.REFRESH]: {
      icon: IconsEnum.SYNC,
      onClick: this.originalProps.onRefreshClick,
    },
  };

  /**
   * @stable [01.08.2020]
   */
  public render(): JSX.Element {
    const originalProps = this.originalProps;
    const {
      actions,
      activeTools,
      className,
      disabled,
      leftContent,
      rightContent,
    } = originalProps;

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            ToolbarToolsClassesEnum.TOOLBAR_TOOLS,
            CalcUtils.calc(className),
            WrapperUtils.isFull(originalProps) && ToolbarToolsClassesEnum.FULL_TOOLBAR_TOOLS
          )
        }
      >
        {leftContent}
        {
          actions.map((cfg, index) => {
            const cfgAsPrimitive = cfg as ToolbarToolsEnum;
            const actionProps = TypeUtils.isPrimitive(cfg)
              ? this.defaultActions[cfgAsPrimitive]
              : cfg as IButtonProps;

            return (
              <Button
                key={`action-${index}-key`}
                disabled={disabled}
                className={
                  ClsUtils.joinClassName(
                    (activeTools || []).includes(cfgAsPrimitive) && ToolbarToolsClassesEnum.TOOLBAR_TOOLS_ACTIVE_TOOL,
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
}
