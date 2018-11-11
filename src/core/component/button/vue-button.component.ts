import { Component, Prop } from 'vue-property-decorator';

import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';

@ComponentName('vue-button')
@Component({
  template: `
    <button class='vue-button'
            v-on:click="onClick($event)">
      {{text}}
    </button>
  `,
})
class VueButton extends VueBaseComponent {
  @Prop() private text: string;

  /**
   * @stable [11.11.2018]
   * @param {MouseEvent} event
   */
  private onClick(event: MouseEvent): void {
    this.$emit('click', event);
  }
}
