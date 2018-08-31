import * as R from 'ramda';

import { ITabConfiguration, ITabPanelConfiguration } from '../../configurations-definitions.interface';
import { IActiveValueWrapper } from '../../definitions.interface';

/**
 * @stable [30.08.2018]
 * @param {IActiveValueWrapper} activeValueWrapper
 * @param {ITabConfiguration} tab
 * @returns {boolean}
 */
export const isTabActive = (activeValueWrapper: IActiveValueWrapper, tab: ITabConfiguration): boolean =>
  R.isNil(activeValueWrapper.activeValue) ? !!tab.active : activeValueWrapper.activeValue === tab.value;

/**
 * @stable [30.08.2018]
 * @param {IActiveValueWrapper} props
 * @param {ITabPanelConfiguration} tabPanelConfiguration
 * @returns {number}
 */
export const getTabActiveValue = (props: IActiveValueWrapper, tabPanelConfiguration: ITabPanelConfiguration): number => {
  const currentActiveValue = props.activeValue;
  if (!R.isNil(currentActiveValue)) {
    return currentActiveValue;
  }
  const tabs = tabPanelConfiguration.items;
  const activeTab = tabs.find((tab) => tab.active);
  if (R.isNil(activeTab)) {
    return tabs[0].value;
  }
  return activeTab.value;
};
