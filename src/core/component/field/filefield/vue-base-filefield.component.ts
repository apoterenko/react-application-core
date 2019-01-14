import * as R from 'ramda';
import { Prop } from 'vue-property-decorator';

import {
  isFn,
  isDef,
  orDefault,
  isPrimitive,
  calc,
  defValuesFilter,
  orUndef,
  coalesce,
  ifNotNilReturnValue,
  toClassName,
} from '../../../util';
import { IEntity, AnyT } from '../../../definitions.interface';
import { IMultiItemEntity, MultiItemEntityT, IMultiItemFileEntity } from '../../../entities-definitions.interface';
import { VueField } from '../field/vue-index';
import { MultiFieldPlugin } from '../multifield/vue-index';
import { IVueBaseFileViewerProps, IVueViewerListenersEntity } from '../../viewer/vue-index';
import { IVueBaseFileFieldProps, IVueBaseFileFieldTemplateMethods } from './vue-filefield.interface';

export class VueBaseFileField extends VueField
  implements IVueBaseFileFieldTemplateMethods, IVueBaseFileFieldProps {

  @Prop() public readonly displayFileName: string;
  @Prop() public readonly displayFileFormat: string;
  @Prop() public readonly placeholderFactory: (index: number) => string;
  @Prop({default: (): number => 1}) public readonly maxFiles: number;
  @Prop() public readonly defaultDndMessage: string;
  @Prop() public readonly defaultDndMessageFactory: (index: number) => string;
  @Prop({default: (): string => 'vue-file-viewer'}) public readonly viewer: string;
  @Prop({default: (): string => 'hidden'}) protected readonly type: string;
  @Prop() protected readonly clsFactory: (entity: IEntity) => string;
  @Prop() protected readonly viewerProps: IVueBaseFileViewerProps;

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
    this.getDefaultDndMessage = this.getDefaultDndMessage.bind(this);
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
   * @returns {string[]}
   */
  public onFilesSelect(files: File[]): string[] {
    return Array.from(files).map((file) => {
      const url = this.toFileUrl(file);
      this.addFile(file, url);  // TODO Need to many files handling
      return url;
    });
  }

  /**
   * @stable [22.12.2018]
   * @param {number} index
   * @returns {string}
   */
  public getDefaultDndMessage(index: number): string {
    return coalesce(
      this.defaultDndMessage,
      ifNotNilReturnValue(this.defaultDndMessageFactory, () => this.defaultDndMessageFactory(index)),
      this.settings.messages.dndMessage
    );
  }

  /**
   * [<Placeholder: optional> + <Default DnD message>]
   *
   * @stable [22.12.2018]
   * @param {number} index
   * @returns {string}
   */
  public getPlaceholder(index: number): string {
    return isFn(this.placeholderFactory)
      ? this.placeholderFactory(index)
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
   * @stable [22.12.2018]
   * @param {MultiItemEntityT} entityOrEntityId
   * @param {number} index
   * @returns {IVueBaseFileViewerProps}
   */
  public getViewerBindings(entityOrEntityId: MultiItemEntityT, index: number): IVueBaseFileViewerProps {
    const props: IVueBaseFileViewerProps = {
      ...this.viewerProps,
      placeholder: this.getPlaceholder(index),
      className: this.getAttachmentContentClassName(index),
    };
    const multiItemEntity = entityOrEntityId as IMultiItemEntity;
    const className = () => toClassName(calc(this.clsFactory, multiItemEntity), calc(props.className));

    if (isPrimitive(entityOrEntityId)) {
      // In case of a single field which receives only entity id
      return {
        ...props,
        src: this.getDisplayValue() || entityOrEntityId,
        fileName: this.getFileName(),
      };
    } else if (multiItemEntity.newEntity) {
      const relationId = multiItemEntity.id as string;
      return defValuesFilter<IVueBaseFileViewerProps, IVueBaseFileViewerProps>({
        ...props,
        src: relationId,
        fileName: orUndef<string>(this.cachedFiles.has(relationId), () => this.cachedFiles.get(relationId).name),
        className: className(),
      });
    }
    return {
      ...props,
      src: Reflect.get(multiItemEntity, this.displayName),
      entity: multiItemEntity,
      className: className(),
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
      change: (file: File) => this.onFileChange(fileEntity, file),
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
   * @stable [06.01.2019]
   * @param {number} index
   * @returns {string}
   */
  public getAttachmentContentClassName(index: number): string {
    return toClassName(
      'vue-field-attachment-content',
      this.getPlaceholder(index) && ' vue-field-attachment-content-with-placeholder'
    );
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
                             :row="true"
                             :class="getAttachmentContentClassName(index)">
                <vue-flex-layout v-if="getPlaceholder(index)"
                                :justifyContentCenter="true"
                                :class="'vue-field-attachment-placeholder vue-field-attachment-placeholder-' + index">
                    {{getPlaceholder(index)}}
                </vue-flex-layout>
                <vue-flex-layout :class="'vue-field-attachment-dnd-message vue-field-attachment-dnd-message-' + index"
                                 :full="!getPlaceholder(index)">
                    <vue-dnd :defaultMessage="getDefaultDndMessage(index)"
                             @select="onFilesSelect($event)"/>
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
   */
  protected onFileChange(fileEntity: IMultiItemEntity, file: File): void {
    const newFileUrl = this.toFileUrl(file);
    if (fileEntity.newEntity) {
      this.removeFile(fileEntity);
      this.$nextTick(() => this.addFile(file, newFileUrl));
    } else {
      this.multiFieldPlugin.onEditItem({id: fileEntity.id, name: this.displayName, value: newFileUrl});
    }
  }

  /**
   * @stable [10.12.2018]
   * @returns {TMethods}
   */
  protected getTemplateMethods<TMethods extends IVueBaseFileFieldTemplateMethods>(): TMethods {
    return {
      ...super.getTemplateMethods(),
      onFilesSelect: this.onFilesSelect,
      getFiles: this.getFiles,
      getDefaultDndMessage: this.getDefaultDndMessage,
      getAttachmentContentClassName: this.getAttachmentContentClassName,
      getPlaceholder: this.getPlaceholder,
      getViewerComponent: this.getViewerComponent,
      getViewerListeners: this.getViewerListeners,
      getViewerBindings: this.getViewerBindings,
    } as TMethods;
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
   * @stable [22.12.2018]
   * @param {File} file
   * @param {string} fileUrl
   */
  private addFile(file: File, fileUrl: string): void {
    const rawData: IMultiItemFileEntity = {
      id: fileUrl,
      newEntity: true,
      type: file.type,
      name: file.name,
    };
    this.multiFieldPlugin.onAddItem({id: fileUrl, rawData});
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

  private getFileName(): AnyT {
    let fileNameValue;
    return orDefault(
      isDef(this.bindStore) && !R.isNil(fileNameValue = this.bindStore[this.displayFileName]),
      fileNameValue,
      () => this.getValue()
    );
  }
}
