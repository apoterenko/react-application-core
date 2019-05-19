import { Component, Prop } from 'vue-property-decorator';

import { toClassName, calc } from '../../../util';
import {
  VueCreateElementFactoryT,
  VueNodeT,
  VNodeDataT,
} from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueBaseComponent } from '../../base/vue-index';
import { IVueFlexLayoutProps } from './universal-flex-layout.interface';

// TODO
@ComponentName('vue-flex-layout')
@Component
class VueFlexLayout extends VueBaseComponent
  implements IVueFlexLayoutProps {
  @Prop() public children: string;
  @Prop() public readonly responsive: boolean;
  @Prop() public readonly wrap: boolean;
  @Prop() public readonly noShrink: boolean;
  @Prop() public readonly row: boolean;
  @Prop() public separator: boolean;
  @Prop() public alignItemsCenter: boolean;
  @Prop() public alignItemsEnd: boolean;
  @Prop() public justifyContentCenter: boolean;
  @Prop() public justifyContentEnd: boolean;
  @Prop() private fullSize: boolean;

  public render(factory: VueCreateElementFactoryT): VueNodeT {
    const nodeData: VNodeDataT = {
      class: this.getClassName(),
      style: this.styles,
      attrs: {
        title: this.title,
      },
    };
    return factory('div', nodeData, this.$slots.default);
  }

  private getClassName(): string {
    const props = this;
    return toClassName(
      'rac-flex',                                                                       /* @stable [19.05.2019] */
      calc(props.className),                                                            /* @stable [19.05.2019] */
      props.responsive                                                                  /* @stable [19.05.2019] */
        ? 'rac-flex-responsive'
        : (props.row ? 'rac-flex-row' : 'rac-flex-column'),
      props.full !== false && 'rac-flex-full',                                          /* @stable [19.05.2019] */
      props.noShrink && 'rac-flex-no-shrink',                                           /* @stable [19.05.2019] */
      props.wrap && 'rac-flex-wrap',                                                    /* @stable [19.05.2019] */
      props.fullSize && 'rac-full-size',
      props.separator && 'rac-flex-separator',
      props.alignItemsCenter && 'rac-flex-align-items-center',
      props.alignItemsEnd && 'rac-flex-align-items-end',
      props.justifyContentCenter && 'rac-flex-justify-content-center',
      props.justifyContentEnd && 'rac-flex-justify-content-end'
    );
  }
}
