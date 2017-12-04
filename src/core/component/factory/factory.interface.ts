import { BasicEventT } from '../../definition.interface';

export interface IIconConfig {
  type: string;
  disabled?: boolean;
  title?: string;
  classes?: string[];
  onClick?(event: BasicEventT): void;
}

export interface IUIFactory {
  listGroupSubHeader: string;
  listDivider: string;
  listItem: string;
  list: string;
  makeIcon(config: IIconConfig|string): JSX.Element;
}
