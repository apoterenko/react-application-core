import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { ComponentName } from '../connector/vue-index';

// TODO
@ComponentName('vue-grid')
@Component({
  template: `
      <div class='vue-grid-wrapper'>
        <table>
          <tbody>
            <tr v-for="entity in listData"
                v-on:click="onSelect($event, entity)">
              <td v-for="column in columns">
                {{entity[column.name]}}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  computed: {
    listData: {
      get() {
        return this.list.data || [];
      },
    },
  },
})
class VueGrid extends Vue {  // TODO
  @Prop() public columns: any;
  @Prop() public list: any;

  /**
   * @stable [23.10.2018]
   * @param {MouseEvent} event
   * @param row
   */
  private onSelect(event: MouseEvent, row): void {
    this.$emit('onSelect', row);
  }
}
