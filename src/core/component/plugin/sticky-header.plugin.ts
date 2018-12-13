import * as R from 'ramda';

import {
  IUniversalComponentPlugin,
  IUniversalScrollableComponent,
  IStickyElementPayloadEntity,
} from '../../entities-definitions.interface';
import { DI_TYPES, lazyInject } from '../../di';
import { IApplicationDomAccessor } from '../dom-accessor';
import {
  getStickyElementInitialProperties,
  setStickyElementProperties,
  sequence,
} from '../../util';

export class StickyHeaderPlugin implements IUniversalComponentPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private domAccessor: IApplicationDomAccessor;

  private stickyElementInitialProperties: IStickyElementPayloadEntity;
  private selfElementHeight: number;

  /**
   * @stable [13.12.2018]
   * @param {IUniversalScrollableComponent} component
   */
  constructor(private component: IUniversalScrollableComponent) {
    component.onScroll = sequence(
      component.onScroll,
      () => setStickyElementProperties(this.stickyElementInitialProperties)
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
   * @param {Readonly<{}>} prevProps
   * @param {Readonly<{}>} prevState
   * @param {never} prevContext
   */
  public componentDidUpdate(prevProps: Readonly<{}>, prevState: Readonly<{}>, prevContext?: never) {
    const selfHeight = this.selfHeight;
    const stickyElementInitialProperties0 = this.getStickyElementInitialProperties();
    const hasStickyElementChanged = !R.isNil(stickyElementInitialProperties0)
      && !R.isNil(this.stickyElementInitialProperties)
      && stickyElementInitialProperties0.jqStickyEl.get()[0] !== this.stickyElementInitialProperties.jqStickyEl.get()[0];

    /**
     * Only this way we can detect the DOM changes
     */
    if (selfHeight !== this.selfElementHeight || hasStickyElementChanged) {
      this.domAccessor.setScrollTop(this.component.getSelf(), 0); // Need to set a right initial sticky top value

      const stickyElementInitialProperties = this.getStickyElementInitialProperties();
      if (!R.isNil(stickyElementInitialProperties)) {
        this.selfElementHeight = selfHeight;
        this.stickyElementInitialProperties = stickyElementInitialProperties;
      }
    }
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
}
