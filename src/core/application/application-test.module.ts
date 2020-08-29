import '../converter/date/date-converter.module';
import '../converter/number/number-converter.module';
import '../env/env.module';
import '../settings/settings.module';

import { CloneUtils } from '../util';
import { DEFAULT_APPLICATION_SETTINGS } from '../settings';
import { appContainer, DI_TYPES } from '../di';

const testSettings = CloneUtils.clone(DEFAULT_APPLICATION_SETTINGS);
testSettings.dateTime.timeZone = 'America/Los_Angeles';
testSettings.dateTime.currentDate = new Date('Aug 30 2036 00:00:00 GMT-0800');
appContainer.rebind(DI_TYPES.Settings).toConstantValue(testSettings);
