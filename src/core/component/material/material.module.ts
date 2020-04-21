import {
  bindToConstantValue,
  DI_TYPES,
} from '../../di';
import {
  addClassNameToBody,
} from '../../util';
import {
  SnackbarMaterialPlugin,
} from './plugin';
import { Snackbar } from '../snackbar';
import {
  GenericPluginFactoryT,
  IGenericComponentCtor,
} from '../../definition';

// TODO UI plugins should contain an array (material.module.ts, perfect-scroll.module.ts, etc)
const uiPlugins = new Map<IGenericComponentCtor, GenericPluginFactoryT>();
bindToConstantValue(DI_TYPES.UiPlugins, uiPlugins);

/**
 * @stable [15.08.2018]
 */
uiPlugins.set(Snackbar, (component: Snackbar) => new SnackbarMaterialPlugin(component));

/**
 * @stable [27.05.2018]
 */
addClassNameToBody('mdc-typography');
