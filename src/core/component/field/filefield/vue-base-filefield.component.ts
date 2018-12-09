import { Prop } from 'vue-property-decorator';

import { isFn, orNull } from '../../../util';
import { IEntity } from '../../../definitions.interface';
import { IMultiItemEntity } from '../../../entities-definitions.interface';
import { VueField } from '../field/vue-index';
import { MultiFieldPlugin } from '../multifield/vue-index';
import { IVueFileViewerPropsEntity } from '../../viewer/vue-index';
import { IVueBaseFileFieldTemplateMethodsEntity } from './vue-filefield.interface';

export class VueBaseFileField extends VueField {

  @Prop({default: (): string => 'hidden'}) protected readonly type: string;
  @Prop({default: (): string => 'vue-file-viewer'}) protected readonly viewer: string;
  @Prop() protected readonly emptyMessageFactory: (index: number) => string;
  @Prop() protected readonly viewerProps: IVueFileViewerPropsEntity;

  protected readonly multiFieldPlugin = new MultiFieldPlugin(this);
  protected readonly cachedFiles = new Map<string, File>();

  /**
   * @stable [27.11.2018]
   */
  constructor() {
    super();
    this.onFilesSelect = this.onFilesSelect.bind(this);
    this.getViewerBindings = this.getViewerBindings.bind(this);
    this.getLabel = this.getLabel.bind(this);
    this.getFiles = this.getFiles.bind(this);
  }

  /**
   * @stable [25.11.2018]
   * @returns {string}
   */
  public getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-file-field`;
  }

  /**
   * @stable [28.11.2018]
   * @param {File[]} files
   * @returns {string[]}
   */
  public onFilesSelect(files: File[]): string[] {
    return Array.from(files).map((file) => {
      const url = URL.createObjectURL(file);
      this.cachedFiles.set(url, file);
      this.addFile(url);  // TODO Need to many files handling
      return url;
    });
  }

  /**
   * @stable [09.12.2018]
   * @param {number} index
   * @returns {string}
   */
  public getLabel(index: number): string {
    return isFn(this.emptyMessageFactory)
      ? this.emptyMessageFactory(index)
      : this.settings.messages.dndMessage;
  }

  // TODO
  public getFiles(): IEntity[] {
    return [];
  }

  /**
   * @stable [09.12.2018]
   * @param {IMultiItemEntity} entity
   * @param {number} index
   * @returns {IVueFileViewerPropsEntity}
   */
  public getViewerBindings(entity: IMultiItemEntity, index: number): IVueFileViewerPropsEntity {
    const props: IVueFileViewerPropsEntity = {
      ...this.viewerProps,
      label: this.getLabel(index),
    };
    if (entity.newEntity) {
      const relationId = entity.id as string;
      return {
        ...props,
        src: relationId,
        fileName: orNull(this.cachedFiles.has(relationId), () => this.cachedFiles.get(relationId).name),
      };
    }
    return {
      ...props,
      src: Reflect.get(entity, this.displayName),
      entity,
    };
  }

  /**
   * @stable [17.11.2018]
   * @returns {string}
   */
  protected getInputClassName(): string {
    return `${super.getInputClassName()} rac-flex-full`;
  }

  /**
   * @stable [09.12.2018]
   * @returns {string}
   */
  protected getFieldAttachmentTemplate(): string {
    return (
      `<div class="vue-field-attachment-wrapper">
          <template v-for="(file, index) in getFiles()">
            <component v-if="file"
                       :is="getViewerComponent()"
                       v-on="getViewerListeners(file, index)"
                       v-bind="getViewerBindings(file, index)"/>
            <vue-dnd v-if="!file"
                    :defaultMessage="getLabel(index)"
                    @select="onFilesSelect"/>
          </template>
       </div>`
    );
  }

  /**
   * @stable [28.11.2018]
   * @param {string} fileUrl
   */
  protected addFile(fileUrl: string): void {
    this.multiFieldPlugin.onAddItem({id: fileUrl, newEntity: true});
  }

  /**
   * @stable [28.11.2018]
   * @param {IMultiItemEntity} fileEntity
   */
  protected removeFile(fileEntity: IMultiItemEntity): void {
    this.multiFieldPlugin.onDeleteItem(fileEntity);
    this.destroyFileUrl(fileEntity.id as string);
  }

  /**
   * @stable [28.11.2018]
   * @param {string} fileUrl
   */
  protected destroyFileUrl(fileUrl: string): void {
    this.cachedFiles.delete(fileUrl);
    URL.revokeObjectURL(fileUrl);
  }

  /**
   * @stable [08.12.2018]
   * @returns {IVueBaseFileFieldTemplateMethodsEntity}
   */
  protected getTemplateMethods(): IVueBaseFileFieldTemplateMethodsEntity {
    return {
      ...super.getTemplateMethods(),
      getLabel: this.getLabel,
      getViewerComponent: () => this.viewer,
      getViewerBindings: this.getViewerBindings,
    };
  }
}
