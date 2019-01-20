import {
  AnyT,
  ISrcWrapper,
  IPopupWrapper,
  IPreviewAttachmentWrapper,
  IEntity,
  IEntityWrapper,
  IPopupClassNameWrapper,
} from '../../definitions.interface';
import { IVueBaseProps } from '../base/vue-index';

/**
 * @stable [21.12.2018]
 */
export interface IVueViewerState extends IPopupWrapper {
}

/**
 * @stable [20.01.2019]
 */
export interface IVueViewerProps<TEntity extends IEntity = IEntity>
  extends IVueBaseProps,
          ISrcWrapper,
          IPopupClassNameWrapper<string | ((entity: TEntity) => string)>,
          IEntityWrapper<TEntity>,
          IPreviewAttachmentWrapper<string | ((entity: TEntity) => string)> {
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
