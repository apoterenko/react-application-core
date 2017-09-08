import { IBaseComponentInternalProps } from 'core/component/base';

export interface IButtonInternalState {
}

export interface IButtonInternalProps extends IBaseComponentInternalProps {
  type?: string;
  progress?: boolean;
  disabled?: boolean;
  error?: boolean;
  progressText?: string;
  errorText?: string;
}
