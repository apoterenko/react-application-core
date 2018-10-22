import { join } from '../../../util';
import { IKeyValue } from '../../../definitions.interface';
import {
  VueLayoutBuilderElementT,
  IVueLayoutBuilderConfiguration,
} from '../../../vue-configurations-definitions.interface';
import { UniversalLayoutViewBuilder } from './universal-layout-view.builder';

export class VueLayoutViewBuilder extends UniversalLayoutViewBuilder<string> {

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} props
   * @param {VueLayoutBuilderElementT[]} children
   * @param {IVueLayoutBuilderConfiguration} layoutConfig
   * @returns {string}
   */
  public buildRowView(props: IKeyValue,
                      children: VueLayoutBuilderElementT[],
                      layoutConfig: IVueLayoutBuilderConfiguration): string {
    return (
      `<div class='rac-flex rac-flex-row ${this.toFactorClassName(layoutConfig)}'>
        ${join(children, '')}
      </div>`
    );
  }

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} props
   * @param {VueLayoutBuilderElementT[]} children
   * @param {IVueLayoutBuilderConfiguration} layoutConfig
   * @returns {string}
   */
  public buildColumnView(props: IKeyValue,
                         children: VueLayoutBuilderElementT[],
                         layoutConfig: IVueLayoutBuilderConfiguration): string {
    return (
      `<div class='rac-flex rac-flex-column ${this.toFactorClassName(layoutConfig)}'>
        ${join(children, '')}
      </div>`
    );
  }

  /**
   * @stable [22.10.2018]
   * @param {IKeyValue} props
   * @returns {string}
   */
  public buildSeparatorView(props: IKeyValue): string {
    return '<div class="rac-flex-separator"/>';
  }
}
