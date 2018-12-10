import { toType } from '../../util';
import { ISrcWrapper, AnyT } from '../../definitions.interface';
import { IVuePopup$Wrapper, VueComponentOptionsT } from '../../vue-definitions.interface';
import { IVueComponent } from '../../vue-entities-definitions.interface';

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
 * @stable [09.12.2018]
 * @returns {{data(): void}}
 */
export const vueViewerComponentConfigFactory: () => VueComponentOptionsT = () => ({
  data() {
    return toType<IVueComponent>(this).getInitialData$();
  },
});

/**
 * @stable [27.11.2018]
 */
export const VUE_VIEWER_CHANGE_EVENT = 'change';
export const VUE_VIEWER_REMOVE_EVENT = 'remove';
