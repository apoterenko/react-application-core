import {
  IKeyValue,
} from '../definitions.interface';

/**
 * @entity
 * @stable [26.03.2021]
 */
export interface IUnlayerEditorMergeTagsEntity
  extends IKeyValue {
}

/**
 * @entity
 * @stable [26.03.2021]
 */
export interface IUnlayerEditorDesignEntity
  extends IKeyValue {
}

/**
 * @stable [26.03.2021]
 */
export interface IUnlayerEditorMetaEntity {
  design: IUnlayerEditorDesignEntity;
}

/**
 * @stable [26.03.2021]
 */
export interface IUnlayerEditorEntity {
  exportHtml(callback: (data: IUnlayerEditorMetaEntity) => void): void;
  loadDesign(design: IUnlayerEditorDesignEntity);
}
