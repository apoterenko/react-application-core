import { MDCMenu } from '@material/menu';

import { INativeMaterialMenuComponent } from '../../menu';
import { MaterialPlugin } from './material.plugin';
import { sequence, isParentDocumentBody, removeSelf } from '../../../util';
import { IMenu } from '../../../definition';

export class MenuMaterialPlugin<TMenu extends IMenu>
  extends MaterialPlugin<TMenu, INativeMaterialMenuComponent> {

  /**
   * @stable [04.10.2018]
   * @param {TMenu} menu
   */
  constructor(menu: TMenu) {
    super(menu, MDCMenu);

    menu.isOpen = this.isMenuOpen.bind(this);
    menu.show = sequence(menu.show, this.show, this);
    menu.hide = sequence(menu.hide, this.hide, this);
  }

  /**
   * @stable [04.10.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (!isParentDocumentBody(this.component.getSelf())) {
      this.mdc.hoistMenuToBody();   // Prevent an outer container scroll appearing
    }
  }

  /**
   * @stable [19.11.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    removeSelf(this.component.getSelf());  // Because of hoistMenuToBody
  }

  /**
   * @stable [04.10.2018]
   */
  private isMenuOpen(): boolean {
    return this.doesMdcExist && this.mdc.open;
  }

  /**
   * @stable [04.10.2018]
   */
  private show(): void {
    this.mdc.open = true;
  }

  /**
   * @stable [04.10.2018]
   */
  private hide(): void {
    this.mdc.open = false;
  }
}
