import { MDCRipple } from '@material/ripple';
import { MDCCheckbox } from '@material/checkbox';
import { MDCSwitch } from '@material/switch';

import { appContainer, DI_TYPES } from '../../di';
import { addClassNameToBody } from '../../util';
import {
  IComponentClassEntity,
  UniversalComponentPluginFactoryT,
} from '../../entities-definitions.interface';
import { Checkbox, Switch } from '../field';
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
import { Dialog, ArbitraryFormDialog } from '../dialog';
import { FormDialog } from '../form';
import { Snackbar } from '../snackbar';

const uiPlugins = new Map<IComponentClassEntity, UniversalComponentPluginFactoryT>();

/**
 * @stable [17.08.2018]
 */
uiPlugins.set(Checkbox, (component: Checkbox) => new MaterialPlugin(component, MDCCheckbox));

/**
 * @stable [31.08.2018]
 */
uiPlugins.set(Switch, (component: Switch) => new MaterialPlugin(component, MDCSwitch));

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
 * @stable [03.08.2018]
 */
uiPlugins.set(ArbitraryFormDialog, (component: ArbitraryFormDialog) => new DialogMaterialPlugin<ArbitraryFormDialog>(component));

/**
 * @stable [29.05.2018]
 */
uiPlugins.set(FormDialog, (component: FormDialog) => new DialogMaterialPlugin<Dialog>(component));

/* @stable - 31.03.2018 */
uiPlugins.set(Menu, (component: Menu) => new MenuMaterialPlugin<Menu>(component));

/**
 * @stable [05.05.2018]
 */
uiPlugins.set(Card, (component: Card) => new MaterialPlugin<Card>(component, MDCRipple));

/**
 * @stable [08.05.2018]
 */
uiPlugins.set(KeyboardKey, (component: KeyboardKey) => new MaterialPlugin<KeyboardKey>(component, MDCRipple));

appContainer.bind<Map<IComponentClassEntity, UniversalComponentPluginFactoryT>>(DI_TYPES.UIPlugins)
    .toConstantValue(uiPlugins);

/**
 * @stable [27.05.2018]
 */
appContainer.bind<IUIFactory>(DI_TYPES.UIFactory).to(UIMaterialFactory).inSingletonScope();

/**
 * @stable [27.05.2018]
 */
addClassNameToBody('mdc-typography');
