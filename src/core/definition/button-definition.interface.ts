import {
  IDisabledWrapper,
  IMiniWrapper,
  IProgressWrapper,
  IErrorMessageWrapper,
  IProgressMessageWrapper,
  IFullWrapper,
  IIconWrapper,
  IOutlinedWrapper,
  IRaisedWrapper,
  ISimpleWrapper,
  IStringToWrapper,
  ITextWrapper,
  ITypeWrapper,
  IBlockWrapper,
  IBooleanIconLeftWrapper,
  IBooleanSmallWrapper,
  IBooleanSuccessWrapper,
  IBooleanTransparentWrapper,
  IBorderedWrapper,
  IDefaultOnPressWrapper,
  IIconStyleWrapper,
  IKeyValue,
  ILargeWrapper,
  IRoundedWrapper,
  IStyleWrapper,
  ITextStyleWrapper,
  AnyT,
  IOnClickWrapper,
} from '../definitions.interface';
import { IErrorEntity } from './error-definition.interface';
import {
  IReactComponentConfiguration,
  IWebComponentConfiguration,
} from '../configurations-definitions.interface';

/**
 * @cross-platform
 * @stable [13.02.2019]
 */
export interface IGenericButtonEntity
  extends IErrorEntity,
    IProgressWrapper,
    IDisabledWrapper,
    IProgressMessageWrapper,
    IErrorMessageWrapper,
    ITextWrapper,
    IFullWrapper,
    IMiniWrapper,
    IIconWrapper<string | boolean> {
}

// TODO Total typings refactoring
export interface IReactButtonConfiguration
  extends IReactComponentConfiguration,
    IOnClickWrapper<(event: AnyT) => void> {
}

export interface IReactButtonProps extends IReactButtonConfiguration,
                                               IGenericButtonEntity {
}

export interface IButtonProps
  extends IReactButtonProps,
    IWebComponentConfiguration,
    IOutlinedWrapper,
    IStringToWrapper,
    IRaisedWrapper,
    ISimpleWrapper,
    ITypeWrapper {
  iconCls?: string; // TODO
  rippled?: boolean;
}

export interface IRnButtonConfiguration extends IReactButtonConfiguration,
  IBorderedWrapper,
  IRoundedWrapper,
  IBooleanSuccessWrapper,
  IBlockWrapper,
  IBooleanSmallWrapper,
  ILargeWrapper,
  IBooleanIconLeftWrapper,
  IBooleanTransparentWrapper,
  IIconStyleWrapper<IKeyValue>,
  ITextStyleWrapper<IKeyValue>,
  IStyleWrapper<IKeyValue>,
  IDefaultOnPressWrapper {
}

export interface IRnButtonProps extends IGenericButtonEntity,
  IRnButtonConfiguration {
}
