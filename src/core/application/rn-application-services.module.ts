import '../converter/converter.module';
import '../router/rn-router.module';
import '../transport/transport.module';
import '../settings/settings.module';
import '../translation/translation.module';

// The default UI-plugins module
import { appContainer, DI_TYPES } from '../di';
appContainer.bind(DI_TYPES.UIPlugins).toConstantValue(new Map());
