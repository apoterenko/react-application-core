import { MDCMenu } from '@material/menu';

import { sequence, isParentDocumentBody, removeSelf } from '../../../util';
import { MaterialPlugin } from './material.plugin';
import { IMenu, INativeMaterialMenuComponent } from '../../menu';

export class MenuMaterialPlugin<TMenu extends IMenu> extends MaterialPlugin<TMenu, INativeMaterialMenuComponent> {

  /**
   * @stable [04.10.2018]
   * @param {TMenu} menu
   */
  constructor(menu: TMenu) {
    super(menu, MDCMenu);

    // Complete the component behavior
    menu.isOpen = this.isMenuOpen.bind(this);
    menu.show = sequence(menu.show, this.show, this);
    menu.hide = sequence(menu.hide, this.hide, this);
  }

  /**
   * @stable [04.10.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (!isParentDocumentBody(this.component.self)) {
      this.mdc.hoistMenuToBody();   // Prevent an outer container scroll appearing
    }
  }

  /**
   * @stable [19.11.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    removeSelf(this.component.self);  // Because of hoistMenuToBody
  }

  /**
   * @stable [04.10.2018]
   */
  private isMenuOpen(): boolean {
    return this.mdc.open;
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
