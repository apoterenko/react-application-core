import { MDCRipple } from '@material/ripple';

import {
  bindToConstantValue,
  DI_TYPES,
} from '../../di';
import { addClassNameToBody, ifNotFalseThanValue } from '../../util';
import {
  MaterialPlugin,
  SnackbarMaterialPlugin,
} from './plugin';
import { Card } from '../card';
import { Snackbar } from '../snackbar';
import {
  GenericPluginFactoryT,
  IComponentCtor,
} from '../../definition';

// TODO UI plugins should contain an array (material.module.ts, perfect-scroll.module.ts, etc)
const uiPlugins = new Map<IComponentCtor, GenericPluginFactoryT>();
bindToConstantValue(DI_TYPES.UiPlugins, uiPlugins);

/**
 * @stable [15.08.2018]
 */
uiPlugins.set(Snackbar, (component: Snackbar) => new SnackbarMaterialPlugin(component));

/**
 * @stable [30.08.2019]
 */
uiPlugins.set(Card, (component: Card) =>
  ifNotFalseThanValue(component.props.rippled, () => new MaterialPlugin<Card>(component, MDCRipple)));

// TODO
import '../icon/icon-factory/default/ui-default-icon-factory.module';

/**
 * @stable [27.05.2018]
 */
addClassNameToBody('mdc-typography');
