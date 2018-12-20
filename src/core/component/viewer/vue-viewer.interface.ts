import { AnyT, ISrcWrapper } from '../../definitions.interface';
import { IVuePopup$Wrapper } from '../../vue-definitions.interface';

/**
 * @stable [29.11.2018]
 */
export interface IVueViewerStateEntity extends IVuePopup$Wrapper {
}

/**
 * @stable [09.12.2018]
 */
export interface IVueViewerPropsEntity extends ISrcWrapper {
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
