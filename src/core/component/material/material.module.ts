import { MDCRipple } from '@material/ripple';
import { MDCTabBarScroller } from '@material/tabs';

import { appContainer, DI_TYPES } from '../../di';
import { addClassNameToBody } from '../../util';
import {
  IComponentClassEntity,
  UniversalComponentPluginFactoryT,
} from '../../entities-definitions.interface';
import {
  Checkbox,
} from '../field';
import { IUIFactory } from '../factory';
import {
  CheckboxMaterialPlugin,
  DialogMaterialPlugin,
  ListItemMaterialPlugin,
  MaterialPlugin,
  MenuMaterialPlugin,
} from './plugin';
import { UIMaterialFactory } from './factory';
import { Menu } from '../menu';
import { ListItem } from '../list';
import { TabPanel } from '../tabpanel';
import { Card } from '../card';
import { KeyboardKey } from '../keyboard';
import { Dialog } from '../dialog';
import { FormDialog } from '../form';

const uiPlugins = new Map<IComponentClassEntity, UniversalComponentPluginFactoryT>();

/**
 * @stable [30.05.2018]
 */
uiPlugins.set(Checkbox, (component: Checkbox) => new CheckboxMaterialPlugin(component));

/**
 * @stable [17.05.2018]
 */
uiPlugins.set(TabPanel, (component: TabPanel) => new MaterialPlugin<TabPanel>(component, MDCTabBarScroller));

/**
 * @stable [18.05.2018]
 */
uiPlugins.set(Dialog, (component: Dialog) => new DialogMaterialPlugin<Dialog>(component));

/**
 * @stable [29.05.2018]
 */
uiPlugins.set(FormDialog, (component: FormDialog) => new DialogMaterialPlugin<Dialog>(component));

/* @stable - 31.03.2018 */
uiPlugins.set(Menu, (component: Menu) => new MenuMaterialPlugin<Menu>(component));

/* @stable - 31.03.2018 */
uiPlugins.set(ListItem, (component: ListItem) => new ListItemMaterialPlugin<ListItem>(component, MDCRipple));

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
