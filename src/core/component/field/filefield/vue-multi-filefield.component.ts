import { Component } from 'vue-property-decorator';
import * as R from 'ramda';

import { generateArray } from '../../../util';
import { IEntity, AnyT } from '../../../definitions.interface';
import { IMultiItemEntity } from '../../../entities-definitions.interface';
import { VueCreateElementFactoryT, VueNodeT } from '../../../vue-definitions.interface';
import { ComponentName } from '../../connector/vue-index';
import { toActualMultiItemEntities } from '../multifield/vue-index';
import { IVueFileFieldTemplateMethodsEntity } from './vue-filefield.interface';
import { VueBaseFileField } from './vue-base-filefield.component';

@ComponentName('vue-multi-file-field')
@Component
class VueMultiFileField extends VueBaseFileField implements IVueFileFieldTemplateMethodsEntity {

  /**
   * @stable [28.11.2018]
   */
  constructor() {
    super();
    this.getFiles = this.getFiles.bind(this);
  }

  /**
   * @stable [25.11.2018]
   * @param {VueCreateElementFactoryT} createElement
   * @returns {VueNodeT}
   */
  public render(createElement: VueCreateElementFactoryT): VueNodeT {
    return super.render(createElement);
  }

  /**
   * @stable [28.11.2018]
   * @param newValue
   * @param {AnyT} context
   */
  public onChangeManually(newValue, context?: AnyT): void {
    super.onChangeManually(newValue, context);
  }

  public getFiles(): IEntity[] {
    const totalFilesCount = 6;
    const relations = generateArray(totalFilesCount);
    const actualRelations = toActualMultiItemEntities(this.getValue());
    if (Array.isArray(actualRelations)) {
      const isFullFilled = actualRelations.length === totalFilesCount;
      const startIndex = isFullFilled ? 0 : 1;
      actualRelations.forEach((actualRelation, index) => {
        relations[index + startIndex] = actualRelation;
      });
    }
    return relations;
  }

  /**
   * @stable [27.11.2018]
   * @returns {string}
   */
  protected getFieldAttachmentTemplate(): string {
    return (
      `<div class="vue-field-attachment-wrapper">
          <template v-for="file in getFiles()">
            <component v-if="file"
                       :is="getViewerComponent()"
                       v-on="getViewerListeners(file)"
                       v-bind="getViewerBindings(file)"/>
            <vue-dnd v-if="!file"
                    :defaultMessage="getMessage()"
                    @select="onFilesSelect"/>
          </template>
       </div>`
    );
  }

  protected getTemplateMethods(): IVueFileFieldTemplateMethodsEntity {
    return {
      ...super.getTemplateMethods(),
      getViewerComponent: () => 'vue-cropper-viewer',
      getViewerListeners: (fileEntity: IMultiItemEntity) => ({
        change: (blob) => {
          const newFileUrl = URL.createObjectURL(blob);
          if (fileEntity.newEntity) {
            this.removeFile(fileEntity);
            this.$nextTick(() => this.addFile(newFileUrl));
          } else {
            this.multiFieldPlugin.onEditItem({id: fileEntity.id, name: this.displayName, value: newFileUrl});
          }
        },
        remove: () => this.removeFile(fileEntity),
      }),
      getViewerBindings: (relation: IMultiItemEntity) => {
        if (relation.newEntity) {
          return {src: relation.id as string};
        }
        const relationId = relation.id;
        if (R.isNil(relationId)) {
          return {};
        }
        const files = this.getFiles();
        const existedRelation = files.find((itm) => itm && itm.id === relationId);
        const fileUrl: string = R.isNil(existedRelation) ? relationId : Reflect.get(existedRelation, this.displayName);

        // TODO
        return R.isNil(fileUrl)
          ? {}
          : ({src: fileUrl.startsWith('blob:')
            ? fileUrl
            : 'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&h=350'});
      },
      getMessage: () => 'Drop files here',
      onFilesSelect: this.onFilesSelect,
      getFiles: this.getFiles,
    };
  }
}
