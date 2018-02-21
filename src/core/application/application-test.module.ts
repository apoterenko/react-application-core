import '../converter/converter-test.module';
import '../settings/settings.module';

import { clone } from '../util';
import { DEFAULT_APPLICATION_SETTINGS } from '../settings';
import { appContainer, DI_TYPES } from '../di';

const testSettings = clone(DEFAULT_APPLICATION_SETTINGS);
testSettings.dateTime.timeZone = 'America/Los_Angeles';
testSettings.dateTime.currentDate = new Date('08/30/2036');
appContainer.rebind(DI_TYPES.Settings).toConstantValue(testSettings);
