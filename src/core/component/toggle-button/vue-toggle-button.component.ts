import { Component, Prop } from 'vue-property-decorator';

import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';

// TODO
@ComponentName('vue-toggle-button')
@Component({
  template: `
    <div class='vue-toggle-button' style='display: flex; flex-direction: row'>
      <div>
        1
      </div>
      <div>
        2
      </div>
    </div>
  `,
})
class VueToggleButton extends VueBaseComponent {
  @Prop() public columns: any;
}
