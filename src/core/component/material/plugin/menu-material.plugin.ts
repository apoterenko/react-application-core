import { MDCMenu } from '@material/menu';

import { sequence } from '../../../util';
import { MaterialPlugin } from './material.plugin';
import { IMenu, INativeMaterialMenuComponent } from '../../menu';

export class MenuMaterialPlugin<TMenu extends IMenu> extends MaterialPlugin<TMenu, INativeMaterialMenuComponent> {

  /**
   * See https://github.com/material-components/material-components-web/issues/2422
   */
  private preventKeyboardDownHandling = false;

  /**
   * @stable [17.05.2018]
   * @param {TMenu} menu
   */
  constructor(menu: TMenu) {
    super(menu, MDCMenu);
    this.onMenuCancel = this.onMenuCancel.bind(this);

    // We need to patch the native MDC
    // See https://github.com/material-components/material-components-web/issues/2422
    menu.onInputFocus = sequence(menu.onInputFocus, this.onInputFocus, this);
    menu.onInputBlur = sequence(menu.onInputBlur, this.onInputBlur, this);

    // Complete the component behavior
    menu.isOpen = this.isMenuOpen.bind(this);
    menu.show = sequence(menu.show, this.show, this);
    menu.hide = sequence(menu.hide, this.hide, this);
  }

  /**
   * @stable [17.05.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();
    this.mdc.listen('MDCMenu:cancel', this.onMenuCancel);

    /**
     * MDC patch
     * See https://github.com/material-components/material-components-web/issues/2422
     */
    const self = this;
    const originalHandleKeyboardDownFn = this.mdc.foundation_.handleKeyboardDown_;
    this.mdc.foundation_.handleKeyboardDown_ = function() {
      if (self.preventKeyboardDownHandling) {
        return false;
      }
      return originalHandleKeyboardDownFn.apply(this, arguments);
    };
  }

  /**
   * @stable [17.05.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.mdc.unlisten('MDCMenu:cancel', this.onMenuCancel);
  }

  /**
   * @stable [17.05.2018]
   */
  private isMenuOpen(): boolean {
    return this.mdc.open;
  }

  /**
   * @stable [17.05.2018]
   */
  private show(): void {
    this.mdc.open = true;
  }

  /**
   * @stable [17.05.2018]
   */
  private hide(): void {
    this.mdc.open = false;
  }

  /**
   * @stable [17.05.2018]
   */
  private onMenuCancel(): void {
    this.component.hide();
  }

  /**
   * See https://github.com/material-components/material-components-web/issues/2422
   * @stable [17.05.2018]
   */
  private onInputFocus(): void {
    this.preventKeyboardDownHandling = true;
  }

  /**
   * See https://github.com/material-components/material-components-web/issues/2422
   * @stable [17.05.2018]
   */
  private onInputBlur(): void {
    this.preventKeyboardDownHandling = false;
  }
}
