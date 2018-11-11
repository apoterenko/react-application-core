import { Component, Prop } from 'vue-property-decorator';
import * as R from 'ramda';

import {
  IVueGridColumnDynamicEntity,
  IVueGridColumnConfiguration,
} from '../../vue-entities-definitions.interface';
import { calc, toClassName, orEmpty, isString } from '../../util';
import { VueBaseComponent } from '../base/vue-index';
import { ComponentName } from '../connector/vue-index';
import { IEntity, IKeyValue, AnyT } from '../../definitions.interface';

@ComponentName('vue-grid')
@Component({
  template: `
      <div class="rac-grid-wrapper">
        <table v-if="!progress"
               cellpadding="0"
               cellspacing="0"
               class="rac-grid">
          <tbody class="rac-grid-body">
            <tr v-for="entity in listData"
                :class="getRowClass(entity)"
                v-on:click="onSelect($event, entity)">
              <td v-for="column in columns"
                  :style="getColumnStyle(entity, column)"
                  class="rac-grid-column">
                    <div v-if="!isColumnDynamicEntity(entity, column)"
                         v-html="getColumn(entity, column)"
                         class="rac-grid-column-content"/>
                    <div v-else
                         class="rac-grid-column-content">
                      <component :is="getColumnDynamicComponent(entity, column)"
                                 v-on="getColumnDynamicEvents(entity, column)"
                                 v-bind="getColumnDynamicBindings(entity, column)"/>
                    </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div v-if="progress">
          Please wait...
        </div>
        <div v-if="isEmptyData">
          No data
        </div>
      </div>
    `,
  computed: {
    listData: {
      get() {
        const data = this.list.data || [];
        return !R.isNil(this.filter)
        ? data.filter((item) => this.filter(item, this.filterQuery))
        : (
            !R.isNil(this.filterQuery)
              ? (item) => !this.filterQuery || item.name.indexOf(this.filterQuery) > -1
              : data
          );
      },
    },
  },
})
class VueGrid extends VueBaseComponent {
  @Prop() public columns: any; // TODO
  @Prop() public list: any;   // TODO
  @Prop() public filterQuery: string;
  @Prop() public filter: (item) => boolean;
  @Prop() public rowClass: string | ((item) => string);
  public listData: IEntity[];
  @Prop() private eventsScope: AnyT;

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
    return toClassName(
      orEmpty(!R.isNil(this.rowClass), calc<string, IEntity>(this.rowClass, entity)),
      'rac-grid-row',
      'rac-grid-data-row',
      'rac-grid-data-row-hovered',
      'rac-grid-data-row-selectable'
    );
  }

  /**
   * @stable [11.11.2018]
   * @param {IEntity} entity
   * @param {IVueGridColumnConfiguration} column
   * @returns {string | IVueGridColumnDynamicEntity}
   */
  private getColumn(entity: IEntity, column: IVueGridColumnConfiguration): string | IVueGridColumnDynamicEntity {
    return column.renderer$
      ? column.renderer$(entity, column, entity[column.name$])
      : entity[column.name$];
  }

  /**
   * @stable [11.11.2018]
   * @param {IEntity} entity
   * @param {IVueGridColumnConfiguration} column
   * @returns {string}
   */
  private getColumnDynamicComponent(entity: IEntity, column: IVueGridColumnConfiguration): string {
    const columnDynamicEntity = this.getColumn(entity, column) as IVueGridColumnDynamicEntity;
    return columnDynamicEntity.component$;
  }

  /**
   * @stable [11.11.2018]
   * @param {IEntity} entity
   * @param {IVueGridColumnConfiguration} column
   * @returns {string}
   */
  private getColumnDynamicEvents(entity: IEntity, column: IVueGridColumnConfiguration): IKeyValue {
    const columnDynamicEntity = this.getColumn(entity, column) as IVueGridColumnDynamicEntity;

    const events$ = columnDynamicEntity.events$;
    const eventsScope = this.eventsScope;

    return R.isNil(eventsScope)
      ? events$
      : {
        ...R.mergeAll(Object.keys(events$).map((eventCbName) =>
          ({[eventCbName]: events$[eventCbName].bind(eventsScope)}))),
      };
  }

  /**
   * @stable [11.11.2018]
   * @param {IEntity} entity
   * @param {IVueGridColumnConfiguration} column
   * @returns {IKeyValue}
   */
  private getColumnDynamicBindings(entity: IEntity, column: IVueGridColumnConfiguration): IKeyValue {
    const columnDynamicEntity = this.getColumn(entity, column) as IVueGridColumnDynamicEntity;
    return columnDynamicEntity.bindings$;
  }

  /**
   * @stable [11.11.2018]
   * @param {IEntity} entity
   * @param {IVueGridColumnConfiguration} column
   * @returns {boolean}
   */
  private isColumnDynamicEntity(entity: IEntity, column: IVueGridColumnConfiguration): boolean {
    return !isString(this.getColumn(entity, column));
  }

  /**
   * @stable [11.11.2018]
   * @param {IEntity} entity
   * @param {IVueGridColumnConfiguration} column
   * @returns {string}
   */
  private getColumnStyle(entity: IEntity, column: IVueGridColumnConfiguration): string {
    return column.style$ || '';
  }

  private get progress(): boolean {
    return this.list.progress;
  }

  private get isEmptyData(): boolean {
    return !this.progress && this.listData.length === 0;
  }
}
