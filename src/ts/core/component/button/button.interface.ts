export interface IButtonInternalState {
}

export interface IButtonInternalProps {
  text: string;
  progress?: boolean;
  disabled?: boolean;
  error?: boolean;
  progressText?: string;
  errorText?: string;
  className?: string;
}
