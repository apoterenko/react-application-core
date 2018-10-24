import { Component, Prop } from 'vue-property-decorator';

import { toClassName } from '../../../util';
import {
  VueCreateElementFactoryT,
  VueNodeT,
  VNodeDataT,
} from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { VueBaseComponent } from '../../base/vue-index';
import { IUniversalFlexLayoutProps } from './universal-flex-layout.interface';

// TODO
@ComponentName('vue-flex-layout')
@Component
class VueFlexLayout extends VueBaseComponent
  implements IUniversalFlexLayoutProps {

  @Prop() public children: string;
  @Prop() public className: string;
  @Prop() public title: string;
  @Prop() public style1: string;
  @Prop() public row: boolean;
  @Prop() public full: boolean;
  @Prop() public separator: boolean;
  @Prop() public alignItemsCenter: boolean;
  @Prop() public alignItemsEnd: boolean;
  @Prop() public justifyContentCenter: boolean;
  @Prop() public justifyContentEnd: boolean;

  public render(factory: VueCreateElementFactoryT): VueNodeT {
    const nodeData: VNodeDataT = {
      class: this.getClassName(),
      attrs: {
        title: this.title,
      },
    };
    return factory('div', nodeData, this.$slots.default);
  }

  public onClick(...any): void {
    // TODO
  }

  private getClassName(): string {
    const props = this;
    return toClassName(
      props.className,
      'rac-flex',
      props.row ? 'rac-flex-row' : 'rac-flex-column',
      props.full !== false && 'rac-flex-full',
      props.separator && 'rac-flex-separator',
      props.alignItemsCenter && 'rac-flex-align-items-center',
      props.alignItemsEnd && 'rac-flex-align-items-end',
      props.justifyContentCenter && 'rac-flex-justify-content-center',
      props.justifyContentEnd && 'rac-flex-justify-content-end'
    );
  }
}
