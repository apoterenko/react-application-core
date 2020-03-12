import { bindInSingleton } from '../di';
import { UniversalApplicationEffects } from './universal-application.effects';

import '../auth/auth.module';
import '../component/connector/universal-connector.module';
import '../converter/converter.module';
import '../env/env.module';
import '../promise/promise.module';
import '../settings/settings.module';
import '../store/store.module';
import '../translation/translation.module';
import '../transport/transport.module';
import '../version/version-processor.module';

bindInSingleton(UniversalApplicationEffects);
