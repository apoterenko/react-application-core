import { Component, Prop, Watch } from 'vue-property-decorator';

import { addChild } from '../../util';
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
        <div class='rac-overlay'
             :class="animationClasses"
             @click="onOverlayClick"/>
        <vue-flex-layout class="vue-popup"
                        :class="animationClasses">
            <vue-flex-layout :full="false"
                             class="vue-popup-header">
                <slot name="${VUE_POPUP_HEADER_SLOT}"/>
            </vue-flex-layout>
            <vue-flex-layout class="vue-popup-body">
                <slot/>
            </vue-flex-layout>
            <vue-flex-layout :full="false"
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
}
