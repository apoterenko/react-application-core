import '../../converter/converter.module';

import { clone } from '../../util';
import { staticInjector, appContainer, DI_TYPES } from '../../di';
import { DateTimeFieldHelper } from './date-time-field.helper';
import { FROM_DATE_FIELD_NAME, FROM_TIME_FIELD_NAME } from '../../definition.interface';
import { DEFAULT_APPLICATION_SETTINGS } from '../../settings';

const testSettings = clone(DEFAULT_APPLICATION_SETTINGS);
testSettings.dateTime.timeZone = 'America/Los_Angeles';
appContainer.bind(DI_TYPES.Settings).toConstantValue(testSettings);

const dateTimeFieldHelper = staticInjector(DateTimeFieldHelper);

describe('dateTimeFieldHelper', () => {

  describe('composeDateTimeSinceField', () => {
    it('test1', () => {
      const value = dateTimeFieldHelper.composeDateTimeSinceField({
        changes: {
          [FROM_DATE_FIELD_NAME]: '2017-01-01',
          [FROM_TIME_FIELD_NAME]: '20:00:00',
        },
      });
      expect(value).toEqual({
        [FROM_DATE_FIELD_NAME]: '2017-01-01T20:00:00-08:00',
      });
    });

    /*it('test2', function () {
      var value = dateTimeFieldHelper.composeDateTimeSinceField({
        changes: {
          [FROM_DATE_FIELD_NAME]: '2017-01-01',
        },
      });
      expect(value).toEqual({
        [FROM_DATE_FIELD_NAME]: '2017-01-01T04:00:00+07:00',
      });
    });*/
  });
});
