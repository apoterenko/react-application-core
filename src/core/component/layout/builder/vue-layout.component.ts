import { Component, Prop } from 'vue-property-decorator';

import {
  IVueParentContainer$Wrapper,
  VueAccessorsT,
  VueComponentOptionsT,
  VueCreateElementFactoryT,
  VueNodeT,
} from '../../../vue-definitions.interface';
import { IVueLayoutBuilderConfiguration } from '../../../vue-configurations-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueBaseComponent } from '../../base/vue-index';
import { VueLayoutBuilder } from './vue-index';

@ComponentName('vue-layout')
@Component
class VueLayout extends VueBaseComponent {

  private layoutBuilder = new VueLayoutBuilder();
  @Prop() private schema: IVueLayoutBuilderConfiguration;

  /**
   * @stable [21.10.2018]
   * @param {VueCreateElementFactoryT} factory
   * @returns {VueNodeT}
   */
  public render(factory: VueCreateElementFactoryT): VueNodeT {
    const parentContainer$Wrapper: IVueParentContainer$Wrapper<{}> = {
      parentContainer$: {
        get: () => this.findParentContainer(this),
      },
    };
    const config: VueComponentOptionsT = {
      computed: parentContainer$Wrapper as VueAccessorsT,
      template: this.layoutBuilder.build(this.schema),
    };
    return factory(config);
  }
}
