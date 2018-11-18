import { IVueComponent } from '../../vue-entities-definitions.interface';

/**
 * @stable [17.11.2018]
 */
export interface IVueMenuContextEntity {
  width?: number;
}

/**
 * @stable [17.11.2018]
 */
export interface IVueMenu extends IVueComponent {
  show(context?: IVueMenuContextEntity): void;
}
