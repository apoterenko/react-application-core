import { IEffectsAction } from 'redux-effects-promise';
import * as R from 'ramda';

import { ITabConfiguration, ITabPanelConfiguration } from '../../configurations-definitions.interface';
import { IActiveValueWrapper, IPayloadWrapper } from '../../definitions.interface';

/**
 * @stable [31.08.2018]
 * @param {IEffectsAction} action
 * @param {string} alias
 * @param {ITabPanelConfiguration} tabPanelConfiguration
 * @returns {boolean}
 */
export const isTabActivated = (action: IEffectsAction,
                               alias: string,
                               tabPanelConfiguration: ITabPanelConfiguration): boolean => {
  const payloadWrapper: IPayloadWrapper<number> = action.data;
  return payloadWrapper.payload === findTabValueByAlias(alias, tabPanelConfiguration);
};

/**
 * @stable [31.08.2018]
 * @param {string} alias
 * @param {ITabPanelConfiguration} tabPanelConfiguration
 * @returns {ITabConfiguration}
 */
export const findTabByAlias = (alias: string, tabPanelConfiguration: ITabPanelConfiguration): ITabConfiguration =>
  tabPanelConfiguration.items.find((tab) => tab.alias === alias);

export const findTabValueByAlias = (alias: string, tabPanelConfiguration: ITabPanelConfiguration): ITabConfiguration =>
  findTabByAlias(alias, tabPanelConfiguration).value;

/**
 * @stable [31.08.2018]
 * @param {IActiveValueWrapper} activeValueWrapper
 * @param {ITabPanelConfiguration} tabPanelConfiguration
 * @param {string} alias
 * @returns {boolean}
 */
export const isTabActiveByAlias = (activeValueWrapper: IActiveValueWrapper,
                                   tabPanelConfiguration: ITabPanelConfiguration,
                                   alias: string): boolean =>
  isTabActive(activeValueWrapper, findTabByAlias(alias, tabPanelConfiguration));

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
