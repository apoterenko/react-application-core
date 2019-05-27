import { IGenericTooltipEntity } from '../../definition';

/**
 * @stable [27.05.2019]
 */
export interface IGenericTooltipPlugin {
  destroy(): void;
  init(): void;
  setTarget(value: HTMLElement): void;
  setTooltip(value: IGenericTooltipEntity): void;
}
