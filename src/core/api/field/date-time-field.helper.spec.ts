import '../../converter/converter.module';

import { clone } from '../../util';
import { staticInjector, appContainer, DI_TYPES } from '../../di';
import { DateTimeFieldHelper } from './date-time-field.helper';
import { FROM_DATE_FIELD_NAME, FROM_TIME_FIELD_NAME } from '../../definition.interface';
import { DEFAULT_APPLICATION_SETTINGS } from '../../settings';

var testSettings = clone(DEFAULT_APPLICATION_SETTINGS);
testSettings.dateTime.timeZone = '+07:00';
appContainer.bind(DI_TYPES.Settings).toConstantValue(testSettings);

var dateTimeFieldHelper = staticInjector(DateTimeFieldHelper);

describe('filterByPredicate', function () {
  it('test1', function () {
    var changes = {};
    chnages[FROM_DATE_FIELD_NAME] = '2017-01-01';
    chnages[FROM_TIME_FIELD_NAME] = '10:20:30';

    var value = dateTimeFieldHelper.composeDateTimeSinceField({
      changes: changes,
    });
    var expectedValue = {};
    expectedValue[FROM_DATE_FIELD_NAME] = '2017-01-01T14:20:30+07:00';

    expect(value).toEqual(expectedValue);
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
