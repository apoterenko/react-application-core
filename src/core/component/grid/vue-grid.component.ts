import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import * as R from 'ramda';

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
        const data = this.list.data || [];
        return !R.isNil(this.filter)
        ? (
            data.filter((item) => this.filter(item, this.filterQuery))
        )
        : (
            !R.isNil(this.filterQuery)
            ? (item) => !this.filterQuery || item.name.indexOf(this.filterQuery) > -1
            : data
        );
      },
    },
  },
})
class VueGrid extends Vue {
  @Prop() public columns: any;
  @Prop() public list: any;
  @Prop() public filterQuery: string;
  @Prop() public filter: (item) => boolean;

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
