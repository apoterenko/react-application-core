import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

import { ComponentName } from '../connector/vue-index';

@ComponentName('vue-grid')
@Component({
  template: `
      <div class='vue-grid-wrapper'>
        <table>
          <tbody>
            <tr v-for="entity in listData"
                v-on:click="onSelect($event, entity)">
              <td v-for="column in columns"
                  :style="getColumnStyle(entity, column)">
                <component :is="getColumn(entity, column)"/>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    `,
  computed: {
    listData: {
      get() {
        return (this.list.data || []).filter((item) => !this.filterQuery || item.name.indexOf(this.filterQuery) > -1);
      },
    },
  },
})
class VueGrid extends Vue {
  @Prop() public columns: any;
  @Prop() public list: any;
  @Prop() public filterQuery: string;

  /**
   * @stable [23.10.2018]
   * @param {MouseEvent} event
   * @param row
   */
  private onSelect(event: MouseEvent, row): void {
    this.$emit('onSelect', row);
  }

  private getColumn(entity, column): any {  // TODO
    return Vue.compile(column.renderer
      ? `<div>${column.renderer(entity, column, entity[column.name])}</div>`
      : `<div>${entity[column.name]}</div>`);
  }

  private getColumnStyle(entity, column) {
    return column.style || '';
  }
}
