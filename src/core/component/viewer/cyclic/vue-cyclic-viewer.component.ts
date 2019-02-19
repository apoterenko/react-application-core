import { Component, Prop } from 'vue-property-decorator';

import { ComponentName } from '../../connector/vue-index';
import { VueBaseComponent } from '../../base/vue-index';
import {
  IVueCyclicViewerPayloadEntity,
  IVueCyclicViewerProps,
  VUE_CYCLIC_VIEWER_NAME,
} from './vue-cyclic-viewer.interface';
import { isImageFileFormat, isPdfFileFormat } from '../../../util';

@ComponentName(VUE_CYCLIC_VIEWER_NAME)
@Component({
  template: `
      <vue-flex-layout class="vue-cyclic-viewer">
          <vue-flex-layout v-if="!hasFiles()"
                           :justifyContentCenter="true"
                           :alignItemsCenter="true">
            No files
          </vue-flex-layout>
          <vue-flex-layout v-if="hasFiles()"
                           class="vue-cyclic-viewer-content">
              <vue-pdf-preview v-if="isPdfFile()"
                               :src="getSrc()"/>
              <vue-picture-preview v-if="isImageFile()"
                                  :src="getSrc()"/>
          </vue-flex-layout>
          <vue-flex-layout v-if="hasFiles()"
                           class="vue-cyclic-viewer-footer"
                           :justifyContentCenter="true"
                           :alignItemsCenter="true">
              <vue-flex-layout :row="true"
                               :full="false"
                               :alignItemsCenter="true">
                  <vue-button @click="onPrevious"
                              text="Previous"
                              :disabled="!isPreviousStepAvailable()"/>
                  <span class="vue-cyclic-viewer-index-info">{{getIndexInfo()}}</span>
                  <vue-button @click="onNext"
                              text="Next"
                              :disabled="!isNextStepAvailable()"/>
              </vue-flex-layout>
          </vue-flex-layout>
      </vue-flex-layout>
  `,
})
class VueCyclicViewer extends VueBaseComponent<{}> implements IVueCyclicViewerProps {
  @Prop() public list: IVueCyclicViewerPayloadEntity[];
  @Prop() public index: number;

  /**
   * @stable [29.01.2019]
   * @returns {boolean}
   */
  private isPreviousStepAvailable(): boolean {
    return this.getIndex() > 0;
  }

  /**
   * @stable [29.01.2019]
   * @returns {boolean}
   */
  private isNextStepAvailable(): boolean {
    return this.getIndex() < this.getList().length - 1;
  }

  /**
   * @stable [29.01.2019]
   */
  private onPrevious(): void {
    this.doEmitPositionEvent(this.getIndex() - 1);
  }

  /**
   * @stable [29.01.2019]
   */
  private onNext(): void {
    this.doEmitPositionEvent(this.getIndex() + 1);
  }

  /**
   * @stable [29.01.2019]
   * @returns {boolean}
   */
  private isPdfFile(): boolean {
    return isPdfFileFormat(this.getFormat());
  }

  /**
   * @stable [29.01.2019]
   * @returns {boolean}
   */
  private isImageFile(): boolean {
    return isImageFileFormat(this.getFormat());
  }

  /**
   * @stable [29.01.2019]
   * @returns {boolean}
   */
  private hasFiles(): boolean {
    return this.getList().length > 0;
  }

  /**
   * @stable [29.01.2019]
   * @returns {string}
   */
  private getSrc(): string {
    return this.getPayload().url;
  }

  /**
   * @stable [29.01.2019]
   * @returns {string}
   */
  private getFormat(): string {
    return this.getPayload().format;
  }

  /**
   * @stable [29.01.2019]
   * @returns {IVueCyclicViewerPayloadEntity}
   */
  private getPayload(): IVueCyclicViewerPayloadEntity {
    return this.getList()[this.getIndex()];
  }

  /**
   * @stable [29.01.2019]
   * @returns {number}
   */
  private getIndex(): number {
    return this.index || 0;
  }

  /**
   * @stable [29.01.2019]
   * @returns {string}
   */
  private getIndexInfo(): string {
    return `${this.getIndex() + 1}/${this.getList().length}`;
  }

  /**
   * @stable [29.01.2019]
   * @returns {IVueCyclicViewerPayloadEntity[]}
   */
  private getList(): IVueCyclicViewerPayloadEntity[] {
    return this.list || [];
  }

  /**
   * @stable [19.02.2019]
   * @param {number} index
   */
  private doEmitPositionEvent(index: number): void {
    this.$emit('change', index);
  }
}
