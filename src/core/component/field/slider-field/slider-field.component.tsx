import * as React from 'react';

import { Field } from '../field/field.component';
import {
  DefaultEntities,
  IFieldInputProps,
  ISliderFieldProps,
  ISliderFieldState,
  ISliderProps,
  SliderFieldClassesEnum,
} from '../../../definition';
import {
  ClsUtils,
  PropsUtils,
} from '../../../util';
import { Slider } from '../../slider';

/**
 * @component-impl
 * @stable [16.10.2020]
 */
export class SliderField<TProps extends ISliderFieldProps = ISliderFieldProps,
  TState extends ISliderFieldState = ISliderFieldState>
  extends Field<TProps, TState> {

  public static readonly defaultProps = PropsUtils.mergeWithParentDefaultProps<ISliderProps>({
    ...DefaultEntities.SLIDER_ENTITY,
  }, Field);

  /**
   * @stable [16.10.2020]
   * @protected
   */
  protected get attachmentBodyElement(): JSX.Element {
    const {
      max,
      min,
      step,
    } = this.mergedProps;

    return (
      <Slider
        max={max}
        min={min}
        step={step}
        value={this.value}
        onChange={this.onChangeManually}/>
    );
  }

  /**
   * @stable [16.10.2020]
   * @protected
   */
  protected getInputElementProps(): IFieldInputProps {
    return {
      ...super.getInputElementProps() as IFieldInputProps,
      type: 'hidden',
    };
  }

  /**
   * @stable [16.10.2020]
   * @protected
   */
  protected getComponentsSettingsProps(): TProps {
    return PropsUtils.mergeWithSystemProps<TProps>(
      super.getComponentsSettingsProps(),
      this.componentsSettings.sliderField as TProps
    );
  }

  /**
   * @stale [16.10.2020]
   * @protected
   */
  protected getFieldClassName(): string {
    return ClsUtils.joinClassName(
      super.getFieldClassName(),
      SliderFieldClassesEnum.SLIDER_FIELD
    );
  }
}
