import * as R from 'ramda';

import {
  IUniversalComponentPlugin,
  IUniversalScrollableComponent,
  IStickyElementPayloadEntity,
} from '../../entities-definitions.interface';
import { DI_TYPES, lazyInject } from '../../di';
import { IDomAccessor } from '../dom-accessor';
import {
  getStickyElementInitialProperties,
  setStickyElementProperties,
  sequence,
  DelayedTask,
} from '../../util';

export class StickyHeaderPlugin implements IUniversalComponentPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private domAccessor: IDomAccessor;

  private stickyElementInitialProperties: IStickyElementPayloadEntity;
  private selfElementHeight: number;
  private readonly delayedTask = new DelayedTask(this.onDelayedTask.bind(this), 400);

  /**
   * @stable [13.12.2018]
   * @param {IUniversalScrollableComponent} component
   */
  constructor(private component: IUniversalScrollableComponent) {
    component.onScroll = sequence(
      component.onScroll,
      () => {
        if (this.stickyElementInitialProperties) {
          setStickyElementProperties({
            ...this.stickyElementInitialProperties,
            initial: true,
          });
          this.delayedTask.start();
        }
      }
    );
  }

  /**
   * @stable [13.12.2018]
   */
  public componentDidMount() {
    this.stickyElementInitialProperties = this.getStickyElementInitialProperties();
    if (!R.isNil(this.stickyElementInitialProperties)) {
      this.selfElementHeight = this.selfHeight;
    }
  }

  /**
   * @stable [13.12.2018]
   */
  public componentWillUnmount() {
    this.stickyElementInitialProperties = null;
    this.delayedTask.stop();
  }

  /**
   * @stable [13.12.2018]
   */
  public componentDidUpdate() {
    this.doUpdate();
  }

  /**
   * @stable [13.12.2018]
   * @returns {number}
   */
  private get selfHeight(): number {
    return this.domAccessor.getHeight(this.component.getSelf());
  }

  /**
   * @stable [13.12.2018]
   * @returns {IStickyElementPayloadEntity}
   */
  private getStickyElementInitialProperties(): IStickyElementPayloadEntity {
    return getStickyElementInitialProperties(this.domAccessor.toJqEl(this.component.getSelf()));
  }

  /**
   * @stable [20.12.2018]
   */
  private doUpdate(): void {
    const selfHeight = this.selfHeight;
    const stickyElementInitialProperties0 = this.getStickyElementInitialProperties();
    const hasStickyElementChanged = !R.isNil(stickyElementInitialProperties0)
      && !R.isNil(this.stickyElementInitialProperties)
      && stickyElementInitialProperties0.jqStickyEl.get()[0] !== this.stickyElementInitialProperties.jqStickyEl.get()[0];

    /**
     * Only this way we can detect the DOM changes
     */
    if (selfHeight !== this.selfElementHeight || hasStickyElementChanged) {
      const stickyElementInitialProperties = this.getStickyElementInitialProperties();
      if (!R.isNil(stickyElementInitialProperties)) {
        this.selfElementHeight = selfHeight;
        this.stickyElementInitialProperties = stickyElementInitialProperties;
      }
    }
  }

  private onDelayedTask(): void {
    setStickyElementProperties(this.stickyElementInitialProperties);
  }
}
