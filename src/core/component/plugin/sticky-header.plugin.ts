import * as R from 'ramda';

import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  isFn,
  setStickyElementProperties,
} from '../../util';
import {
  EventsEnum,
  IComponent,
  IDomAccessor,
  IEventManager,
  IStickyComponentProps,
  IGenericPlugin,
} from '../../definition';

export class StickyHeaderPlugin implements IGenericPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.EventManager) private readonly eventManager: IEventManager;

  private resizeUnsubscriber: () => void;
  private scrollUnsubscriber: () => void;
  private isStickyElementMounted = false;

  /**
   * @stable [06.02.2020]
   * @param {IComponent<IStickyComponentProps>} component
   */
  constructor(private readonly component: IComponent<IStickyComponentProps>) {
    this.doSetStickyElementProperties = this.doSetStickyElementProperties.bind(this);
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
    const element = this.component.getSelf();
    this.isStickyElementMounted = !R.isNil(this.domAccessor.findElement(this.stickySelector, element));

    this.clearAllListeners();
    if (this.isStickyElementMounted) {

      this.resizeUnsubscriber = this.domAccessor.captureEvent({
        callback: this.doSetStickyElementProperties,
        eventName: EventsEnum.RESIZE,
      });

      this.scrollUnsubscriber = this.domAccessor.captureEvent({
        callback: this.doSetStickyElementProperties,
        eventName: EventsEnum.SCROLL,
        element,
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
    if (isFn(this.scrollUnsubscriber)) {
      this.scrollUnsubscriber();
      this.scrollUnsubscriber = null;
    }
  }

  /**
   * @stable [16.10.2019]
   * @returns {string}
   */
  private get stickySelector(): string {
    return this.domAccessor.asSelector(this.component.props.stickyElementClassName);
  }
}
