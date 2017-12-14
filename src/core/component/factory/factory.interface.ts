import { IButtonInternalProps } from '../../component/button';

export interface IUIFactory {
  persistentDrawerToolbarSpacer: string;
  toolbarIcon: string;
  toolbar: string;
  toolbarRow: string;
  toolbarTitle: string;
  toolbarMenuIcon: string;
  listGroupSubHeader: string;
  listDivider: string;
  listItem: string;
  list: string;
  button: string;
  formField: string;
  textField: string;
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
