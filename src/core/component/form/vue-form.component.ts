import { Component, Prop } from 'vue-property-decorator';

import { toClassName, calc } from '../../util';
import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';
import {
  VUE_FORM_HEADER_SLOT,
  VUE_FORM_FOOTER_SLOT,
} from './vue-form.interface';

@ComponentName('vue-form')
@Component({
  template: `
    <vue-flex-layout :full="full"
                     :className="getClassName()">
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
        <vue-flex-layout :full="full"
                         :responsive="responsive"
                         :wrap="responsive"
                         :row="true"
                         class="vue-form-body">
            <slot/>
        </vue-flex-layout>
        <vue-flex-layout v-if="hasFooterSlot()"
                         :full="false"
                         :row="true"
                         class="vue-form-footer">
            <slot name="${VUE_FORM_FOOTER_SLOT}"/>
        </vue-flex-layout>
    </vue-flex-layout>
  `,
})
class VueForm extends VueBaseComponent {
  @Prop() public readonly responsive: boolean;

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

  /**
   * @stable [27.05.2019]
   * @returns {string}
   */
  private getClassName(): string {
    return toClassName('vue-form', calc(this.className));
  }
}
