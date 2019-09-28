import {
  IBlockWrapper,
  IBooleanIconLeftWrapper,
  IBooleanTransparentWrapper,
  IBorderedWrapper,
  IDefaultOnPressWrapper,
  IDisabledWrapper,
  IErrorMessageWrapper,
  IFullWrapper,
  IIconStyleWrapper,
  IIconWrapper,
  IKeyValue,
  ILargeWrapper,
  IMiniWrapper,
  IOnClickWrapper,
  IOutlinedWrapper,
  IProgressMessageWrapper,
  IProgressWrapper,
  IRaisedWrapper,
  IRippledWrapper,
  IRoundedWrapper,
  ISmallWrapper,
  IStyleWrapper,
  ISuccessWrapper,
  ITextStyleWrapper,
  ITextWrapper,
  IToWrapper,
  ITypeWrapper,
} from '../definitions.interface';
import { IErrorEntity } from './error-definition.interface';
import { IUniversalComponentEntity } from './component-definition.interface';
import { IComponentProps } from './props-definition.interface';

/**
 * @cross-platform
 * @stable [13.02.2019]
 */
export interface IGenericButtonEntity
  extends IDisabledWrapper,
    IErrorEntity,
    IErrorMessageWrapper,
    IFullWrapper,
    IIconWrapper<string | boolean>,
    IMiniWrapper,
    IOutlinedWrapper,
    IProgressMessageWrapper,
    IProgressWrapper,
    IRaisedWrapper,
    IRippledWrapper,
    ITextWrapper,
    IToWrapper,
    ITypeWrapper<'button' | 'submit' | 'reset'> {
}

/**
 * @stable [27.09.2019]
 */
export interface IButtonEntity
  extends IGenericButtonEntity,
    IOnClickWrapper {
}

/**
 * @stable [27.09.2019]
 */
export interface IButtonProps
  extends IComponentProps,
    IButtonEntity {
}

export interface IRnButtonEntity
  extends IUniversalComponentEntity,
    IBorderedWrapper,
    IRoundedWrapper,
    ISuccessWrapper,
    IBlockWrapper,
    ISmallWrapper,
    ILargeWrapper,
    IBooleanIconLeftWrapper,
    IBooleanTransparentWrapper,
    IIconStyleWrapper<IKeyValue>,
    ITextStyleWrapper<IKeyValue>,
    IStyleWrapper<IKeyValue>,
    IDefaultOnPressWrapper {
}

export interface IRnButtonProps
  extends IGenericButtonEntity,
    IRnButtonEntity {
}
