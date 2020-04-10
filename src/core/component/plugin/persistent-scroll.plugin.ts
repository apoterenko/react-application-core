import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  EventsEnum,
  IComponent,
  IDomAccessor,
  IScrolledProps,
  IGenericPlugin,
} from '../../definition';
import {
  DelayedTask,
  isFn,
} from '../../util';

export class PersistentScrollPlugin implements IGenericPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;

  private readonly scrollTask: DelayedTask;
  private scrollUnsubscriber: () => void;

  /**
   * @stable [06.02.2020]
   * @param {IComponent<IScrolledProps>} component
   */
  constructor(private readonly component: IComponent<IScrolledProps>) {
    this.onScroll = this.onScroll.bind(this);
    this.scrollTask = new DelayedTask(this.doScroll.bind(this), 200);
  }

  /**
   * @stable [23.10.2019]
   */
  public componentDidMount() {
    const element = this.component.getSelf();

    // Props contain x/y
    this.domAccessor.scrollTo(this.component.props, element);

    this.scrollUnsubscriber = this.domAccessor.captureEvent({
      callback: this.onScroll,
      eventName: EventsEnum.SCROLL,
      element,
    });
  }

  /**
   * @stable [24.10.2019]
   */
  public componentWillUnmount(): void {
    this.scrollTask.stop();

    if (isFn(this.scrollUnsubscriber)) {
      this.scrollUnsubscriber();
      this.scrollUnsubscriber = null;
    }
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
