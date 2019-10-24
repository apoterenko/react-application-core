import { DI_TYPES, lazyInject } from '../../di';
import {
  IDomAccessor,
  IScrollableComponent,
  IScrollableComponentProps,
  IUniversalPlugin,
  IXYEntity,
} from '../../definition';
import {
  DelayedTask,
  isFn,
  sequence,
} from '../../util';

export class PersistentScrollPlugin implements IUniversalPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  private scrollTask: DelayedTask;

  /**
   * @stable [24.10.2019]
   * @param {IScrollableComponent<IScrollableComponentProps>} component
   */
  constructor(private readonly component: IScrollableComponent<IScrollableComponentProps>) {
    if (isFn(component.onScroll) && isFn(component.props.onScroll)) {
      this.scrollTask = new DelayedTask(this.doScroll.bind(this), 200);
      component.onScroll = sequence(component.onScroll, this.onScroll, this);
    }
  }

  /**
   * @stable [23.10.2019]
   */
  public componentDidMount() {
    // Props contain x/y
    this.domAccessor.scrollTo(this.component.props, this.component.getSelf());
  }

  /**
   * @stable [24.10.2019]
   */
  public componentWillUnmount(): void {
    this.scrollTask.stop();
  }

  /**
   * @stable [23.10.2019]
   * @returns {IXYEntity}
   */
  private getScrollInfo(): IXYEntity {
    return this.domAccessor.getScrollInfo(this.component.getSelf());
  }

  /**
   * @stable [24.10.2019]
   */
  private onScroll(): void {
    this.scrollTask.start();
  }

  /**
   * @stable [24.10.2019]
   */
  private doScroll(): void {
    const component = this.component;
    component.props.onScroll(this.domAccessor.getScrollInfo(component.getSelf()));
  }
}
