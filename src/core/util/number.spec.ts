import {
  percentRoundedValue,
  percentRoundedByPrecisionValue,
} from './number';

describe('util/number', () => {
  describe('percentRoundedValue', () => {
    it('test1', () => {
      const value = percentRoundedValue(20, 999.99);
      expect(value).toEqual(200.98999999999995);
    });

    it('test2', () => {
      const value = percentRoundedValue(17, 12.35);
      expect(value).toEqual(2.3499999999999988);
    });
  });

  describe('percentRoundedByPrecisionValue', () => {
    it('test1', () => {
      const value = percentRoundedByPrecisionValue(20, 999.99);
      expect(value).toEqual(200.99);
    });

    it('test2', () => {
      const value = percentRoundedByPrecisionValue(17, 12.35);
      expect(value).toEqual(2.35);
    });
  });
});
