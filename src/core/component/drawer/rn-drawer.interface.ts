import { Drawer } from 'react-native-drawer';

import { IOpenWrapper, ICloseWrapper } from '../../definitions.interface';
import { IRnDrawerConfiguration } from '../../configurations-definitions.interface';

/* @stable [27.04.2018] */
export interface IRnDrawer extends IOpenWrapper<() => void>,
                                   ICloseWrapper<() => void> {
}

/* @stable [27.04.2018] */
export interface IRnNativeRootDrawer extends IOpenWrapper<() => void>,
                                             ICloseWrapper<() => void> {
}

/* @stable [27.04.2018] */
export interface IRnNativeDrawer extends Drawer {
  _root: IRnNativeRootDrawer;
}

/* @stable [27.04.2018] */
export interface IRnDrawerProps extends IRnDrawerConfiguration {
}
