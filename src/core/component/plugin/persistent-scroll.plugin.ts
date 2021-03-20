import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  EventsEnum,
  IDomAccessor,
  IGenericComponent,
  IGenericPlugin,
  IScrolledProps,
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
   * @param {IGenericComponent<IScrolledProps>} component
   */
  constructor(private readonly component: IGenericComponent<IScrolledProps>) {
    this.onScroll = this.onScroll.bind(this);
    this.scrollTask = new DelayedTask(this.doScroll.bind(this), 200);
  }

  /**
   * @stable [19.03.2021]
   */
  public componentDidMount() {
    const element = this.selfRef;
    const originalProps = this.component.originalProps;
    const left = originalProps.x;
    const top = originalProps.y;

    this.domAccessor.scrollTo({left, top}, element);

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
    this.component.props.onScroll(this.domAccessor.getScrollInfo(this.selfRef));
  }

  /**
   * @stable [17.01.2020]
   * @returns {HTMLElement}
   */
  private get selfRef(): HTMLElement {
    return this.component.selfRef.current;
  }
}
