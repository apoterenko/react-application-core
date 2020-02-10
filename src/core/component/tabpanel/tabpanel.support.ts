import * as R from 'ramda';

import { IActiveValueWrapper } from '../../definitions.interface';
import {
  IGenericTabEntity,
  ITabPanelProps,
} from '../../definition';

/**
 * @stable [30.08.2018]
 * @param {IActiveValueWrapper} activeValueWrapper
 * @param {IGenericTabEntity} tab
 * @returns {boolean}
 */
export const isTabActive = (activeValueWrapper: IActiveValueWrapper, tab: IGenericTabEntity): boolean =>
  R.isNil(activeValueWrapper.activeValue) ? !!tab.active : activeValueWrapper.activeValue === tab.value;

/**
 * @stable [30.08.2018]
 * @param {IActiveValueWrapper} props
 * @param {ITabPanelConfiguration} tabPanelConfiguration
 * @returns {number}
 */
export const getTabActiveValue = (props: ITabPanelProps, tabPanelConfiguration: ITabPanelProps): number => {
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
