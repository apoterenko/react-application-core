import { IButtonInternalProps } from '../../component/button';

export type UIIconConfigT = IButtonInternalProps | string;

export interface IUIFactory {
  persistentDrawerToolbarSpacer?: string;
  toolbarIcon?: string;
  toolbar?: string;
  toolbarSection?: string;
  toolbarRow?: string;
  toolbarTitle?: string;
  toolbarMenuIcon?: string;
  listGroupSubHeader?: string;
  listDivider?: string;
  listItem?: string;
  listItemGraphic?: string;
  listItemMeta?: string;
  listItemText?: string;
  listItemSecondaryText?: string;
  list?: string;
  listTwoLine?: string;
  listAvatar?: string;
  listNonInteractive?: string;
  button?: string;
  formField?: string;
  textField?: string;
  textFieldBox?: string;
  checkbox?: string;
  textFieldInput?: string;
  textFieldTextArea?: string;
  textFieldFocused?: string;
  textFieldInvalid?: string;
  textFieldUpgraded?: string;
  textFieldHelpText?: string;
  textFieldValidationText?: string;
  textFieldLabel?: string;
  textFieldFocusedLabel?: string;
  checkboxInput?: string;
  cardActions?: string;
  cardPrimary?: string;
  rippleSurface?: string;
  menuAnchor?: string;
  simpleMenu?: string;
  simpleMenuItems?: string;

  makeIcon?(config: UIIconConfigT): JSX.Element;
  makeListItemMetaIcon?(config: UIIconConfigT): JSX.Element;
  makeCheckboxAttachment?(): JSX.Element;
}
