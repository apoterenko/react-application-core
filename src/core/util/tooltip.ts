import tippy, { Props } from 'tippy.js';

/**
 * @stable [26.11.2020]
 */
const init = (el: Element, text: string, cfg?: Props): void => {
  tippy(el, {content: text, ...cfg});
}

/**
 * @stable [26.11.2020]
 */
export class TooltipUtils {
  public static readonly init = init;
}
