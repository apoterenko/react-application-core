import { Component, Prop } from 'vue-property-decorator';

import { calc, toClassName } from '../../util';
import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';
import { IVueButtonProps } from './vue-button.interface';

@ComponentName('vue-button')
@Component({
  template: `
    <button :class="getClassName()"
            :disabled="disabled"
            v-on:click="onClick($event)">
      <vue-icon v-if="icon"
                :icon="icon"/>
      {{getText()}}
    </button>
  `,
})
class VueButton extends VueBaseComponent implements IVueButtonProps {
  @Prop() public readonly text: string;
  @Prop() public readonly icon: string;
  @Prop() public readonly disabled: boolean;
  @Prop() public readonly progress: boolean;

  /**
   * @stable [11.11.2018]
   * @param {MouseEvent} event
   */
  private onClick(event: MouseEvent): void {
    this.$emit('click', event);
  }

  /**
   * @stable [27.12.2018]
   * @returns {string}
   */
  private getClassName(): string {
    return toClassName(
      'vue-button',
      calc(this.className),
      this.disabled && 'vue-button-disabled'
    );
  }

  /**
   * @stable [27.12.2018]
   * @returns {string}
   */
  private getText(): string {
    return this.progress ? this.t(this.settings.messages.waitingMessage) : this.t(this.text);
  }

  /**
   * @stable [21.01.2019]
   * @returns {string}
   */
  private getIconClassName(): string {
    return `vue-icon vue-icon-${this.icon}`;
  }
}
