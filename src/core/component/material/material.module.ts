import { MDCRipple } from '@material/ripple';
import { MDCCheckbox } from '@material/checkbox';

import { appContainer, DI_TYPES } from '../../di';
import { addClassNameToBody, orNull, ifNotFalseThanValue } from '../../util';
import {
  IReactComponentClassEntity,
  UniversalComponentPluginFactoryT,
} from '../../entities-definitions.interface';
import { Checkbox } from '../field';
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

const uiPlugins = new Map<IReactComponentClassEntity, UniversalComponentPluginFactoryT>();

/**
 * @stable [17.08.2018]
 */
uiPlugins.set(Checkbox, (component: Checkbox) => new MaterialPlugin(component, MDCCheckbox));

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

appContainer.bind<Map<IReactComponentClassEntity, UniversalComponentPluginFactoryT>>(DI_TYPES.UIPlugins)
    .toConstantValue(uiPlugins);

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
