export enum LayoutEnum {
  VERTICAL,
  HORIZONTAL,
}

export enum LayoutFactorEnum {
  FACTOR_1,
  FACTOR_2,
  FACTOR_4,
  FACTOR_8,
}

export type LayoutElementT = JSX.Element|ILayoutConfig;

export interface ILayoutConfig {
  layout: LayoutEnum;
  factor?: LayoutFactorEnum;
  children: LayoutElementT[];
}
