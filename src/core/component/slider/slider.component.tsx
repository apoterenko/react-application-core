import * as React from 'react';
import * as noUiSlider from 'nouislider';

import {
  IPresetsMinMaxEntity,
  ISliderProps,
  ISliderState,
  SliderClassesEnum,
} from '../../definition';
import {
  ConditionUtils,
  NvlUtils,
} from '../../util';
import { UNDEF } from '../../definitions.interface';
import { GenericComponent } from '../base/generic.component';

/**
 * @component-impl
 * @stable [16.10.2020]
 */
export class Slider<TProps extends ISliderProps = ISliderProps,
  TState extends ISliderState = ISliderState>
  extends GenericComponent<TProps, TState> {

  public static readonly defaultProps: ISliderProps = {
    min: 0,
    max: 100,
  };

  private readonly attachmentRef = React.createRef<HTMLDivElement>();

  /**
   * @stable [16.10.2020]
   * @param originalProps
   */
  constructor(originalProps: TProps) {
    super(originalProps);

    this.state = {} as TState;
  }

  /**
   * @stable [16.10.2020]
   */
  public render(): JSX.Element {
    return (
      <div
        ref={this.actualRef}
        className={SliderClassesEnum.SLIDER}
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
    } = this.mergedProps;
    const minMaxEntity = this.minMaxEntity;

    const slider = noUiSlider.create(this.attachmentRef.current, {
      start: [NvlUtils.nvl(minMaxEntity.min, min), NvlUtils.nvl(minMaxEntity.max, max)],
      connect: true,
      range: {
        'max': max,
        'min': min,
      },
    });

    slider.on('change.one', (data) => this.onChangeValues(this.nc.asNumber(data[0]), this.nc.asNumber(data[1])));
    slider.on('update.one', (data) => this.onUpdateValues(this.nc.asNumber(data[0]), this.nc.asNumber(data[1])));
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

    return (
      <div>
        <span
          className={SliderClassesEnum.SLIDER_VALUE}
        >
          {minMaxEntity.min}
        </span>
        {this.separatorElement}
        <span
          className={SliderClassesEnum.SLIDER_VALUE}
        >
          {minMaxEntity.max}
        </span>
      </div>
    )
  }

  /**
   * @stable [15.10.2020]
   * @protected
   */
  protected get separatorElement(): JSX.Element {
    return (
      <React.Fragment>
        &nbsp;-&nbsp;
      </React.Fragment>
    );
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
  private onChangeValues(min: number, max: number): void {
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
