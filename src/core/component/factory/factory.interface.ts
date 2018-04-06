import { IButtonInternalProps } from '../button';

export type UIIconConfigT = IButtonInternalProps | string;

export interface IUIFactory {
  persistentDrawerToolbarSpacer?: string;
  toolbar?: string;
  toolbarSection?: string;
  toolbarSectionAlignEnd?: string;
  toolbarSectionAlignStart?: string;
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
  tabBarScroller?: string;
  tabBarScrollerIndicator?: string;
  tabBarScrollerIndicatorBack?: string;
  tabBarScrollerIndicatorForward?: string;
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
  rippleSurface?: string;
  menuAnchor?: string;
  menu?: string;
  menuItems?: string;
  fab?: string;

  makeIcon?(config: UIIconConfigT): JSX.Element;
  makeListItemMetaIcon?(config: UIIconConfigT): JSX.Element;
  makeCheckboxAttachment?(): JSX.Element;
}
