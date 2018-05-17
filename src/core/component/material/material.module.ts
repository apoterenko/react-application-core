import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { MDCTabBarScroller } from '@material/tabs';

import { appContainer, DI_TYPES } from '../../di';
import {
  IComponentClassEntity,
  UniversalComponentPluginFactoryT,
} from '../../entities-definitions.interface';
import {
  Checkbox,
  ChipsField,
  DateField,
  Select,
  TextField,
  TimeField,
} from '../field';
import { IUIFactory } from '../factory';
import {
  CheckboxMaterialPlugin,
  DialogMaterialPlugin,
  FieldMaterialPlugin,
  ListItemMaterialPlugin,
  MaterialPlugin,
  MenuMaterialPlugin,
} from './plugin';
import { INativeMaterialComponent } from '../material';
import { UIMaterialFactory } from './factory';
import { Menu } from '../menu';
import { ListItem } from '../list';
import { TabPanel } from '../tabpanel';
import { Card } from '../card';
import { KeyboardKey } from '../keyboard';
import { Dialog } from '../dialog';

const uiPlugins = new Map<IComponentClassEntity, UniversalComponentPluginFactoryT>();
uiPlugins.set(
  TextField,
  (component: TextField) =>
    new FieldMaterialPlugin<TextField, INativeMaterialComponent>(component, MDCTextField)
);
uiPlugins.set(
  Select,
  (component: Select) =>
    new FieldMaterialPlugin<Select, INativeMaterialComponent>(component, MDCTextField)
);
uiPlugins.set(
  TimeField,
  (component: TimeField) =>
    new FieldMaterialPlugin<TimeField, INativeMaterialComponent>(component, MDCTextField)
);
uiPlugins.set(
  DateField,
  (component: DateField) =>
    new FieldMaterialPlugin<DateField, INativeMaterialComponent>(component, MDCTextField)
);
uiPlugins.set(
  ChipsField,
  (component: ChipsField) =>
    new FieldMaterialPlugin<ChipsField, INativeMaterialComponent>(component, MDCTextField)
);
uiPlugins.set(Checkbox, (component: Checkbox) => new CheckboxMaterialPlugin(component));

/**
 * @stable [17.05.2018]
 */
uiPlugins.set(TabPanel, (component: TabPanel) => new MaterialPlugin<TabPanel>(component, MDCTabBarScroller));

/**
 * @stable [17.05.2018]
 */
uiPlugins.set(Dialog, (component: Dialog) => new DialogMaterialPlugin<Dialog>(component));

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

appContainer.bind<IUIFactory>(DI_TYPES.UIFactory).to(UIMaterialFactory).inSingletonScope();
