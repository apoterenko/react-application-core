import {
  AnyT,
  ISrcWrapper,
  IPopupWrapper,
  IPreviewTemplateAttachmentWrapper,
} from '../../definitions.interface';

/**
 * @stable [21.12.2018]
 */
export interface IVueViewerState extends IPopupWrapper {
}

/**
 * @stable [21.12.2018]
 */
export interface IVueViewerProps extends ISrcWrapper,
                                         IPreviewTemplateAttachmentWrapper {
}

/**
 * @stable [29.11.2018]
 */
export interface IVueViewerTemplateMethodsEntity {
  getSrc?(): string;
  isPopupOpened?(): boolean;
  onOpenPopup?(): void;
  onClosePopup?(): void;
  onRemove?(): void;
}

/**
 * @stable [09.12.2018]
 */
export interface IVueViewerListenersEntity<TChangedValue = AnyT> {
  remove?(): void;
  change?(newValue: TChangedValue): void;
}

/**
 * @stable [27.11.2018]
 */
export const VUE_VIEWER_CHANGE_EVENT = 'change';
export const VUE_VIEWER_REMOVE_EVENT = 'remove';
