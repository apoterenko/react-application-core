import { IBaseComponentInternalProps } from '../../component/base';

export interface IButtonInternalState {
}

export interface IButtonInternalProps extends IBaseComponentInternalProps {
  type?: string;
  disabled?: boolean;
  error?: boolean;
  errorText?: string;
}
