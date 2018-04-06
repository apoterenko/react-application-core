import { MDCTabBarScroller } from '@material/tabs';

import { MaterialPlugin } from './material.plugin';
import { TabPanel } from '../../tabpanel';
import { INativeMaterialComponent } from '../material.interface';

export class TabPanelMaterialPlugin extends MaterialPlugin<TabPanel, INativeMaterialComponent> {

  /**
   * @stable - 07.04.2018
   * @param {TabPanel} tabPanel
   */
  constructor(tabPanel: TabPanel) {
    super(tabPanel, MDCTabBarScroller);
  }
}
