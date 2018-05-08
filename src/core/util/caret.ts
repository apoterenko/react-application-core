import * as $ from 'jquery';
Reflect.set(window, '$', $);
import 'jquery-caret-plugin/dist/jquery.caret';

export interface IJqField extends JQuery<HTMLElement> {
  caret(position?: number): number;
}

export const caret = (field: IJqField, position?: number): number => field.caret(position);
