import * as React from 'react';
import { MDCPersistentDrawer } from '@material/drawer';

import { IDrawerInternalProps } from './drawer.interface';
import { Drawer } from './drawer.component';

export class PersistentDrawer extends Drawer<PersistentDrawer> {

  constructor(props: IDrawerInternalProps) {
    super(props, MDCPersistentDrawer);
  }
}

// TODO https://github.com/material-components/material-components-web/issues/1004
const originalFn = MDCPersistentDrawer.prototype.getDefaultFoundation;
MDCPersistentDrawer.prototype.getDefaultFoundation = function() {
  const foundation = originalFn.apply(this, arguments);
  foundation.drawerClickHandler_ = (e) => {
    if (e.target.tagName !== 'A') {
      e.stopPropagation();
    }
  };
  return foundation;
};
