import { DefaultLayoutViewBuilder } from './default-layout-view.builder';
import {
  LayoutFactorsEnum,
  LayoutTypesEnum,
} from '../../../definition';
import { UniversalLayoutBuilder } from './universal-layout.builder';

describe('layout.builder', () => {

  it('test1', () => {
    function pseudoElement(name, value) {
      this.props = {[name]: value};
    }

    const layoutBuilder = new UniversalLayoutBuilder(new DefaultLayoutViewBuilder());
    const layout = layoutBuilder.build({
      items: [
        new pseudoElement('p1', 'v1'),
        {
          layout: LayoutTypesEnum.HORIZONTAL,
          items: [
            new pseudoElement('p2', 'v2'),
            {
              factor: LayoutFactorsEnum.FACTOR_2,
              items: [
                new pseudoElement('p4', 'v4'),
                new pseudoElement('p5', 'v5')
              ],
            },
            new pseudoElement('p3', 'v3')
          ],
        }
      ],
    });

    expect(layout).toEqual({
      rows: [
        new pseudoElement('p1', 'v1'),
        {
          columns: [
            new pseudoElement('p2', 'v2'),
            {
              factor: LayoutFactorsEnum.FACTOR_2,
              rows: [
                new pseudoElement('p4', 'v4'),
                new pseudoElement('p5', 'v5')
              ],
            },
            new pseudoElement('p3', 'v3')
          ],
        }
      ],
    });
  });
});
