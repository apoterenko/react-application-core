import { IVuePopup$Wrapper } from '../../vue-definitions.interface';

/**
 * @stable [29.11.2018]
 */
export interface IVueViewerStateEntity extends IVuePopup$Wrapper {
}

/**
 * @stable [29.11.2018]
 */
export interface IVueViewerTemplateMethodsEntity {
  getSrc?(): string;
  isPopupOpened?(): boolean;
  onOpenPopup?(): void;
  onClosePopup?(): void;
}

/**
 * @stable [27.11.2018]
 */
export const VUE_VIEWER_CHANGE_EVENT = 'change';
