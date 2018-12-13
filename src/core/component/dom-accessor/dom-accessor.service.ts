import { injectable } from 'inversify';
import * as R from 'ramda';

import {
  findUniversalSelectedElement,
  scrollIntoView,
  scrollTo,
  setScrollTop,
  getContentHeight,
  getScrollLeft,
  getScrollTop,
  toJqEl,
  getHeight,
} from '../../util';
import { IApplicationDomAccessor } from './dom-accessor.interface';
import { IXYEntity } from '../../entities-definitions.interface';
import { IJQueryElement } from '../../definitions.interface';

@injectable()
export class DomAccessor implements IApplicationDomAccessor {

  /**
   * @stable [13.12.2018]
   * @param {Element} source
   * @returns {number}
   */
  public getHeight(source: Element): number {
    return getHeight(source);
  }

  /**
   * @stable [13.12.2018]
   * @param {Element} source
   * @returns {IJQueryElement}
   */
  public toJqEl(source: Element): IJQueryElement {
    return toJqEl(source);
  }

  /**
   * @stable [01.12.2018]
   * @param {Element} el
   * @returns {IXYEntity}
   */
  public getScrollInfo(el: Element): IXYEntity {
    return {x: getScrollLeft(el), y: getScrollTop(el)};
  }

  /**
   * @stable [01.12.2018]
   * @param {Element} source
   * @returns {number}
   */
  public getContentHeight(source: Element): number {
    return getContentHeight(source);
  }

  /**
   * @stable [01.12.2018]
   * @param {Element} parent
   * @returns {Element}
   */
  public findUniversalSelectedElement(parent: Element): Element {
    return findUniversalSelectedElement(parent);
  }

  /**
   * @stable [01.12.2018]
   * @param {IXYEntity | Element} payload
   * @param {Element} parent
   */
  public scrollTo(payload: IXYEntity | Element, parent?: Element): void {
    if (R.isNil(payload)) {
      return;
    }
    const xyEntity = payload as IXYEntity;
    const el = payload as Element;
    if (el instanceof Element) {
      scrollIntoView(el, parent);
    } else if (!R.isNil(xyEntity.x) || !R.isNil(xyEntity.y)) {
      scrollTo(parent, xyEntity);
    }
  }

  /**
   * @stable [01.12.2018]
   * @param {Element} el
   * @param {number} top
   */
  public setScrollTop(el: Element, top: number): void {
    setScrollTop(el, top);
  }
}
