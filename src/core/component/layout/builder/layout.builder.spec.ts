import { DefaultLayoutViewBuilder } from './default-layout-view.builder';
import { LayoutBuilderTypeEnum, LayoutBuilderFactorsEnum } from '../../../configurations-definitions.interface';
import { UniversalLayoutBuilder } from './universal-layout.builder';

describe('layout.builder', () => {

  it('test1', () => {
    function pseudoElement(name, value) {
      this.props = {[name]: value};
    }

    const layoutBuilder = new UniversalLayoutBuilder(new DefaultLayoutViewBuilder());
    const layout = layoutBuilder.build({
      children: [
        new pseudoElement('p1', 'v1'),
        {
          layout: LayoutBuilderTypeEnum.HORIZONTAL,
          children: [
            new pseudoElement('p2', 'v2'),
            {
              factor: LayoutBuilderFactorsEnum.FACTOR_2,
              children: [
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
            {separator: null},
            {
              factor: LayoutBuilderFactorsEnum.FACTOR_2,
              rows: [
                new pseudoElement('p4', 'v4'),
                new pseudoElement('p5', 'v5')
              ],
            },
            {separator: null},
            new pseudoElement('p3', 'v3')
          ],
        }
      ],
    });
  });
});
