import * as Mustache from 'mustache';

import { IKeyValue } from '../definitions.interface';

/**
 * @stable [29.05.2021]
 * @param tpl
 * @param params
 */
const render = <TParams = IKeyValue>(tpl: string, params: TParams): string =>
  Mustache.render(tpl, params);

/**
 * @stable [29.05.2021]
 */
export class TemplateUtils {
  public static readonly render = render;
}
