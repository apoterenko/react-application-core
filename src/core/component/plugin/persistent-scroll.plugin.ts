import * as R from 'ramda';

import { DI_TYPES, lazyInject } from '../../di';
import { IDomAccessor } from '../dom-accessor';
import { IUniversalPlugin } from '../../definition';
import { IUniversalScrollableComponent } from '../../entities-definitions.interface';

export class PersistentScrollPlugin implements IUniversalPlugin {
  @lazyInject(DI_TYPES.DomAccessor) private domAccessor: IDomAccessor;

  private top: number;
  private left: number;

  /**
   * @stable [13.12.2018]
   * @param {IUniversalScrollableComponent} component
   */
  constructor(private component: IUniversalScrollableComponent) {
  }

  /**
   * @stable [18.12.2018]
   */
  public componentDidMount() {
    this.scrollToUniversalSelectedElement();
  }

  /**
   * @stable [18.12.2018]
   */
  public componentDidUpdate() {
    if (this.top) {
      this.domAccessor.setScrollTop(this.component.getSelf(), this.top);
    }
    if (this.left) {
      this.domAccessor.setScrollLeft(this.component.getSelf(), this.left);
    }
  }

  /**
   * @stable [18.12.2018]
   */
  public getSnapshotBeforeUpdate(): void {
    this.top = this.domAccessor.getScrollTop(this.component.getSelf());
    this.left = this.domAccessor.getScrollLeft(this.component.getSelf());
    return null;
  }

  /**
   * @stable [18.12.2018]
   */
  private scrollToUniversalSelectedElement(): void {
    const self = this.component.getSelf();
    const selectedElement = this.domAccessor.findUniversalSelectedElement(self);
    if (!R.isNil(selectedElement)) {
      this.domAccessor.scrollTo(selectedElement, self);
    }
  }
}
