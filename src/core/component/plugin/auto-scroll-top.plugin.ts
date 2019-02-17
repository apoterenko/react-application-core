import {
  IUniversalComponentPlugin,
  IUniversalComponent,
} from '../../entities-definitions.interface';
import { DI_TYPES, lazyInject } from '../../di';
import { IDomAccessor } from '../../component/dom-accessor';

export class AutoScrollTopPlugin implements IUniversalComponentPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private domAccessor: IDomAccessor;

  private contentHeight: number;

  /**
   * @stable [27.10.2018]
   * @param {IUniversalComponent} component
   */
  constructor(private component: IUniversalComponent) {
  }

  /**
   * @stable [27.10.2018]
   */
  public componentDidUpdate(): void {
    this.updateScrollTop();
  }

  /**
   * @stable [27.10.2018]
   */
  public componentDidMount(): void {
    this.updateScrollTop();
  }

  /**
   * @stable [01.12.2018]
   */
  private updateScrollTop(): void {
    const el = this.component.getSelf();
    const contentHeight = this.domAccessor.getContentHeight(el);

    if (this.contentHeight !== contentHeight) {
      this.domAccessor.setScrollTop(el, this.contentHeight = contentHeight);
    }
  }
}
