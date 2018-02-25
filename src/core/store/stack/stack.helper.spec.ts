import { getDestroyableSections, lockNextSection, destroySections, pushNextSection } from './stack.helper';

describe('stack.helper', () => {
  describe('getDestroyableSections', () => {
    it('test1', () => {
      const destroyableSections = getDestroyableSections(
        'section1',
        {
          stack: [
            {
              section: 'section2',
              linkedToSections: ['section3'],
            }
          ],
        },
      );
      expect(destroyableSections).toEqual(['section2', 'section3']);
    });

    it('test2', () => {
      const destroyableSections = getDestroyableSections(
        'section1',
        {
          stack: [
            {
              section: 'section2',
              linkedToSections: ['section3'],
            },
            {
              section: 'section3',
              linkedToSections: ['section4'],
            }
          ],
        },
      );
      expect(destroyableSections).toEqual(['section2', 'section3', 'section4']);
    });

    it('test3', () => {
      const destroyableSections = getDestroyableSections(
        'section2',
        {
          stack: [
            {
              section: 'section2',
              linkedToSections: ['section3'],
            }
          ],
        },
      );
      expect(destroyableSections).toEqual([]);
    });

    it('test4', () => {
      const destroyableSections = getDestroyableSections(
        'section3',
        {
          stack: [
            {
              section: 'section2',
              linkedToSections: ['section3'],
            }
          ],
        },
      );
      expect(destroyableSections).toEqual([]);
    });

    it('test5', () => {
      const destroyableSections = getDestroyableSections(
        'section2',
        {
          stack: [
            {
              section: 'section2',
              linkedToSections: ['section3', 'section5'],
            },
            {
              section: 'section3',
              linkedToSections: ['section4', 'section6'],
            }
          ],
        },
      );
      expect(destroyableSections).toEqual([]);
    });

    it('test6', () => {
      const destroyableSections = getDestroyableSections(
        'section3',
        {
          stack: [
            {
              section: 'section2',
              linkedToSections: ['section3', 'section5'],
            },
            {
              section: 'section3',
              linkedToSections: ['section4', 'section7'],
            },
            {
              section: 'section4',
              linkedToSections: [],
            },
            {
              section: 'section5',
              linkedToSections: [],
            },
            {
              section: 'section6',
              linkedToSections: [],
            },
            {
              section: 'section7',
              linkedToSections: [],
            }
          ],
        },
      );
      expect(destroyableSections).toEqual(['section6']);
    });

    it('test7', () => {
      const destroyableSections = getDestroyableSections(
        'section1',
        {
          stack: [
            {
              section: 'section2',
              linkedToSections: [],
            }
          ],
        },
      );
      expect(destroyableSections).toEqual(['section2']);
    });
  });

  describe('lockNextSection', () => {
    it('test1', () => {
      const nextState = lockNextSection(
        'nextSection2',
        {
          stack: [
            {
              section: 'section1',
              linkedToSections: [],
            }
          ],
        },
      );
      expect(nextState).toEqual([{ section: 'section1', linkedToSections: ['nextSection2'] }]);
    });

    it('test2', () => {
      const nextState = lockNextSection(
        'nextSection3',
        {
          stack: [
            {
              section: 'section1',
              linkedToSections: ['nextSection2'],
            }
          ],
        },
      );
      expect(nextState).toEqual([{ section: 'section1', linkedToSections: ['nextSection2', 'nextSection3'] }]);
    });

    it('test3', () => {
      const nextState = lockNextSection(
        'nextSection3',
        {
          stack: [
            {
              section: 'section1',
              linkedToSections: ['section2'],
            },
            {
              section: 'section2',
              linkedToSections: [],
            }
          ],
        },
      );
      expect(nextState).toEqual([
        { section: 'section1', linkedToSections: ['section2'] },
        { section: 'section2', linkedToSections: ['nextSection3'] }
      ]);
    });
  });

  describe('destroySections', () => {
    it('test1', () => {
      const nextState = destroySections(
        ['section1', 'section2'],
        {
          stack: [
            {
              section: 'section1',
              linkedToSections: [],
            },
            {
              section: 'section2',
              linkedToSections: [],
            },
            {
              section: 'section3',
              linkedToSections: [],
            },
            {
              section: 'section4',
              linkedToSections: [],
            }
          ],
        },
      );
      expect(nextState).toEqual([
        {
          section: 'section3',
          linkedToSections: [],
        },
        {
          section: 'section4',
          linkedToSections: [],
        }
      ]);
    });
  });

  describe('pushNextSection', () => {
    it('test1', () => {
      const nextState = pushNextSection(
        'section2',
        {
          stack: [
            {
              section: 'section1',
              linkedToSections: [],
            },
            {
              section: 'section2',
              linkedToSections: [],
            }
          ],
        },
      );
      expect(nextState).toEqual([
        {
          section: 'section1',
          linkedToSections: [],
        },
        {
          section: 'section2',
          linkedToSections: [],
        }
      ]);
    });

    it('test2', () => {
      const nextState = pushNextSection(
        'section2',
        {
          stack: [
            {
              section: 'section1',
              linkedToSections: [],
            }
          ],
        },
      );
      expect(nextState).toEqual([
        {
          section: 'section1',
          linkedToSections: [],
        },
        {
          section: 'section2',
          linkedToSections: [],
        }
      ]);
    });
  });
});
