import { Component } from 'vue-property-decorator';

import { ComponentName } from '../../connector/vue-index';
import { VueBaseComponent } from '../../base/vue-index';

@ComponentName('vue-flex-separator')
@Component({
  template: `
    <div class="rac-flex-separator"/>
  `,
})
class VueFlexSeparator extends VueBaseComponent {
}
