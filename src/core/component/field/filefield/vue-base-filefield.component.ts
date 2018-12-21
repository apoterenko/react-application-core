import * as R from 'ramda';
import { Prop } from 'vue-property-decorator';

import {
  isFn,
  orNull,
  ifNotNilReturnValue,
  defValuesFilter,
  isDef,
  orDefault,
  isPrimitive,
  calc,
} from '../../../util';
import { IEntity, IKeyValue, AnyT } from '../../../definitions.interface';
import { IMultiItemEntity } from '../../../entities-definitions.interface';
import { VueField } from '../field/vue-index';
import { MultiFieldPlugin } from '../multifield/vue-index';
import { IVueBaseFileViewerProps, IVueViewerListenersEntity } from '../../viewer/vue-index';
import { IVueBaseFileFieldTemplateMethodsEntity } from './vue-filefield.interface';

export class VueBaseFileField extends VueField implements IVueBaseFileFieldTemplateMethodsEntity {
  @Prop({default: (): number => 1}) protected readonly maxFiles: number;
  @Prop({default: (): string => 'hidden'}) protected readonly type: string;
  @Prop({default: (): string => 'vue-file-viewer'}) protected readonly viewer: string;
  @Prop() protected readonly emptyMessageFactory: (index: number) => string;
  @Prop() protected readonly placeHolderMessageFactory: (index: number) => string;
  @Prop() protected readonly clsFactory: (entity: IEntity) => string;
  @Prop() protected readonly subFieldConfig: (index: number) => IKeyValue;
  @Prop() protected readonly viewerProps: IVueBaseFileViewerProps;
  @Prop() protected readonly displayFileName: string;
  @Prop() protected readonly displayFileFormat: string;

  protected readonly multiFieldPlugin = new MultiFieldPlugin(this);
  protected readonly cachedFiles = new Map<string, File>();

  /**
   * @stable [27.11.2018]
   */
  constructor() {
    super();
    this.onFileChange = this.onFileChange.bind(this);
    this.onFilesSelect = this.onFilesSelect.bind(this);
    this.getViewerBindings = this.getViewerBindings.bind(this);
    this.getViewerListeners = this.getViewerListeners.bind(this);
    this.getViewerComponent = this.getViewerComponent.bind(this);
    this.getLabel = this.getLabel.bind(this);
    this.getPlaceholder = this.getPlaceholder.bind(this);
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
   * @stable [16.12.2018]
   * @param {File[]} files
   * @param {number} index
   * @returns {string[]}
   */
  public onFilesSelect(files: File[], index: number): string[] {
    return Array.from(files).map((file) => {
      const url = this.toFileUrl(file);
      this.addFile(url, index, file);  // TODO Need to many files handling
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

  public getPlaceholder(index: number): string {
    return isFn(this.placeHolderMessageFactory)
      ? this.placeHolderMessageFactory(index)
      : this.t(this.placeholder);
  }

  /**
   * @stable [20.12.2018]
   * @returns {IEntity[]}
   */
  public getFiles(): IEntity[] {
    return [];
  }

  /**
   * @stable [09.12.2018]
   * @param {IMultiItemEntity} entity
   * @param {number} index
   * @returns {IVueBaseFileViewerProps}
   */
  // TODO Check entity typings
  public getViewerBindings(entity: IMultiItemEntity | string, index: number): IVueBaseFileViewerProps {
    const props: IVueBaseFileViewerProps = {
      ...this.viewerProps,
      label: this.getPlaceholder(index),
    };
    const multiItemEntity = entity as IMultiItemEntity;
    if (isPrimitive(entity)) {
      return {
        ...props,
        src: this.getDisplayValue() || entity,
        fileName: this.getFileName(),
      };
    } else if (multiItemEntity.newEntity) {
      const relationId = multiItemEntity.id as string;
      return {
        ...props,
        src: relationId,
        fileName: orNull(this.cachedFiles.has(relationId), () => this.cachedFiles.get(relationId).name),
      };
    }
    return {
      ...props,
      src: Reflect.get(multiItemEntity, this.displayName),
      entity: multiItemEntity,
      className: calc(this.clsFactory, multiItemEntity),
    };
  }

  /**
   * @stable [16.12.2018]
   * @param {IMultiItemEntity} fileEntity
   * @param {number} index
   * @returns {IVueViewerListenersEntity<File>}
   */
  public getViewerListeners(fileEntity: IMultiItemEntity, index: number): IVueViewerListenersEntity<File> {
    return {
      change: (file: File) => this.onFileChange(fileEntity, file, index),
      remove: () => this.removeFile(fileEntity),
    };
  }

  /**
   * @stable [21.12.2018]
   * @param {File} file
   * @param {number} index
   * @returns {string}
   */
  public getViewerComponent(file: File, index: number): string {
    return this.viewer;
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
                       :is="getViewerComponent(file, index)"
                       v-on="getViewerListeners(file, index)"
                       v-bind="getViewerBindings(file, index)"/>
            <vue-flex-layout v-if="!file"
                            :row="true">
                <vue-flex-layout v-if="getPlaceholder(index)"
                                :justifyContentCenter="true">
                    {{getPlaceholder(index)}}
                </vue-flex-layout>
                <vue-flex-layout>
                    <vue-dnd :defaultMessage="getLabel(index)"
                             @select="onFilesSelect($event, index)"/>
                </vue-flex-layout>
            </vue-flex-layout>
          </template>
       </div>`
    );
  }

  /**
   * @stable [16.12.2018]
   * @param {IMultiItemEntity} fileEntity
   * @param {File} file
   * @param {number} index
   */
  protected onFileChange(fileEntity: IMultiItemEntity, file: File, index: number): void {
    const newFileUrl = this.toFileUrl(file);
    if (fileEntity.newEntity) {
      this.removeFile(fileEntity);
      this.$nextTick(() => this.addFile(newFileUrl, index, file));
    } else {
      this.multiFieldPlugin.onEditItem({id: fileEntity.id, name: this.displayName, value: newFileUrl});
    }
  }

  /**
   * @stable [10.12.2018]
   * @returns {IVueBaseFileFieldTemplateMethodsEntity}
   */
  protected getTemplateMethods(): IVueBaseFileFieldTemplateMethodsEntity {
    return {
      ...super.getTemplateMethods(),
      onFilesSelect: this.onFilesSelect,
      getFiles: this.getFiles,
      getLabel: this.getLabel,
      getPlaceholder: this.getPlaceholder,
      getViewerComponent: this.getViewerComponent,
      getViewerListeners: this.getViewerListeners,
      getViewerBindings: this.getViewerBindings,
    };
  }

  protected getFileFormat(): AnyT {
    let fileFormatValue;
    return orDefault(
      isDef(this.bindStore) && !R.isNil(fileFormatValue = this.bindStore[this.displayFileFormat]),
      fileFormatValue,
      () => this.getValue()
    );
  }

  /**
   * @stable [10.12.2018]
   * @param {File} file
   * @returns {string}
   */
  private toFileUrl(file: File): string {
    const newFileUrl = URL.createObjectURL(file);
    this.cachedFiles.set(newFileUrl, file);
    return newFileUrl;
  }

  /**
   * @stable [28.11.2018]
   * @param {string} fileUrl
   */
  private destroyFileUrl(fileUrl: string): void {
    this.cachedFiles.delete(fileUrl);
    URL.revokeObjectURL(fileUrl);
  }

  /**
   * @stable [16.12.2018]
   * @param {string} fileUrl
   * @param {number} index
   */
  // TODO
  private addFile(fileUrl: string, index: number, file: File): void {
    const cfg = this.getSubFieldConfig(index);
    this.multiFieldPlugin.onAddItem(defValuesFilter<IMultiItemEntity, IMultiItemEntity>({
      id: fileUrl,
      rawData: ({...cfg, id: fileUrl, type: file.type, name: file.name, newEntity: true}),  // TODO Typings
    }));
  }

  /**
   * @stable [28.11.2018]
   * @param {IMultiItemEntity} fileEntity
   */
  private removeFile(fileEntity: IMultiItemEntity | string): void {
    const fileId = fileEntity as string;
    const multiItemEntity = fileEntity as IMultiItemEntity;

    // TODO refactoring
    if (isPrimitive(fileEntity)) {
      this.multiFieldPlugin.onDeleteItem({id: fileId});
      this.destroyFileUrl(fileId);
    } else {
      this.multiFieldPlugin.onDeleteItem(multiItemEntity);
      this.destroyFileUrl(multiItemEntity.id as string);
    }
  }

  /**
   * @stable [16.12.2018]
   * @param {number} index
   * @returns {IKeyValue}
   */
  private getSubFieldConfig(index: number): IKeyValue {
    return ifNotNilReturnValue(this.subFieldConfig, () => this.subFieldConfig(index));
  }

  private getFileName(): AnyT {
    let fileNameValue;
    return orDefault(
      isDef(this.bindStore) && !R.isNil(fileNameValue = this.bindStore[this.displayFileName]),
      fileNameValue,
      () => this.getValue()
    );
  }
}
