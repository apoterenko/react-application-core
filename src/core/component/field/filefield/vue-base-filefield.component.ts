import { Prop } from 'vue-property-decorator';

import { orDefault } from '../../../util';
import { VueField } from '../field/vue-index';
import { MultiFieldPlugin } from '../multifield/vue-index';
import { IMultiItemEntity } from '../../../entities-definitions.interface';

export class VueBaseFileField extends VueField {

  @Prop({default: (): string => 'hidden'}) protected type: string;
  protected multiFieldPlugin = new MultiFieldPlugin(this);
  private cachedFiles = new Set<string>();

  /**
   * @stable [27.11.2018]
   */
  constructor() {
    super();
    this.onFilesSelect = this.onFilesSelect.bind(this);
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
      this.cachedFiles.add(url);
      this.addFile(url);  // TODO Need to many files handling
      return url;
    });
  }

  /**
   * @stable [17.11.2018]
   * @returns {string}
   */
  protected getInputClassName(): string {
    return `${super.getInputClassName()} rac-flex-full`;
  }

  /**
   * @stable [28.11.2018]
   * @returns {string}
   */
  protected getFieldAttachmentTemplate(): string {
    return orDefault<string, string>(
      this.hasValue(),
      () => (
        `<component :is="getViewerComponent()"
                    v-on="getViewerListeners()"
                    v-bind="getViewerBindings()"/>`
      ),
      () => (
        `<vue-dnd :defaultMessage="getMessage()"
                  @select="onFilesSelect"/>`
      )
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
}
