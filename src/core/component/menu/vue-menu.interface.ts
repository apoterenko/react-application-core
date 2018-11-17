/**
 * @stable [17.11.2018]
 */
export interface IVueMenuContextEntity {
  width?: number;
}

/**
 * @stable [17.11.2018]
 */
export interface IVueMenu {
  show(context?: IVueMenuContextEntity): void;
}
