import { IUniversalUIIconConfiguration } from '../../configurations-definitions.interface';

export interface IUIFactory {
  list?: string;
  switch?: string;
  switchInput?: string;
  switchInputWrapper?: string;
  switchInputWrapperBody?: string;
  snackbar?: string;
  snackbarText?: string;
  snackbarActionWrapper?: string;
  snackbarActionButton?: string;
  icons?: string;
  drawerOpen?: string;
  drawer?: string;
  toolbar?: string;
  listGroupSubHeader?: string;
  listDivider?: string;
  listItemMeta?: string;
  tabBarScrollerScrollArea?: string;
  tabBarScrollerScrollAreaScroll?: string;
  tabBarScrollerScrollContent?: string;
  tabRipple?: string;
  tabBar?: string;
  tab?: string;
  tabContent?: string;
  tabIcon?: string;
  tabIconText?: string;
  tabActive?: string;
  tabIndicator?: string;
  tabIndicatorActive?: string;
  tabIndicatorContent?: string;
  tabIndicatorContentUnderline?: string;
  tabBarScroller?: string;
  textFieldBox?: string;
  checkbox?: string;
  checkboxInput?: string;
  textFieldTextArea?: string;
  fieldValidationText?: string;
  card?: string;
  cardActions?: string;
  cardActionButtons?: string;
  cardActionIcons?: string;
  rippleSurface?: string;
  menuAnchor?: string;
  menuSurface?: string;
  menu?: string;
  fab?: string;
  dialog?: string;
  dialogSurface?: string;
  dialogContent?: string;
  dialogContainer?: string;
  dialogTitle?: string;
  dialogScrim?: string;
  dialogActions?: string;

  /**
   * @stable [18.05.2018]
   * @param {string | TUIIconConfiguration} config
   * @returns {JSX.Element}
   */
  makeIcon?<TUIIconConfiguration extends IUniversalUIIconConfiguration>(config: TUIIconConfiguration | string): JSX.Element;

  /**
   * @stable [18.05.2018]
   * @param {string | TUIIconConfiguration} config
   * @returns {JSX.Element}
   */
  makeListItemMetaIcon?<TUIIconConfiguration extends IUniversalUIIconConfiguration>(
    config: TUIIconConfiguration | string): JSX.Element;

  /**
   * @stable [18.05.2018]
   * @returns {JSX.Element}
   */
  makeCheckboxAttachment?(): JSX.Element;

  /**
   * @stable [30.05.2018]
   * @returns {JSX.Element}
   */
  makeSwitchAttachment?(): JSX.Element;
}
