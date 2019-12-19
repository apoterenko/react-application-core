import * as R from 'ramda';
import PerfectScrollbar from 'perfect-scrollbar';

import {
  EventsEnum,
  IDomAccessor,
  IPerfectScrollableComponent,
  IUniversalPlugin,
} from '../../definition';
import {
  DI_TYPES,
  lazyInject,
} from '../../di';
import {
  isDef,
  isFn,
} from '../../util';

export class PerfectScrollPlugin implements IUniversalPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;

  private ps;
  private resizeUnsubscriber: () => void;

  /**
   * @stable [04.12.2019]
   * @param {} component
   */
  constructor(private readonly component: IPerfectScrollableComponent) {
    this.doUpdate = this.doUpdate.bind(this);
  }

  /**
   * @stable [04.12.2019]
   */
  public componentDidMount() {
    this.tryRegisterPs();
  }

  /**
   * @stable [04.12.2019]
   */
  public componentDidUpdate() {
    this.tryRegisterPs();
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
    if (isDef(this.ps)) {
      this.ps.update();
    }
  }

  /**
   * @stable [06.12.2019]
   */
  private tryRegisterPs(): void {
    const selfRef = this.component.getSelf() as HTMLElement;
    if (R.isNil(selfRef)) {
      this.doDestroy();
      return;
    }
    if (this.doesPsExist) {
      return;
    }

    this.ps = new PerfectScrollbar(selfRef, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20,
      ...this.component.props.perfectScroll,
    });

    this.resizeUnsubscriber = this.domAccessor.captureEvent({
      eventName: EventsEnum.RESIZE,
      callback: this.doUpdate,
    });
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
  }

  /**
   * @stable [06.12.2019]
   * @returns {boolean}
   */
  private get doesPsExist(): boolean {
    return !R.isNil(this.ps);
  }
}
