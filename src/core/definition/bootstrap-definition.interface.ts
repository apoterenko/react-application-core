import {
  IApplyBodyMarkupWrapper,
  IDefineErrorHandlerWrapper,
  IFlexEnabledWrapper,
  IRootIdWrapper,
} from '../definitions.interface';

/**
 * @stable [27.05.2018]
 */
export interface IBootstrapEntity
  extends IApplyBodyMarkupWrapper,
    IFlexEnabledWrapper,
    IRootIdWrapper,
    IDefineErrorHandlerWrapper {
}

/**
 * @stable [27.05.2018]
 */
export const DEFAULT_BOOTSTRAP_ENTITY = Object.freeze<IBootstrapEntity>({
  rootId: 'root',
  applyBodyMarkup: true,
  defineErrorHandler: true,
});
