import * as React from 'react';

import { IUniversalUIIconConfiguration } from '../../configurations-definitions.interface';

export interface IUIFactory {
  list?: string;
  switch?: string;
  switchInput?: string;
  switchInputWrapper?: string;
  snackbar?: string;
  snackbarText?: string;
  snackbarActionWrapper?: string;
  snackbarActionButton?: string;
  icons?: string;
  toolbar?: string;
  listDivider?: string;
  listItemMeta?: string;
  tabBarScrollerScrollArea?: string;
  tabBarScrollerScrollAreaScroll?: string;
  tabBarScrollerScrollContent?: string;
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
  checkbox?: string;
  checkboxInput?: string;
  card?: string;
  cardActions?: string;
  cardActionButtons?: string;
  cardActionIcons?: string;
  rippleSurface?: string;
  menuAnchor?: string;
  menuSurface?: string;
  menu?: string;
  dialog?: string;
  dialogContainer?: string;
  dialogScrim?: string;

  /**
   * @stable [15.12.2018]
   * @param {IUniversalUIIconConfiguration | string} config
   * @returns {JSX.Element}
   */
  makeIcon?(config: IUniversalUIIconConfiguration | string): JSX.Element;

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

  /**
   * @stable [30.09.2019]
   * @param {Error} e
   * @returns {Element}
   */
  makeWindowErrorElement?(e: Error): Element;

  /**
   * @stable [07.10.2019]
   * @param {Error} e
   * @returns {React.ReactNode}
   */
  makeReactErrorElement?(e: Error): React.ReactNode;
}
