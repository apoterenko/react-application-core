import { DI_TYPES, lazyInject } from '../../di';
import {
  isFn,
  sequence,
  setStickyElementProperties,
} from '../../util';
import {
  EventsEnum,
  IEventManager,
  IUniversalPlugin,
  IUniversalScrollableComponent,
  UNIVERSAL_STICKY_ELEMENT_SELECTOR,
} from '../../definition';

export class StickyHeaderPlugin implements IUniversalPlugin {
  @lazyInject(DI_TYPES.EventManager) private readonly eventManager: IEventManager;
  private resizeUnsubscriber: () => void;

  /**
   * @stable [11.10.2019]
   * @param {IUniversalScrollableComponent} component
   */
  constructor(private component: IUniversalScrollableComponent) {
    this.doSetStickyElementProperties = this.doSetStickyElementProperties.bind(this);
    component.onScroll = sequence(component.onScroll, this.doSetStickyElementProperties);
  }

  /**
   * @stable [11.10.2019]
   */
  public componentDidMount() {
    this.resizeUnsubscriber = this.eventManager.subscribe(
      window,
      EventsEnum.RESIZE,
      this.doSetStickyElementProperties
    );
  }

  /**
   * @stable [11.10.2019]
   */
  public componentWillUnmount() {
    if (isFn(this.resizeUnsubscriber)) {
      this.resizeUnsubscriber();
    }
  }

  /**
   * @stable [11.10.2019]
   */
  public componentDidUpdate() {
    this.doSetStickyElementProperties();
  }

  /**
   * @stable [11.10.2019]
   */
  private doSetStickyElementProperties(): void {
    setStickyElementProperties(this.component.getSelf(), `.${UNIVERSAL_STICKY_ELEMENT_SELECTOR}`);
  }
}
