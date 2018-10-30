import {
  IUniversalComponentPlugin,
  IUniversalComponent,
} from '../../entities-definitions.interface';
import { getContentHeight } from '../../util';

export class AutoScrollTopPlugin implements IUniversalComponentPlugin {

  private contentHeight: number;

  /**
   * @stable [27.10.2018]
   * @param {IUniversalComponent} component
   */
  constructor(private component: IUniversalComponent) {
  }

  /**
   * @stable [27.10.2018]
   * @param {Readonly<{}>} prevProps
   * @param {Readonly<{}>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>): void {
    this.updateScrollTop();
  }

  /**
   * @stable [27.10.2018]
   */
  public componentDidMount(): void {
    this.updateScrollTop();
  }

  /**
   * @stable [27.10.2018]
   */
  private updateScrollTop(): void {
    const el = this.component.self;
    const contentHeight = getContentHeight(el);

    if (this.contentHeight !== contentHeight) {
      el.scrollTop = getContentHeight(el);
      this.contentHeight = contentHeight;
    }
  }
}
