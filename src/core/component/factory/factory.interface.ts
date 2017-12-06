import { IButtonInternalProps } from '../../component/button';

export interface IUIFactory {
  toolbarIcon: string;
  toolbar: string;
  listGroupSubHeader: string;
  listDivider: string;
  listItem: string;
  list: string;
  button: string;
  formField: string;
  checkbox: string;
  textFieldInput: string;
  textFieldFocused: string;
  textFieldHelpText: string;
  textFieldValidationText: string;
  textFieldLabel: string;
  textFieldFocusedLabel: string;
  checkboxInput: string;
  makeIcon(config: IButtonInternalProps|string): JSX.Element;
  makeCheckboxAttachment(): JSX.Element;
}
