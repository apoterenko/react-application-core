import Tooltip from 'tooltip.js';

import { isDef, isUndef } from '../../util';
import { IGenericTooltipPlugin } from './generic-tooltip.interface';
import { IGenericTooltipEntity } from '../../definition';

export class GenericTooltipPlugin implements IGenericTooltipPlugin {

  private tooltipInstance: Tooltip;
  private tooltip: IGenericTooltipEntity;
  private target: HTMLElement;

  /**
   * @stable [27.05.2019]
   * @param {HTMLElement} value
   */
  public setTarget(value: HTMLElement): void {
    this.target = value;
  }

  /**
   * @stable [27.05.2019]
   * @param {IGenericTooltipEntity} value
   */
  public setTooltip(value: IGenericTooltipEntity): void {
    this.tooltip = value;
  }

  /**
   * @stable [27.05.2019]
   */
  public destroy(): void {
    if (isDef(this.tooltipInstance)) {
      this.tooltipInstance.dispose();
      this.tooltipInstance = null;
    }
  }

  /**
   * @stable [27.05.2019]
   */
  public init(): void {
    this.destroy();
    this.tooltipInstance = new Tooltip(this.target, {
      trigger: 'hover',
      ...this.tooltip,
    });
  }
}
