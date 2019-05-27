import { Component, Prop, Watch } from 'vue-property-decorator';
import Tooltip from 'tooltip.js';

import { toClassName, calc, isDef, isUndef } from '../../../util';
import { IGenericTooltipEntity } from '../../../definition';
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
  @Prop() public readonly tooltip: IGenericTooltipEntity;
  @Prop() public separator: boolean;
  @Prop() public alignItemsCenter: boolean;
  @Prop() public alignItemsEnd: boolean;
  @Prop() public justifyContentCenter: boolean;
  @Prop() public justifyContentEnd: boolean;
  @Prop() private fullSize: boolean;

  private tooltipInstance: Tooltip;

  /**
   * @stable [27.05.2019]
   */
  public mounted() {
    this.doRefreshTooltip();
  }

  /**
   * @stable [27.05.2019]
   */
  @Watch('tooltip')
  public onOpenUpdate(): void {
    this.doRefreshTooltip();
  }

  /**
   * @stable [27.05.2019]
   */
  public beforeDestroy(): void {
    this.doDestroyTooltip();
  }

  /**
   * @stable [27.05.2019]
   * @param {VueCreateElementFactoryT} factory
   * @returns {VueNodeT}
   */
  public render(factory: VueCreateElementFactoryT): VueNodeT {
    const nodeData: VNodeDataT = {
      ref: 'contentRef',
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

  /**
   * @stable [27.05.2019]
   * @returns {HTMLElement}
   */
  private getContentRef(): HTMLElement {
    return this.$refs.contentRef as HTMLElement;
  }

  /**
   * @stable [27.05.2019]
   */
  private doDestroyTooltip(): void {
    if (isDef(this.tooltipInstance)) {
      this.tooltipInstance.dispose();
      this.tooltipInstance = null;
    }
  }

  /**
   * @stable [27.05.2019]
   */
  private doRefreshTooltip(): void {
    if (isUndef(this.tooltip)) {
      return;
    }

    this.doDestroyTooltip();
    this.tooltipInstance = new Tooltip(this.getContentRef(), {
      trigger: 'hover',
      ...this.tooltip,
    });
  }
}
