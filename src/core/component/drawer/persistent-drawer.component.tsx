import * as React from 'react';
import { MDCPersistentDrawer } from '@material/drawer';

import { IDrawerInternalProps } from './drawer.interface';
import { Drawer } from './drawer.component';

export class PersistentDrawer extends Drawer<PersistentDrawer> {

  constructor(props: IDrawerInternalProps) {
    super(props, MDCPersistentDrawer);
  }
}
