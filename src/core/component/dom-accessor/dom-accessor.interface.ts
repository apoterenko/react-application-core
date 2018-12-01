import { IXYEntity } from '../../entities-definitions.interface';

/**
 * @stable [01.12.2018]
 */
export interface IApplicationDomAccessor {
  findUniversalSelectedElement(parent: Element): Element;
  scrollTo(payload: IXYEntity | Element, parent?: Element): void;
  setScrollTop(el: Element, top: number): void;
  getContentHeight(source: Element): number;
  getScrollInfo(el: Element): IXYEntity;
}