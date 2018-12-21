import { Prop } from 'vue-property-decorator';

import { isFn, nvl, orDefault } from '../../../util';
import { EntityCallbackWrapperT, IEntity } from '../../../definitions.interface';
import { VueBasePictureViewer } from '../picture/vue-index';
import { IVueFileViewerTemplateMethodsEntity, IVueBaseFileViewerProps } from './vue-file-viewer.interface';

export class VueBaseFileViewer extends VueBasePictureViewer implements IVueBaseFileViewerProps {

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
   * @stable [22.12.2018]
   * @returns {string}
   */
  protected getFileName(): string {
    return orDefault<string, string>(
      isFn(this.displayFileName),
      () => this.displayFileName(this.entity),
      () => nvl(this.fileName, this.t(this.settings.messages.unknownFileMessage))
    );
  }
}
