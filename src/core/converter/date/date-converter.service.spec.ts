import { staticInjector, DI_TYPES } from '../../di';

const dateConverter = staticInjector(DI_TYPES.DateConverter);

describe('DateConverter', () => {
  describe('from30DaysAgoUiDateTimeToDateTime', () => {
    it('test1', () => {
      const value = dateConverter.from30DaysAgoUiDateTimeToDateTime();
      expect(value).toEqual('2036-07-30T00:00:00-07:00');
    });
  });
});
