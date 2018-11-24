import { MDCMenu } from '@material/menu';
import { Component, Prop } from 'vue-property-decorator';

import { EntityIdT } from '../../definitions.interface';
import { setWidth, isNumber, isDef, removeSelf } from '../../util';
import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';
import { IMenuItemEntity, IMenuMaterialComponent } from '../../entities-definitions.interface';
import { IVueMenu, IVueMenuContextEntity } from './vue-menu.interface';

@ComponentName('vue-menu')
@Component({
  data: () => ({
    opened: false,
  }),
  template: `
    <div v-if="opened"
         class="mdc-menu-surface--anchor">
      <div ref="self"
           class="vue-menu mdc-menu mdc-menu-surface">
        <ul class="vue-menu-list mdc-list"
            role="menu"
            aria-hidden="true"
            aria-orientation="vertical">
          <li v-for="item in options"
              class="vue-menu-list-item mdc-list-item"
              role="menuitem"
              @click="onSelect(item)">
            <span class="mdc-list-item__text">{{getDisplayValue(item)}}</span>
          </li>
          <li v-if="!options"
              class="vue-menu-list-empty-item">
            <span class="vue-menu-list-empty-item-text mdc-list-item__text">{{getPleaseWaitMessage()}}</span>
          </li>
        </ul>
      </div>
    </div>
  `,
})
class VueMenu extends VueBaseComponent implements IVueMenu {
  @Prop() private options: IMenuItemEntity[];

  private mdc: IMenuMaterialComponent;    // TODO Use inheritance
  private el: Element;

  /**
   * @stable [17.11.2018]
   */
  constructor() {
    super();
    this.onMenuClose = this.onMenuClose.bind(this);
  }

  /**
   * @stable [17.11.2018]
   * @param {IVueMenuContextEntity} context
   */
  public show(context?: IVueMenuContextEntity): void {
    this.$data.opened = true;
    this.$nextTick(() => {
      this.bindMenu();
      this.openMenu(context);
    });
  }

  /**
   * @stable [17.11.2018]
   * @param {IVueMenuContextEntity} context
   */
  private openMenu(context?: IVueMenuContextEntity): void {
    this.mdc.open = true;

    if (isDef(context)) {
      if (isNumber(context.width)) {
        setWidth(this.getSelf(), context.width);
      }
    }
  }

  /**
   * @stable [17.11.2018]
   */
  private bindMenu(): void {
    if (this.mdc) {
      return;
    }
    this.mdc = MDCMenu.attachTo(this.el = this.getSelf());
    this.mdc.hoistMenuToBody();                                     // Prevent an outer container scroll appearing
    this.mdc.listen('MDCMenuSurface:closed', this.onMenuClose);
  }

  /**
   * @stable [17.11.2018]
   */
  private onMenuClose() {
    this.mdc.unlisten('MDCMenuSurface:closed', this.onMenuClose);
    this.mdc.destroy();
    this.mdc = null;
    this.$data.opened = false;
    removeSelf(this.el);
  }

  /**
   * @stable [17.11.2018]
   * @param {IMenuItemEntity} option
   */
  private onSelect(option: IMenuItemEntity): void {
    this.$emit('select', option);
  }

  /**
   * @stable [17.11.2018]
   * @returns {string}
   */
  private getPleaseWaitMessage(): string {
    return this.settings.messages.waitMessage;
  }

  /**
   * @stable [24.11.2018]
   * @param {IMenuItemEntity} item
   * @returns {EntityIdT}
   */
  private getDisplayValue(item: IMenuItemEntity): EntityIdT {
    return item.label || item.value;
  }
}
