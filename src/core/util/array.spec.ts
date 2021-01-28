import { ArrayUtils } from './array';

describe('util/array', () => {
  describe('ArrayUtils.subArray', () => {
    it('test0', () => {
      const ids = ArrayUtils.subArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5);
      expect(ids).toEqual([0, 1, 2, 3, 4]);
    });

    it('test1', () => {
      const ids = ArrayUtils.subArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 0);
      expect(ids).toEqual([]);
    });

    it('test2', () => {
      const ids = ArrayUtils.subArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 1, 9);
      expect(ids).toEqual([9]);
    });

    it('test3', () => {
      const ids = ArrayUtils.subArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 5, 1);
      expect(ids).toEqual([1, 2, 3, 4, 5]);
    });

    it('test4', () => {
      const ids = ArrayUtils.subArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10);
      expect(ids).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('test5', () => {
      const ids = ArrayUtils.subArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 11);
      expect(ids).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    });

    it('test6', () => {
      const ids = ArrayUtils.subArray([0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 11, 5);
      expect(ids).toEqual([5, 6, 7, 8, 9]);
    });
  });
});
