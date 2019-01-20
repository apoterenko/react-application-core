import { Component, Prop, Watch } from 'vue-property-decorator';

import { addChild, calc, toClassName } from '../../util';
import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';
import { IVueComponent } from '../../vue-entities-definitions.interface';
import {
  VUE_POPUP_CLOSE_EVENT,
  VUE_POPUP_FOOTER_SLOT,
  VUE_POPUP_HEADER_SLOT,
} from './vue-popup.interface';

@ComponentName('vue-popup')
@Component({
  template: `
    <vue-flex-layout v-if="open"
                     ref="popupWrapper"
                     class="vue-popup-wrapper rac-absolute-full">
        <div class='rac-overlay rac-absolute-full'
             :class="animationClasses"
             @click="onOverlayClick"/>
        <vue-flex-layout :class="getClassName()">
            <vue-flex-layout v-if="hasHeaderSlot()"
                             :full="false"
                             class="vue-popup-header">
                <slot name="${VUE_POPUP_HEADER_SLOT}"/>
            </vue-flex-layout>
            <vue-flex-layout class="vue-popup-body">
                <slot/>
            </vue-flex-layout>
            <vue-flex-layout v-if="hasFooterSlot()"
                             :full="false"
                             class="vue-popup-footer">
                <slot name="${VUE_POPUP_FOOTER_SLOT}"/>
            </vue-flex-layout>
        </vue-flex-layout>
    </vue-flex-layout>
  `,
})
class VuePopup extends VueBaseComponent {
  @Prop({default: (): string => 'animated fadeIn'}) private animationClasses: string;
  @Prop() private open: boolean;

  /**
   * @stable [26.11.2018]
   */
  @Watch('open')
  private onOpenUpdate(): void {
    if (this.open) {
      this.$nextTick(() => addChild(this.getPopupWrapper().$el));
    }
  }

  /**
   * @stable [26.11.2018]
   * @returns {IVueComponent}
   */
  private getPopupWrapper(): IVueComponent {
    return this.$refs.popupWrapper as IVueComponent;
  }

  /**
   * @stable [26.11.2018]
   */
  private onOverlayClick(): void {
    this.$emit(VUE_POPUP_CLOSE_EVENT);
  }

  /**
   * @stable [29.11.2018]
   * @returns {boolean}
   */
  private hasFooterSlot(): boolean {
    return this.hasSlot(VUE_POPUP_FOOTER_SLOT);
  }

  /**
   * @stable [29.11.2018]
   * @returns {boolean}
   */
  private hasHeaderSlot(): boolean {
    return this.hasSlot(VUE_POPUP_HEADER_SLOT);
  }

  /**
   * @stable [20.01.2019]
   * @returns {string}
   */
  private getClassName(): string {
    return toClassName('vue-popup', calc(this.className), this.animationClasses);
  }
}
