import { Component, Prop } from 'vue-property-decorator';

import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';

@ComponentName('vue-popup')
@Component({
  template: `
    <vue-flex-layout v-if="open"
                     class="vue-popup animated fadeIn">
      <vue-flex-layout :full="false"
                       class="vue-popup-header">
        <slot name="header"/>
      </vue-flex-layout>
      <vue-flex-layout :row="true"
                       class="vue-popup-body">
        <slot name="body"/>
      </vue-flex-layout>
      <vue-flex-layout :full="false"
                       :row="true"
                       :justifyContentCenter="true"
                       :alignItemsCenter="true"
                       class="vue-popup-footer">
        <slot name="footer"/>
      </vue-flex-layout>
    </vue-flex-layout>
  `,
})
class VuePopup extends VueBaseComponent {
  @Prop() private open: boolean;
}
