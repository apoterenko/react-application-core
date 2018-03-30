import { MDCTextField } from '@material/textfield';
import { MDCMenu, MDCMenuFoundation } from '@material/menu';

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
import { IBaseComponentCtor } from '../base';
import { IUIFactory } from '../factory';
import {
  FieldMaterialPlugin,
  CheckboxMaterialPlugin,
  MenuMaterialPlugin,
} from './plugin';
import { INativeMaterialComponent } from '../material';
import { UIMaterialFactory } from './factory';
import { Menu, INativeMaterialMenuComponent } from '../menu';

const uiPlugins = new Map<IBaseComponentCtor, ComponentPluginFactoryT>();
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
uiPlugins.set(
  Menu,
  (component: Menu) =>
    new MenuMaterialPlugin<Menu, INativeMaterialMenuComponent>(component, MDCMenu)
);

appContainer.bind<Map<IBaseComponentCtor, ComponentPluginFactoryT>>(DI_TYPES.UIPlugins)
    .toConstantValue(uiPlugins);

appContainer.bind<IUIFactory>(DI_TYPES.UIFactory).to(UIMaterialFactory).inSingletonScope();
