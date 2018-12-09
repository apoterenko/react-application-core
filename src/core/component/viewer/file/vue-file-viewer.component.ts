import { Component, Prop } from 'vue-property-decorator';
import * as R from 'ramda';

import { isFn, nvl } from '../../../util';
import { ComponentName } from '../../connector/vue-index';
import { EntityCallbackWrapperT, IEntity } from '../../../definitions.interface';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { VueBasePictureViewer } from '../picture/vue-index';
import { vueViewerComponentConfigFactory } from '../vue-viewer.interface';
import { IVueFileViewerTemplateMethodsEntity, IVueFileViewerPropsEntity } from './vue-file-viewer.interface';

@ComponentName('vue-file-viewer')
@Component(vueViewerComponentConfigFactory())
class VueFileViewer extends VueBasePictureViewer implements IVueFileViewerPropsEntity {

  @Prop() public label: string;
  @Prop() public entity: IEntity;
  @Prop() public fileName: string;
  @Prop() public displayFileName: EntityCallbackWrapperT;

  /**
   * @stable [09.12.2018]
   */
  constructor() {
    super();
    this.getFileName = this.getFileName.bind(this);
  }

  /**
   * @stable [08.12.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }

  /**
   * @stable [09.12.2018]
   * @returns {string}
   */
  protected getPreviewTemplate(): string {
    return `
      <vue-flex-layout :row="true">
          <vue-flex-layout :justifyContentCenter="true">
              <span class="vue-viewer-preview-label">
                    {{getLabel()}}
              </span>
              <span class="vue-viewer-preview-file-name"
                    @click="onOpenPopup">
                    {{getFileName()}}
              </span>
          </vue-flex-layout>
          <vue-flex-layout :full="false"
                           :justifyContentCenter="true">
              <div class="vue-icon vue-icon-close"
                   @click="onRemove">
                    &nbsp;
              </div>
          </vue-flex-layout>
      </vue-flex-layout>
    `;
  }

  /**
   * @stable [09.12.2018]
   * @returns {IVueFileViewerTemplateMethodsEntity}
   */
  protected getTemplateMethods(): IVueFileViewerTemplateMethodsEntity {
    return {
      ...super.getTemplateMethods(),
      getLabel: () => this.t(this.label),
      getFileName: this.getFileName,
    };
  }

  /**
   * @stable [29.11.2018]
   */
  protected onOpenPopup(): void {
    super.onOpenPopup();
  }

  /**
   * @stable [29.11.2018]
   */
  protected onClosePopup(): void {
    super.onClosePopup();
  }

  protected onRemove(): void {
    super.onRemove();
  }

  /**
   * @stable [09.12.2018]
   * @returns {string}
   */
  protected getFileName(): string {
    return (
      isFn(this.displayFileName) && !R.isNil(this.entity)
        ? this.displayFileName(this.entity)
        : nvl(this.fileName, this.t(this.settings.messages.unknownFileMessage))
    );
  }
}
