import { DefaultLayoutViewBuilder } from './default-layout-view.builder';
import { LayoutBuilderTypeEnum, LayoutBuilderFactorEnum } from '../../../configurations-definitions.interface';
import { UniversalLayoutBuilder } from './universal-layout.builder';

describe('layout.builder', () => {

  it('test1', () => {
    class PseudoElement {
      private props;
      constructor(name, value) {
        this.props = {[name]: value};
      }
    }

    const layoutBuilder = new UniversalLayoutBuilder(new DefaultLayoutViewBuilder());
    const layout = layoutBuilder.build({
      children: [
        new PseudoElement('p1', 'v1'),
        {
          layout: LayoutBuilderTypeEnum.HORIZONTAL,
          children: [
            new PseudoElement('p2', 'v2'),
            {
              factor: LayoutBuilderFactorEnum.FACTOR_2,
              children: [
                new PseudoElement('p4', 'v4'),
                new PseudoElement('p5', 'v5')
              ],
            },
            new PseudoElement('p3', 'v3')
          ],
        }
      ],
    });

    expect(layout).toEqual({
      rows: [
        new PseudoElement('p1', 'v1'),
        {
          columns: [
            new PseudoElement('p2', 'v2'),
            {separator: null},
            {
              factor: LayoutBuilderFactorEnum.FACTOR_2,
              rows: [
                new PseudoElement('p4', 'v4'),
                new PseudoElement('p5', 'v5')
              ],
            },
            {separator: null},
            new PseudoElement('p3', 'v3')
          ],
        }
      ],
    });
  });
});
