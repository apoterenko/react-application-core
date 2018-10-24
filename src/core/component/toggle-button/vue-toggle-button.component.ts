import { Component, Prop } from 'vue-property-decorator';

import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';

// TODO
@ComponentName('vue-toggle-button')
@Component({
  template: `
    <vue-flex-layout :className="'vue-toggle-button'"
                     :row="true"
                     :full="false">
      <vue-flex-layout :class="'vue-toggle-button-item'"
                       :row="true"
                       :alignItemsCenter="true"
                       :justifyContentCenter="true">
        Active
      </vue-flex-layout>
      <vue-flex-layout :className="'vue-toggle-button-item'"
                       :row="true"
                       :alignItemsCenter="true"
                       :justifyContentCenter="true">
        Archive
      </vue-flex-layout>
    </vue-flex-layout>
  `,
})
class VueToggleButton extends VueBaseComponent {
  @Prop() public columns: any;
}
