import { IUniversalUIIconConfiguration } from '../../configurations-definitions.interface';
import { IUiFactory } from '../../definition';

export interface IUIFactory
  extends IUiFactory {

  /**
   * @stable [15.12.2018]
   * @param {IUniversalUIIconConfiguration | string} config
   * @returns {JSX.Element}
   */
  makeIcon?(config: IUniversalUIIconConfiguration | string): JSX.Element;
}
