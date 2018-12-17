import { IXYEntity } from '../../entities-definitions.interface';
import { IJQueryElement } from '../../definitions.interface';

/**
 * @stable [01.12.2018]
 */
export interface IApplicationDomAccessor {
  findUniversalSelectedElement(parent: Element): Element;
  scrollTo(payload: IXYEntity | Element, parent?: Element): void;
  setScrollTop(el: Element, top: number): void;
  setScrollLeft(el: Element, left: number): void;
  getScrollTop(el: Element): number;
  getScrollLeft(el: Element): number;
  getContentHeight(source: Element): number;
  getScrollInfo(el: Element): IXYEntity;
  toJqEl(source: Element): IJQueryElement;
  getHeight(source: Element): number;
}
