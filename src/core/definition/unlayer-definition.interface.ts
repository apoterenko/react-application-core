import {
  IKeyValue,
  INameWrapper,
  IValueWrapper,
} from '../definitions.interface';

/**
 * @stable [31.03.2021]
 */
export interface IUnlayerEditorMergeTagsItemEntity
  extends INameWrapper,
    IValueWrapper<string> {
  mergeTags?: IUnlayerEditorMergeTagsEntity;
}

/**
 * https://docs.unlayer.com/docs/merge-tags
 *
 * @entity
 * @stable [26.03.2021]
 */
export interface IUnlayerEditorMergeTagsEntity
  extends Record<string, IUnlayerEditorMergeTagsItemEntity> {
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
  loadBlank(): void;
  loadDesign(design: IUnlayerEditorDesignEntity): void;
  registerCallback(callbackName: string, callback: (params: IKeyValue, done: (cfg: IKeyValue) => void) => void): void;
}
