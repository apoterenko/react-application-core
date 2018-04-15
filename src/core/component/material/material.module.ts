import { MDCTextField } from '@material/textfield';
import { MDCMenu, MDCMenuFoundation } from '@material/menu';
import { MDCRipple } from '@material/ripple';

import { appContainer, DI_TYPES } from '../../di';
import {
  Checkbox,
  ChipsField,
  DateField,
  Select,
  TextField,
  TimeField,
} from '../field';
import { ComponentPluginFactoryT } from '../plugin';
import { IUIFactory } from '../factory';
import {
  FieldMaterialPlugin,
  CheckboxMaterialPlugin,
  MenuMaterialPlugin,
  ListItemMaterialPlugin,
  TabPanelMaterialPlugin,
} from './plugin';
import { INativeMaterialComponent } from '../material';
import { UIMaterialFactory } from './factory';
import { Menu } from '../menu';
import { ListItem } from '../list';
import { TabPanel } from '../tabpanel';
import { IDefaultComponentClassEntity } from '../../entities-definitions.interface';

const uiPlugins = new Map<IDefaultComponentClassEntity, ComponentPluginFactoryT>();
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

/* @stable - 06.04.2018 */
uiPlugins.set(TabPanel, (component: TabPanel) => new TabPanelMaterialPlugin(component));

/* @stable - 31.03.2018 */
uiPlugins.set(Menu, (component: Menu) => new MenuMaterialPlugin<Menu>(component, MDCMenu));

/* @stable - 31.03.2018 */
uiPlugins.set(ListItem, (component: ListItem) => new ListItemMaterialPlugin<ListItem>(component, MDCRipple));

appContainer.bind<Map<IDefaultComponentClassEntity, ComponentPluginFactoryT>>(DI_TYPES.UIPlugins)
    .toConstantValue(uiPlugins);

appContainer.bind<IUIFactory>(DI_TYPES.UIFactory).to(UIMaterialFactory).inSingletonScope();
