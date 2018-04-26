import './universal.module';
import '../router/rn-router.module';
import '../storage/rn-storage.module';

// The default UI-plugins module
import { appContainer, DI_TYPES } from '../di';
appContainer.bind(DI_TYPES.UIPlugins).toConstantValue(new Map());
