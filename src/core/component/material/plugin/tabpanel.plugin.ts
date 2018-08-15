import { MDCTabBar } from '@material/tab-bar';

import { sequence } from '../../../util';
import { Checkbox } from '../../field';
import { MaterialPlugin } from './material.plugin';
import { TabPanel } from '../../tabpanel';
import { INativeMaterialTabPanelComponent } from '../material.interface';

export class TabPanelMaterialPlugin extends MaterialPlugin<TabPanel, INativeMaterialTabPanelComponent> {

  private static OFFSET_FACTOR = 2;

  /**
   * @stable [30.05.2018]
   * @param {Checkbox} tabPanel
   */
  constructor(tabPanel: TabPanel) {
    super(tabPanel, MDCTabBar);

    tabPanel.onBackward = sequence(tabPanel.onBackward, this.onBackward, this);
    tabPanel.onForward = sequence(tabPanel.onForward, this.onForward, this);
  }

  /**
   * @stable [15.08.2018]
   */
  private onBackward(): void {
    this.adapter.scrollTo(this.adapter.getScrollPosition() - this.offset);
  }

  /**
   * @stable [15.08.2018]
   */
  private onForward(): void {
    this.adapter.scrollTo(this.adapter.getScrollPosition() + this.offset);
  }

  /**
   * @stable [15.08.2018]
   * @returns {number}
   */
  private get offset(): number {
    return this.adapter.getOffsetWidth() / TabPanelMaterialPlugin.OFFSET_FACTOR;
  }
}
