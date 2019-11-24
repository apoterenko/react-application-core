import * as R from 'ramda';

import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  isFn,
  sequence,
  setStickyElementProperties,
} from '../../util';
import {
  EventsEnum,
  IDomAccessor,
  IEventManager,
  IScrollableComponent,
  IStickyComponentProps,
  IUniversalPlugin,
} from '../../definition';

export class StickyHeaderPlugin implements IUniversalPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.EventManager) private readonly eventManager: IEventManager;

  private resizeUnsubscriber: () => void;
  private isStickyElementMounted = false;

  /**
   * @stable [11.10.2019]
   * @param {IScrollableComponent} component
   */
  constructor(private readonly component: IScrollableComponent<IStickyComponentProps>) {
    this.doSetStickyElementProperties = this.doSetStickyElementProperties.bind(this);
    component.onScroll = sequence(component.onScroll, this.doSetStickyElementProperties);
  }

  /**
   * @stable [11.10.2019]
   */
  public componentDidMount() {
    this.checkStickyElement();
  }

  /**
   * @stable [11.10.2019]
   */
  public componentDidUpdate() {
    this.checkStickyElement();
    this.doSetStickyElementProperties();
  }

  /**
   * @stable [11.10.2019]
   */
  public componentWillUnmount() {
    this.clearAllListeners();
  }

  /**
   * @stable [11.10.2019]
   */
  private doSetStickyElementProperties(): void {
    if (!this.isStickyElementMounted) {
      return;
    }
    setStickyElementProperties(this.component.getSelf(), this.stickySelector);
  }

  /**
   * @stable [16.10.2019]
   */
  private checkStickyElement(): void {
    this.isStickyElementMounted = !R.isNil(this.domAccessor.findElement(this.stickySelector, this.component.getSelf()));

    this.clearAllListeners();
    if (this.isStickyElementMounted) {
      this.resizeUnsubscriber = this.domAccessor.captureEvent({
        callback: this.doSetStickyElementProperties,
        eventName: EventsEnum.RESIZE,
      });
    }
  }

  /**
   * @stable [16.10.2019]
   */
  private clearAllListeners(): void {
    if (isFn(this.resizeUnsubscriber)) {
      this.resizeUnsubscriber();
      this.resizeUnsubscriber = null;
    }
  }

  /**
   * @stable [16.10.2019]
   * @returns {string}
   */
  private get stickySelector(): string {
    return `.${this.component.props.stickyElementClassName}`;
  }
}
