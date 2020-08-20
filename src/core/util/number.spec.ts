import {
  NumberUtils,
  roundedByPrecisionProportion,
} from './number';

describe('util/number', () => {
  describe('roundedProportion', () => {
    it('test1', () => {
      const value = NumberUtils.roundedProportion(20, 999.99);
      expect(value).toEqual(200.98999999999995);
    });

    it('test2', () => {
      const value = NumberUtils.roundedProportion(17, 12.35);
      expect(value).toEqual(2.3499999999999988);
    });
  });

  describe('roundedByPrecisionProportion', () => {
    it('test1', () => {
      const value = roundedByPrecisionProportion(20, 999.99);
      expect(value).toEqual(200.99);
    });

    it('test2', () => {
      const value = roundedByPrecisionProportion(17, 12.35);
      expect(value).toEqual(2.35);
    });
  });
});
