import { Component, Prop } from 'vue-property-decorator';

import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';
import { ILabeledValueEntity } from '../../entities-definitions.interface';
import { toClassName } from '../../util';

// TODO
@ComponentName('vue-toggle-button')
@Component({
  template: `
    <vue-flex-layout :className="'vue-toggle-button'"
                     :row="true"
                     :full="false">
      <vue-flex-layout v-for="item in items"
                       :key="item.value"
                       :class="getItemClassName(item)"
                       :row="true"
                       :alignItemsCenter="true"
                       :justifyContentCenter="true"
                       v-on:click.native="onItemClick(item)">
        {{item.label}}
      </vue-flex-layout>
    </vue-flex-layout>
  `,
})
class VueToggleButton extends VueBaseComponent {
  @Prop() public items: ILabeledValueEntity[];
  @Prop() public active: number;

  /**
   * @stable [25.10.2018]
   * @param {ILabeledValueEntity} item
   * @returns {string}
   */
  private getItemClassName(item: ILabeledValueEntity): string {
    return toClassName(
      'vue-toggle-button-item',
      this.active === item.value && 'vue-toggle-button-item-active'
    );
  }

  /**
   * @stable [25.10.2018]
   * @param {ILabeledValueEntity} item
   */
  private onItemClick(item: ILabeledValueEntity): void {
    this.$emit('select', item.value);
  }
}
