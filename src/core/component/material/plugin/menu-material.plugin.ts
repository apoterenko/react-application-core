import { sequence } from '../../../util';
import { IMaterialComponentFactory } from '../../material';
import { MaterialPlugin } from './material.plugin';
import { IMenu, INativeMaterialMenuComponent } from '../../menu';

export class MenuMaterialPlugin<TMenu extends IMenu,
                                TNativeMaterialComponent extends INativeMaterialMenuComponent>
  extends MaterialPlugin<TMenu, TNativeMaterialComponent> {

  private preventKeyboardDownHandling = false;

  /**
   * @stable - 29.03.2018
   */
  constructor(menu: TMenu,
              mdcFactory: IMaterialComponentFactory<TNativeMaterialComponent>) {
    super(menu, mdcFactory);

    menu.show = sequence(menu.show, this.onMenuShow, this);
    menu.hide = sequence(menu.hide, this.onMenuHide, this);
    menu.onInputFocus = sequence(menu.onInputFocus, this.onInputFocus, this);
    menu.onInputBlur = sequence(menu.onInputBlur, this.onInputBlur, this);
    menu.componentDidMount = sequence(menu.componentDidMount, this.componentDidMount, this);
    menu.componentWillUnmount = sequence(menu.componentWillUnmount, this.componentWillUnmount, this);
    menu.isOpen = this.isMenuOpen.bind(this);
    this.onMenuCancel = this.onMenuCancel.bind(this);
  }

  /**
   * @stable - 29.03.2018
   */
  public componentDidMount(): void {
    super.componentDidMount();
    this.mdc.listen('MDCMenu:cancel', this.onMenuCancel);

    const self = this;
    const originalHandleKeyboardDownFn = this.mdc.foundation_.handleKeyboardDown_;
    this.mdc.foundation_.handleKeyboardDown_ = function() {
      if (self.preventKeyboardDownHandling) {
        // https://github.com/material-components/material-components-web/issues/2422
        return false;
      }
      return originalHandleKeyboardDownFn.apply(this, arguments);
    };
  }

  /**
   * @stable - 29.03.2018
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();
    this.mdc.unlisten('MDCMenu:cancel', this.onMenuCancel);
  }

  /**
   * @stable - 29.03.2018
   */
  private isMenuOpen(): boolean {
    return this.mdc.open;
  }

  /**
   * @stable - 29.03.2018
   */
  private onMenuShow(): void {
    this.mdc.open = true;
  }

  /**
   * @stable - 29.03.2018
   */
  private onMenuHide(): void {
    this.mdc.open = false;
  }

  /**
   * @stable - 29.03.2018
   */
  private onMenuCancel(): void {
    this.component.onCancel();
  }

  /**
   * @stable - 29.03.2018
   */
  private onInputFocus(): void {
    this.preventKeyboardDownHandling = true;
  }

  /**
   * @stable - 29.03.2018
   */
  private onInputBlur(): void {
    this.preventKeyboardDownHandling = false;
  }
}
