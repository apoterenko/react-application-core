import { staticInjector } from '../../di';
import { DateConverter } from './date-converter.service';

const dateConverter = staticInjector(DateConverter);

describe('DateConverter', () => {
  describe('from30DaysAgoUiDateTimeToDateTime', () => {
    it('test1', () => {
      const value = dateConverter.from30DaysAgoUiDateTimeToDateTime();
      expect(value).toEqual('2036-07-30T00:00:00-07:00');
    });
  });
});
