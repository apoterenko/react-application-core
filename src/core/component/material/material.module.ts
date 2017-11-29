import { MDCTextField } from '@material/textfield';

import { appContainer, DI_TYPES } from '../../di';
import { Checkbox, DateField, Select, TextField, TimeField } from '../../component/field';
import { ComponentPluginFactoryT } from '../../component/plugin';
import { IBaseComponentCtor } from '../../component/base';
import {
  FieldMaterialPlugin,
  CheckboxMaterialPlugin,
} from './plugin';
import { INativeMaterialComponent } from 'core/component/material';

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
uiPlugins.set(Checkbox, (component: Checkbox) => new CheckboxMaterialPlugin(component));

appContainer.bind<Map<IBaseComponentCtor, ComponentPluginFactoryT>>(DI_TYPES.UIPlugins)
    .toConstantValue(uiPlugins);
