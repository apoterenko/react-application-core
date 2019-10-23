import { MDCRipple } from '@material/ripple';

import {
  appContainer,
  bindToConstantValue,
  DI_TYPES,
} from '../../di';
import { addClassNameToBody, orNull, ifNotFalseThanValue } from '../../util';
import { IUIFactory } from '../factory';
import {
  DialogMaterialPlugin,
  MaterialPlugin,
  MenuMaterialPlugin,
  TabPanelMaterialPlugin,
  SnackbarMaterialPlugin,
} from './plugin';
import { UIMaterialFactory } from './factory';
import { Menu } from '../menu';
import { TabPanel } from '../tabpanel';
import { Card } from '../card';
import { KeyboardKey } from '../keyboard';
import { Dialog } from '../dialog';
import { FormDialog } from '../form';
import { Snackbar } from '../snackbar';
import { UniversalPluginFactoryT, IComponentCtor } from '../../definition';

const uiPlugins = new Map<IComponentCtor, UniversalPluginFactoryT>();
bindToConstantValue(DI_TYPES.UIPlugins, uiPlugins);

/**
 * @stable [15.08.2018]
 */
uiPlugins.set(TabPanel, (component: TabPanel) => new TabPanelMaterialPlugin(component));

/**
 * @stable [15.08.2018]
 */
uiPlugins.set(Snackbar, (component: Snackbar) => new SnackbarMaterialPlugin(component));

/**
 * @stable [18.05.2018]
 */
uiPlugins.set(Dialog, (component: Dialog) => new DialogMaterialPlugin<Dialog>(component));

/**
 * @stable [29.05.2018]
 */
uiPlugins.set(FormDialog, (component: FormDialog) => new DialogMaterialPlugin<Dialog>(component));

/**
 * @stable [18.06.2019]
 */
uiPlugins.set(Menu, (component: Menu) =>
  orNull(!component.centeredMenu, () => new MenuMaterialPlugin<Menu>(component)));

/**
 * @stable [30.08.2019]
 */
uiPlugins.set(Card, (component: Card) =>
  ifNotFalseThanValue(component.props.rippled, () => new MaterialPlugin<Card>(component, MDCRipple)));

/**
 * @stable [08.05.2018]
 */
uiPlugins.set(KeyboardKey, (component: KeyboardKey) => new MaterialPlugin<KeyboardKey>(component, MDCRipple));

/**
 * @stable [27.05.2018]
 */
appContainer.bind<IUIFactory>(DI_TYPES.UIFactory).to(UIMaterialFactory).inSingletonScope();

// TODO
import '../icon/icon-factory/default/ui-default-icon-factory.module';

/**
 * @stable [27.05.2018]
 */
addClassNameToBody('mdc-typography');
