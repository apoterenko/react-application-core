import { Component, Prop } from 'vue-property-decorator';

import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';
import {
  VUE_FORM_HEADER_SLOT,
  VUE_FORM_FOOTER_SLOT,
} from './vue-form.interface';

@ComponentName('vue-form')
@Component({
  template: `
    <div class="vue-form rac-flex-full">
        <vue-flex-layout v-if="title || hasHeaderSlot()"
                         :full="false"
                         :row="true"
                         class="vue-form-header">
            <vue-flex-layout v-if="title"
                             :full="false"
                             class="vue-form-title">
                {{title}}
            </vue-flex-layout>
            <slot name="${VUE_FORM_HEADER_SLOT}"/>
        </vue-flex-layout>
        <vue-flex-layout class="vue-form-body">
            <slot/>
        </vue-flex-layout>
        <vue-flex-layout v-if="hasFooterSlot()"
                         :full="false"
                         class="vue-form-footer">
            <slot name="${VUE_FORM_FOOTER_SLOT}"/>
        </vue-flex-layout>
    </div>
  `,
})
class VueForm extends VueBaseComponent {
  @Prop() private title: string;

  /**
   * @stable [26.11.2018]
   * @returns {boolean}
   */
  private hasFooterSlot(): boolean {
    return this.hasSlot(VUE_FORM_FOOTER_SLOT);
  }

  /**
   * @stable [26.11.2018]
   * @returns {boolean}
   */
  private hasHeaderSlot(): boolean {
    return this.hasSlot(VUE_FORM_HEADER_SLOT);
  }
}
