import { DI_TYPES, lazyInject } from '../../di';
import {
  IDomAccessor,
  IUniversalComponent,
  IGenericPlugin,
} from '../../definition';

export class AutoScrollTopPlugin implements IGenericPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;

  private contentHeight: number;

  /**
   * @stable [27.10.2018]
   * @param {IUniversalComponent} component
   */
  constructor(private readonly component: IUniversalComponent) {
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
    const self = this.component.getSelf();
    const contentHeight = this.domAccessor.getContentHeight(self);

    if (this.contentHeight !== contentHeight) {
      this.domAccessor.setScrollTop(self, this.contentHeight = contentHeight);
    }
  }
}
