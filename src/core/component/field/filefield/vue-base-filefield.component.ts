import * as R from 'ramda';
import { Prop } from 'vue-property-decorator';

import {
  isFn,
  isDef,
  isPrimitive,
  calc,
  defValuesFilter,
  orUndef,
  nvl,
  ifNotNilThanValue,
  toClassName,
  toType,
} from '../../../util';
import { IEntity, AnyT, EntityIdT, IEntityIdTWrapper } from '../../../definitions.interface';
import { IMultiItemEntity, MultiItemEntityT, IMultiItemFileEntity } from '../../../entities-definitions.interface';
import { VueField } from '../field/vue-index';
import { MultiFieldPlugin } from '../multifield/vue-index';
import {
  IVueBaseFileViewerProps,
  IVueViewerListenersEntity,
  VUE_PDF_FILE_VIEWER_NAME,
  VUE_FILE_VIEWER_NAME,
  IVueViewer,
} from '../../viewer/vue-index';
import { IVueBaseFileFieldProps, IVueBaseFileFieldTemplateMethods } from './vue-filefield.interface';

export class VueBaseFileField extends VueField
  implements IVueBaseFileFieldTemplateMethods, IVueBaseFileFieldProps {

  @Prop() public readonly displayFileName: string;
  @Prop() public readonly displayFileFormat: string;
  @Prop() public readonly placeholderFactory: (index: number) => string;
  @Prop() public readonly canRenderAttachment: (entity: IMultiItemEntity, index: number) => boolean;
  @Prop({default: (): number => 1}) public readonly maxFiles: number;
  @Prop({default: (): boolean => false}) public readonly openViewerPopupOnFileSelect: boolean;
  @Prop() public readonly defaultDndMessage: string;
  @Prop() public readonly defaultDndMessageFactory: (index: number) => string;
  @Prop({default: (): string => VUE_FILE_VIEWER_NAME}) public readonly viewer: string;
  @Prop({default: (): string => 'hidden'}) public readonly type: string;
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
    this.getCustomDndMessage = this.getCustomDndMessage.bind(this);
    this.getPlaceholder = this.getPlaceholder.bind(this);
    this.getEntities = this.getEntities.bind(this);
    this.getAttachmentContentClassName = this.getAttachmentContentClassName.bind(this);
    this.canRenderAttachmentContent = this.canRenderAttachmentContent.bind(this);
  }

  /**
   * @stable [25.11.2018]
   * @returns {string}
   */
  public getFieldClassName(): string {
    return `${super.getFieldClassName()} vue-file-field`;
  }

  /**
   * @stable [11.02.2019]
   * @param {File[]} files
   * @param {IMultiItemFileEntity | IEntity} replacedEntity
   * @param {number} index
   */
  public onFilesSelect(files: File[], replacedEntity: IMultiItemFileEntity | IEntity, index: number): void {
    Array.from(files).forEach((file) => {
      const url = this.toFileUrl(file);
      if (R.isNil(replacedEntity)) {
        this.addFile(file, url, index);
      } else {
        this.replaceFile(replacedEntity, file, url, index);
      }
    });
    if (this.openViewerPopupOnFileSelect) {
      // Need to open popup after selecting/change
      this.openViewerPopup();
    }
  }

  /**
   * @stable [12.02.2019]
   * @param {IMultiItemFileEntity | IEntity} entity
   * @param {number} index
   * @returns {string}
   */
  public getDefaultDndMessage(entity: IMultiItemFileEntity | IEntity, index: number): string {
    return nvl(this.defaultDndMessage, this.settings.messages.dndMessage);
  }

  /**
   * @stable [12.02.2019]
   * @param {IMultiItemFileEntity | IEntity} entity
   * @param {number} index
   * @returns {string}
   */
  public getCustomDndMessage(entity: IMultiItemFileEntity | IEntity, index: number): string {
    return ifNotNilThanValue(this.defaultDndMessageFactory, () => this.defaultDndMessageFactory(index));
  }

  /**
   * [<Placeholder: optional> + <Default DnD message>]
   *
   * @stable [22.12.2018]
   * @param {MultiItemEntityT} entityOrEntityId
   * @param {number} index
   * @returns {string}
   */
  public getPlaceholder(entityOrEntityId: MultiItemEntityT, index: number): string {
    return isFn(this.placeholderFactory)
      ? this.placeholderFactory(index)
      : this.t(this.placeholder);
  }

  /**
   * @stable [20.12.2018]
   * @returns {IEntity[]}
   */
  public getEntities(): IEntity[] {
    return [];
  }

  /**
   * @stable [11.02.2019]
   * @param {IMultiItemFileEntity | IEntity} entity
   * @param {number} index
   * @returns {boolean}
   */
  public canRenderAttachmentContent(entity: IMultiItemFileEntity | IEntity, index: number): boolean {
    return isFn(this.canRenderAttachment) ? this.canRenderAttachment(entity, index) : R.isNil(entity);
  }

  /**
   * @stable [22.12.2018]
   * @param {MultiItemEntityT} entityOrEntityId
   * @param {number} index
   * @returns {IVueBaseFileViewerProps}
   */
  public getViewerBindings(entityOrEntityId: MultiItemEntityT, index: number): IVueBaseFileViewerProps {
    const viewerProps = this.viewerProps;
    const multiItemEntity = entityOrEntityId as IMultiItemEntity;

    const props: IVueBaseFileViewerProps = {
      ...viewerProps,
      placeholder: this.getPlaceholder(entityOrEntityId, index),
      className: toClassName(
        this.toAttachmentContentClassName(entityOrEntityId, index),
        viewerProps && calc(viewerProps.className, multiItemEntity)
      ),
    };

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
      });
    }
    return {
      ...props,
      src: Reflect.get(multiItemEntity, this.displayName),
      entity: multiItemEntity,
    };
  }

  /**
   * @stable [16.12.2018]
   * @param {MultiItemEntityT} entityOrEntityId
   * @param {number} index
   * @returns {IVueViewerListenersEntity<File>}
   */
  public getViewerListeners(entityOrEntityId: IMultiItemEntity, index: number): IVueViewerListenersEntity<File> {
    return {
      change: (file: File) => this.onFileChange(entityOrEntityId, file, index),
      remove: () => this.removeFile(entityOrEntityId),
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
   * @stable [11.02.2019]
   * @param {MultiItemEntityT} entityOrEntityId
   * @param {number} index
   * @returns {string}
   */
  public getAttachmentContentClassName(entityOrEntityId: MultiItemEntityT, index: number): string {
    return toClassName(
      this.toAttachmentContentClassName(entityOrEntityId, index),
      !R.isNil(entityOrEntityId) && 'vue-field-attachment-content-with-entity'
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
          <div v-for="(entity, index) in getEntities()"
               class="vue-field-attachment-holder">
            <component v-if="entity"
                       ref="viewerRef"
                       :is="getViewerComponent(entity, index)"
                       v-on="getViewerListeners(entity, index)"
                       v-bind="getViewerBindings(entity, index)"/>
            <vue-flex-layout v-if="canRenderAttachmentContent(entity, index)"
                             :row="true"
                             :class="getAttachmentContentClassName(entity, index)">
                <vue-flex-layout v-if="getPlaceholder(entity, index)"
                                :justifyContentCenter="true"
                                :class="'vue-field-attachment-placeholder vue-field-attachment-placeholder-' + index">
                    {{getPlaceholder(entity, index)}}
                </vue-flex-layout>
                <vue-flex-layout :class="'vue-field-attachment-dnd-message vue-field-attachment-dnd-message-' + index"
                                 :full="!getPlaceholder(entity, index)">
                    <vue-dnd :defaultMessage="getDefaultDndMessage(entity, index)"
                             :customMessage="getCustomDndMessage(entity, index)"
                             @select="onFilesSelect($event, entity, index)"/>
                </vue-flex-layout>
            </vue-flex-layout>
          </div>
       </div>`
    );
  }

  /**
   * @stable [10.12.2018]
   * @returns {TMethods}
   */
  protected getTemplateMethods<TMethods extends IVueBaseFileFieldTemplateMethods>(): TMethods {
    return {
      ...super.getTemplateMethods(),
      onFilesSelect: this.onFilesSelect,
      getEntities: this.getEntities,
      getDefaultDndMessage: this.getDefaultDndMessage,
      getCustomDndMessage: this.getCustomDndMessage,
      getAttachmentContentClassName: this.getAttachmentContentClassName,
      getPlaceholder: this.getPlaceholder,
      getViewerComponent: this.getViewerComponent,
      getViewerListeners: this.getViewerListeners,
      getViewerBindings: this.getViewerBindings,
      canRenderAttachmentContent: this.canRenderAttachmentContent,
    } as TMethods;
  }

  protected getFileFormat(): AnyT {
    let fileFormatValue;
    return isDef(this.bindStore) && !R.isNil(fileFormatValue = this.bindStore[this.displayFileFormat])
      ? fileFormatValue
      : this.getValue();
  }

  /**
   * @stable [19.01.2019]
   * @param {string} type
   * @returns {string}
   */
  protected toViewer(type: string): string {
    switch (type) {
      case 'application/pdf':
        return VUE_PDF_FILE_VIEWER_NAME;
    }
    return this.viewer;
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
   * @stable [27.02.2019]
   * @param {IMultiItemFileEntity | IEntity} entity
   * @param {File} file
   * @param {number} index
   */
  private onFileChange(entity: IMultiItemFileEntity | IEntity, file: File, index?: number): void {
    const newFileUrl = this.toFileUrl(file);
    if ((entity as IMultiItemFileEntity).newEntity) {
      this.replaceFile(entity, file, newFileUrl, index);
    } else {
      this.editFile(entity, file, newFileUrl, index);
    }
  }

  private getFileName(): AnyT {
    let fileNameValue;
    return isDef(this.bindStore) && !R.isNil(fileNameValue = this.bindStore[this.displayFileName])
      ? fileNameValue
      : this.getValue();
  }

  /**
   * @stable [11.02.2019]
   * @param {MultiItemEntityT} entityOrEntityId
   * @param {number} index
   * @returns {string}
   */
  private toAttachmentContentClassName(entityOrEntityId: MultiItemEntityT, index: number): string {
    return toClassName(
      'vue-field-attachment-content',
      this.getPlaceholder(entityOrEntityId, index) && ' vue-field-attachment-content-with-placeholder'
    );
  }

  /**
   * @stable [27.02.2019]
   * @param {IMultiItemFileEntity} entity
   * @param {File} file
   * @param {string} fileUrl
   * @param {number} index
   */
  private replaceFile(entity: IMultiItemFileEntity, file: File, fileUrl: string, index?: number): void {
    this.removeFile(entity);
    this.$nextTick(() => this.addFile(file, fileUrl, index));  // Next tick <=> Flux Cycle
  }

  /**
   * @stable [27.02.2019]
   * @param {File} file
   * @param {string} fileUrl
   * @param {number} index
   */
  private addFile(file: File, fileUrl: string, index?: number): void {
    this.multiFieldPlugin.onAddItem({
      id: fileUrl,
      rawData: toType<IMultiItemFileEntity>({
        id: fileUrl,
        newEntity: true,
        type: file.type,
        name: file.name,
        index,
      }),
    });
  }

  /**
   * @stable [27.02.2019]
   * @param {IMultiItemFileEntity} entity
   * @param {File} file
   * @param {string} fileUrl
   * @param {number} index
   */
  private editFile(entity: IMultiItemFileEntity, file: File, fileUrl: string, index?: number): void {
    this.multiFieldPlugin.onEditItem({
      id: entity.id,
      name: this.displayName,
      value: fileUrl,
      index,
    });
  }

  /**
   * @stable [11.02.2019]
   * @param {IMultiItemFileEntity | IEntity | EntityIdT} entity
   */
  private removeFile(entity: IMultiItemFileEntity | IEntity | EntityIdT): void {
    let url;
    let deletedEntity: IEntityIdTWrapper;
    if (isPrimitive(entity)) {
      const fileId = entity as EntityIdT;
      deletedEntity = {id: fileId};
      url = fileId as string;
    } else {
      const multiItemEntity = entity as IMultiItemEntity;
      deletedEntity = multiItemEntity;
      url = multiItemEntity.id as string;
    }
    this.multiFieldPlugin.onDeleteItem(deletedEntity);
    this.destroyFileUrl(url);
  }

  /**
   * @stable [27.02.2019]
   */
  private openViewerPopup(): void {
    this.$nextTick(() => {
      const viewer = (this.getChildrenRefs() as {viewerRef?: IVueViewer[]}).viewerRef[0];
      if (!R.isNil(viewer)) {
        viewer.onOpenPopup();
      }
    });
  }
}
