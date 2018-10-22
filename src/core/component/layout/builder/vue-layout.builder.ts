import { VueLayoutViewBuilder } from './vue-layout-view.builder';
import { UniversalLayoutBuilder } from './universal-layout.builder';

export class VueLayoutBuilder extends UniversalLayoutBuilder<string> {

  /**
   * @stable [22.10.2018]
   */
  constructor() {
    super(new VueLayoutViewBuilder());
  }
}
