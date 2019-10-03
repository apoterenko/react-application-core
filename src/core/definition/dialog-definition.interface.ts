import {
  IAcceptableWrapper,
  IActivateWrapper,
  IClosableWrapper,
} from '../definitions.interface';
import { IUniversalComponent } from './component-definition.interface';
import { IUniversalComponentProps } from './props-definition.interface';

/**
 * @stable [03.10.2019]
 */
export interface IGenericDialogEntity
  extends IClosableWrapper,
    IAcceptableWrapper {
}

/**
 * @react-native-compatible
 * @stable [03.10.2019]
 */
export interface IUniversalDialog<TProps extends IUniversalComponentProps = IUniversalComponentProps, TState = {}>
  extends IUniversalComponent<TProps, TState>,
    IClosableWrapper,
    IAcceptableWrapper,
    IActivateWrapper {
}
