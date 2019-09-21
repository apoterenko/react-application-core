import { getAllIndependentStackSections } from './stack.support';

describe('stack.support', () => {
  describe('getAllIndependentStackSections', () => {

    it('test1', () => {
      const initialState = {
        stack: [
          {
            section: 'section1',
            linkedSections: ['section2'],
          },
          {
            section: 'section2',
            linkedSections: ['section3'],
          },
          {
            section: 'section3',
            linkedSections: ['section4'],
          },
          {
            section: 'section4',
            linkedSections: ['section5'],
          },
          {
            section: 'section5',
            linkedSections: [],
          }
        ],
        destroySections: [],
      };

      expect(new Set(getAllIndependentStackSections('section1', initialState))).toEqual(
        new Set(['section2', 'section3', 'section4', 'section5'])
      );
    });

    it('test2', () => {
      const initialState = {
        stack: [
          {
            section: 'section1',
            linkedSections: ['section2'],
          },
          {
            section: 'section2',
            linkedSections: ['section3'],
          },
          {
            section: 'section3',
            linkedSections: ['section4'],
          },
          {
            section: 'section4',
            linkedSections: ['section5'],
          },
          {
            section: 'section5',
            linkedSections: [],
          }
        ],
        destroySections: [],
      };

      expect(new Set(getAllIndependentStackSections('section6', initialState))).toEqual(
        new Set(['section1', 'section2', 'section3', 'section4', 'section5'])
      );
    });

    it('test3', () => {
      const initialState = {
        stack: [
          {
            section: 'section1',
            linkedSections: ['section2'],
          },
          {
            section: 'section2',
            linkedSections: ['section3'],
          },
          {
            section: 'section3',
            linkedSections: ['section4'],
          },
          {
            section: 'section4',
            linkedSections: ['section5'],
          },
          {
            section: 'section5',
            linkedSections: [],
          }
        ],
        destroySections: ['section5'],
      };

      // S1 -> S2 -> S3 -> S4 -> S5 -> S3
      expect(new Set(getAllIndependentStackSections('section3', initialState))).toEqual(
        new Set(['section4', 'section5'])
      );
    });

    it('test4', () => {
      const initialState = {
        stack: [
          {
            section: 'section1',
            linkedSections: ['section2'],
          },
          {
            section: 'section2',
            linkedSections: ['section3'],
          },
          {
            section: 'section3',
            linkedSections: ['section4'],
          },
          {
            section: 'section4',
            linkedSections: ['section5'],
          },
          {
            section: 'section5',
            linkedSections: [],
          }
        ],
        destroySections: ['section5'],
      };

      // S1 -> S2 -> S3 -> S4 -> S5 -> S2
      expect(new Set(getAllIndependentStackSections('section2', initialState))).toEqual(
        new Set(['section3', 'section4', 'section5'])
      );
    });
  });
});
