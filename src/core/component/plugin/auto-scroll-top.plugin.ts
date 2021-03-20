import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  IDomAccessor,
  IGenericComponent,
  IGenericComponentProps,
  IGenericPlugin,
} from '../../definition';

export class AutoScrollTopPlugin implements IGenericPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;

  private contentHeight: number;

  /**
   * @stable [21.04.2020]
   * @param {IGenericComponent<IGenericComponentProps, {}, HTMLElement>} component
   */
  constructor(private readonly component: IGenericComponent<IGenericComponentProps, {}, HTMLElement>) {
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
   * @stable [21.04.2020]
   */
  private updateScrollTop(): void {
    const self = this.component.selfRef.current;
    const contentHeight = this.domAccessor.getContentHeight(self);

    if (this.contentHeight !== contentHeight) {
      this.domAccessor.scrollTo({top: this.contentHeight = contentHeight}, self);
    }
  }
}
