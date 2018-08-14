import * as React from 'react';

import { BaseContainer } from '../../base';
import { TabPanel } from '../tabpanel.component';
import { ITabConfiguration } from '../../../configurations-definitions.interface';
import { IFormTabPanelContainerProps } from './form-tabpanel.interface';
import { FORM_INDEX_ACTION_TYPE, getFormTabActiveValue } from '../../form';
import { orNull } from '../../../util';
import { IPayloadWrapper } from '../../../definitions.interface';

export class FormTabPanelContainer extends BaseContainer<IFormTabPanelContainerProps> {

  /**
   * @stable [14.08.2018]
   * @param {IFormTabPanelContainerProps} props
   */
  constructor(props: IFormTabPanelContainerProps) {
    super(props);
    this.onTabClick = this.onTabClick.bind(this);
  }

  /**
   * @stable [14.08.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    const tabItems = props.items;
    return (
      orNull<JSX.Element>(
        tabItems.length > 1,
        () => (
          <TabPanel items={tabItems}
                    activeValue={getFormTabActiveValue(props, tabItems)}
                    onClick={this.onTabClick}/>
        )
      )
    );
  }

  /**
   * @stable [14.08.2018]
   * @param {ITabConfiguration} tab
   */
  private onTabClick(tab: ITabConfiguration): void {
    const payloadWrapper: IPayloadWrapper<number> = {payload: tab.value};
    this.dispatch(FORM_INDEX_ACTION_TYPE, payloadWrapper);
  }
}
