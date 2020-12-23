import * as React from 'react';
import * as noUiSlider from 'nouislider';

import {
  DefaultEntities,
  IPresetsMinMaxEntity,
  ISliderProps,
  ISliderState,
  SliderClassesEnum,
} from '../../definition';
import {
  CalcUtils,
  ClsUtils,
  ConditionUtils,
  NvlUtils,
} from '../../util';
import {
  StringNumberT,
  UNDEF,
} from '../../definitions.interface';
import { GenericComponent } from '../base/generic.component';
import { NumberField } from '../field/numberfield/numberfield.component';

/**
 * @component-impl
 * @stable [16.10.2020]
 */
export class Slider<TProps extends ISliderProps = ISliderProps,
  TState extends ISliderState = ISliderState>
  extends GenericComponent<TProps, TState> {

  public static readonly defaultProps: ISliderProps = {
    ...DefaultEntities.SLIDER_ENTITY,
  };

  private readonly attachmentRef = React.createRef<HTMLDivElement>();
  private slider;

  /**
   * @stable [16.10.2020]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.state = {} as TState;

    this.onMaxValueChange = this.onMaxValueChange.bind(this);
    this.onMinValueChange = this.onMinValueChange.bind(this);
  }

  /**
   * @stable [16.10.2020]
   */
  public render(): JSX.Element {
    const {
      className,
    } = this.originalProps;

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            SliderClassesEnum.SLIDER,
            CalcUtils.calc(className)
          )
        }
      >
        {this.valuesElement}
        <div
          ref={this.attachmentRef}/>
      </div>
    );
  }

  /**
   * @stable [16.10.2020]
   */
  public componentDidMount(): void {
    const {
      max,
      min,
      step,
    } = this.mergedProps;
    const minMaxEntity = this.minMaxEntity;

    this.slider = noUiSlider.create(this.attachmentRef.current, {
      start: [NvlUtils.nvl(minMaxEntity.min, min), NvlUtils.nvl(minMaxEntity.max, max)],
      connect: true,
      step,
      range: {
        'max': max,
        'min': min,
      },
    });

    this.slider.on('change.one', (data) => this.onChangeValues(this.nc.asNumber(data[0]), this.nc.asNumber(data[1])));
    this.slider.on('update.one', (data) => this.onUpdateValues(this.nc.asNumber(data[0]), this.nc.asNumber(data[1])));
  }

  /**
   * @stable [16.10.2020]
   */
  public componentWillUnmount(): void {
    this.slider = null;
  }

  /**
   * @stable [16.10.2020]
   * @protected
   */
  protected get componentsSettingsProps(): TProps {
    return this.componentsSettings.slider as TProps;
  }

  /**
   * @stable [15.10.2020]
   * @protected
   */
  protected get valuesElement(): JSX.Element {
    const minMaxEntity = this.minMaxEntity;
    const {
      fieldConfiguration,
    } = this.mergedProps;

    return (
      <div
        className={SliderClassesEnum.SLIDER_FIELDS_WRAPPER}
      >
        <NumberField
          errorMessageRendered={false}
          full={false}
          {...fieldConfiguration}
          value={minMaxEntity.min}
          onChange={this.onMinValueChange}/>
        <NumberField
          errorMessageRendered={false}
          full={false}
          {...fieldConfiguration}
          value={minMaxEntity.max}
          onChange={this.onMaxValueChange}/>
      </div>
    )
  }

  /**
   * @stable [16.10.2020]
   * @protected
   */
  protected get minMaxEntity(): IPresetsMinMaxEntity {
    const {
      max,
      min,
    } = this.state;

    let minValue = min;
    let maxValue = max;

    ConditionUtils.ifNotNilThanValue(
      this.currentValue,
      ($value) => {
        minValue = NvlUtils.nvl(minValue, $value.min);
        maxValue = NvlUtils.nvl(maxValue, $value.max);
      }
    );

    return {
      max: maxValue,
      min: minValue,
    };
  }

  /**
   * @stable [15.10.2020]
   * @param min
   * @param max
   * @private
   */
  private onChangeValues(min: StringNumberT, max: StringNumberT): void {
    this.setState(
      {
        min: UNDEF,
        max: UNDEF,
      },
      () => this.onChangeManually({min, max})
    );
  }

  /**
   * @stable [16.10.2020]
   * @param value
   * @private
   */
  private onMinValueChange(value: StringNumberT): void {
    const min = value;
    const max = this.minMaxEntity.max;

    this.slider.set([min, max]);
    this.onChangeValues(min, max);
  }

  /**
   * @stable [16.10.2020]
   * @param value
   * @private
   */
  private onMaxValueChange(value: StringNumberT): void {
    const min = this.minMaxEntity.min;
    const max = value;

    this.slider.set([min, max]);
    this.onChangeValues(min, max);
  }

  /**
   * @stable [16.10.2020]
   * @param entity
   * @private
   */
  private onChangeManually(entity: IPresetsMinMaxEntity): void {
    ConditionUtils.ifNotNilThanValue(this.originalProps.onChange, (onChange) => onChange(entity));
  }

  /**
   * @stable [15.10.2020]
   * @param min
   * @param max
   * @private
   */
  private onUpdateValues(min: number, max: number): void {
    this.setState({min, max});
  }

  /**
   * @stable [15.10.2020]
   * @private
   */
  private get currentValue(): IPresetsMinMaxEntity {
    return this.originalProps.value;
  }
}
