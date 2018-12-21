import { MDCMenu } from '@material/menu';
import { Component, Prop } from 'vue-property-decorator';

import { EntityIdT } from '../../definitions.interface';
import { setWidth, isNumber, isDef, removeSelf, isFn } from '../../util';
import { ComponentName } from '../connector/vue-index';
import { VueBaseComponent } from '../base/vue-index';
import { IMenuItemEntity, IMenuMaterialComponent } from '../../entities-definitions.interface';
import { IVueMenu, IVueMenuContextEntity, IVueMenuProps } from './vue-menu.interface';

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
                      @click="onSelect(item)"
                  >
                      <component v-if="tpl"
                                 :is="{template: getTemplateValue(item)}"/>
                      <template v-if="!tpl">{{getDisplayValue(item)}}</template>
                  </li>
                  <li v-if="!options"
                      class="vue-menu-list-empty-item">
                        <span class="vue-menu-list-empty-item-text mdc-list-item__text">
                            {{getPleaseWaitMessage()}}
                        </span>
                  </li>
              </ul>
          </div>
      </div>
  `,
})
class VueMenu extends VueBaseComponent implements IVueMenu, IVueMenuProps {
  @Prop() public options: IMenuItemEntity[];
  @Prop() public useLocalization: boolean;
  @Prop() public tpl: (item: IMenuItemEntity) => string;

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
   * @stable [22.12.2018]
   * @param {IMenuItemEntity} item
   * @returns {EntityIdT}
   */
  private getDisplayValue(item: IMenuItemEntity): any {
    return item.label
      ? (this.useLocalization ? this.t(item.label) : item.label)
      : item.value;
  }

  /**
   * @stable [22.12.2018]
   * @param {IMenuItemEntity} item
   * @returns {any}
   */
  private getTemplateValue(item: IMenuItemEntity): any {
    return this.tpl(item);
  }
}
