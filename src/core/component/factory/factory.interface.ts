import { BasicEventT } from '../../definition.interface';

export interface IIconConfig {
  type: string;
  disabled?: boolean;
  title?: string;
  classes?: string[];
  onClick?(event: BasicEventT): void;
}

export interface IUIFactory {
  makeIcon(config: IIconConfig): JSX.Element;
}
