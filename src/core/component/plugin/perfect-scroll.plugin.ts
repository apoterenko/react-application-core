import * as R from 'ramda';
import * as PerfectScrollbar from './perfect-scrollbar'; // TODO

import {
  EventsEnum,
  IDomAccessor,
  IEventEmitter,
  IPerfectScrollableComponent,
  IUniversalPlugin,
  SyntheticEmitterEventsEnum,
} from '../../definition';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  isFn,
} from '../../util';

export class PerfectScrollPlugin implements IUniversalPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;
  @lazyInject(DI_TYPES.EventEmitter) private readonly eventEmitter: IEventEmitter;

  private ps;
  private resizeUnsubscriber: () => void;
  private scrollUnsubscriber: () => void;

  /**
   * @stable [04.12.2019]
   * @param {} component
   */
  constructor(private readonly component: IPerfectScrollableComponent) {
    this.doUpdate = this.doUpdate.bind(this);
    this.onScroll = this.onScroll.bind(this);
  }

  /**
   * @stable [04.12.2019]
   */
  public componentDidMount() {
    this.registerPlugin();
  }

  /**
   * @stable [04.12.2019]
   */
  public componentDidUpdate() {
    this.registerPlugin();
    this.doUpdate();
  }

  /**
   * @stable [04.12.2019]
   */
  public componentWillUnmount(): void {
    this.doDestroy();
  }

  /**
   * @stable [06.12.2019]
   */
  private doUpdate(): void {
    if (R.isNil(this.ps)) {
      return;
    }
    this.ps.update();
  }

  /**
   * @stable [06.12.2019]
   */
  private registerPlugin(): void {
    const selfRef = this.selfRef;
    if (R.isNil(selfRef)) {
      this.doDestroy();
      return;
    }
    if (this.doesPsExist) {
      return;
    }

    this.ps = new PerfectScrollbar(selfRef, {
      wheelSpeed: 2,
      wheelPropagation: false,
      minScrollbarLength: 20,
      ...this.component.props.perfectScroll,
    });

    this.scrollUnsubscriber = this.domAccessor.captureEvent({
      eventName: EventsEnum.SCROLL,
      element: selfRef,
      callback: this.onScroll,
    });

    this.resizeUnsubscriber = this.domAccessor.captureEvent({
      eventName: EventsEnum.RESIZE,
      callback: this.doUpdate,
    });
  }

  /**
   * @stable [17.01.2020]
   */
  private onScroll(): void {
    this.eventEmitter.emit(SyntheticEmitterEventsEnum.SCROLL, this.selfRef);
  }

  /**
   * @stable [06.12.2019]
   */
  private doDestroy(): void {
    if (this.doesPsExist) {
      this.ps.destroy();
      this.ps = null;
    }

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
   * @stable [06.12.2019]
   * @returns {boolean}
   */
  private get doesPsExist(): boolean {
    return !R.isNil(this.ps);
  }

  /**
   * @stable [17.01.2020]
   * @returns {HTMLElement}
   */
  private get selfRef(): HTMLElement {
    return this.component.getSelf() as HTMLElement;
  }
}
