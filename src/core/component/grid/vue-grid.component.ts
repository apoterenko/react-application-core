import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import * as R from 'ramda';

import { calc } from '../../util';
import { ComponentName } from '../connector/vue-index';
import { IEntity } from '../../definitions.interface';

@ComponentName('vue-grid')
@Component({
  template: `
      <div class='vue-grid-wrapper'>
        <table v-if="!progress">
          <tbody>
            <tr v-for="entity in listData"
                :class="getRowClass(entity)"
                v-on:click="onSelect($event, entity)">
              <td v-for="column in columns"
                  v-html="getColumn(entity, column)"
                  :style="getColumnStyle(entity, column)">
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="progress">
          Please waitt...
        </div>
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
  @Prop() public rowClass: string | ((item) => string);

  /**
   * @stable [23.10.2018]
   * @param {MouseEvent} event
   * @param row
   */
  private onSelect(event: MouseEvent, row): void {
    this.$emit('onSelect', row);
  }

  /**
   * @stable [24.10.2018]
   * @param {IEntity} entity
   * @returns {string}
   */
  private getRowClass(entity: IEntity): string {
    return R.isNil(this.rowClass) ? '' : calc<string, IEntity>(this.rowClass, entity);
  }

  private getColumn(entity, column): any {  // TODO
    return column.renderer
      ? `<div>${column.renderer(entity, column, entity[column.name])}</div>`
      : `<div>${entity[column.name]}</div>`;
  }

  private getColumnStyle(entity, column) {
    return column.style || '';
  }

  private get progress(): boolean {
    return this.list.progress;
  }
}
