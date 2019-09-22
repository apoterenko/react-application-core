import { IDomAccessor } from '../../dom-accessor/dom-accessor.interface';
import { IOnScrollWrapper } from '../../../definitions.interface';
import { isFn, DelayedTask, sequence } from '../../../util';
import {
  IUniversalComponentEntity,
  IUniversalPlugin,
  IUniversalScrollableComponent,
} from '../../../definition';
import { lazyInject, DI_TYPES } from '../../../di';

export class ScrollPlugin implements IUniversalPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private readonly domAccessor: IDomAccessor;

  private scrollTask: DelayedTask;

  /**
   * @stable [22.09.2019]
   * @param {IUniversalScrollableComponent} component
   */
  constructor(private readonly component: IUniversalScrollableComponent<IUniversalComponentEntity & IOnScrollWrapper>) {
    if (isFn(component.onScroll)) {
      this.scrollTask = new DelayedTask(this.doScroll.bind(this), 200);
      component.onScroll = sequence(component.onScroll, this.onScroll, this);
    }
  }

  /**
   * @stable [22.09.2019]
   */
  public componentWillUnmount(): void {
    this.scrollTask.stop();
  }

  /**
   * @stable [22.09.2019]
   */
  private onScroll(): void {
    this.scrollTask.start();
  }

  /**
   * @stable [01.12.2018]
   */
  private doScroll(): void {
    const component = this.component;
    component.props.onScroll(this.domAccessor.getScrollInfo(component.getSelf()));
  }
}
