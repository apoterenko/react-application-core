import {
  bindToConstantValue,
  DI_TYPES,
} from '../../di';
import {
  SnackbarMaterialPlugin,
} from './plugin';
import { Snackbar } from '../snackbar';
import {
  GenericPluginFactoryT,
  GenericPluginsMapT,
  IGenericComponentCtor,
} from '../../definition';

const uiPlugins: GenericPluginsMapT = new Map<IGenericComponentCtor, GenericPluginFactoryT[]>();
bindToConstantValue(DI_TYPES.UiPlugins, uiPlugins);

/**
 * @stable [15.08.2018]
 */
uiPlugins.set(Snackbar, [(component: Snackbar) => new SnackbarMaterialPlugin(component)]);
