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
  ClsUtils,
  ConditionUtils,
  NvlUtils,
  ObjectUtils,
  PropsUtils,
} from '../../util';
import {
  IFromToEntity,
  StringNumberT,
  UNDEF,
} from '../../definitions.interface';
import { GenericComponent } from '../base/generic.component';
import { NumberField } from '../field/numberfield/numberfield.component';

/**
 * @component-impl
 * @stable [03.07.2021]
 */
export class Slider extends GenericComponent<ISliderProps, ISliderState> {

  public static readonly defaultProps: ISliderProps = {
    ...DefaultEntities.SLIDER_ENTITY,
  };

  private readonly attachmentRef = React.createRef<HTMLDivElement>();
  private slider;
  private silent = false;

  /**
   * @stable [02.07.2021]
   * @param originalProps
   */
  constructor(originalProps: Readonly<ISliderProps>) {
    super(originalProps);

    this.state = {};

    this.onFromValueChange = this.onFromValueChange.bind(this);
    this.onToValueChange = this.onToValueChange.bind(this);
  }

  /**
   * @stable [02.07.2021]
   */
  public render(): JSX.Element {
    const mergedProps = this.mergedProps;

    return (
      <div
        ref={this.actualRef}
        className={
          ClsUtils.joinClassName(
            SliderClassesEnum.SLIDER,
            this.getOriginalClassName(mergedProps)
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
   * @stable [02.07.2021]
   */
  public componentDidMount(): void {
    const {
      max,
      min,
      step,
    } = this.mergedProps;
    const fromToEntity = this.fromToEntity;

    this.slider = noUiSlider.create(this.attachmentRef.current, {
      start: [NvlUtils.nvl(fromToEntity.from, min), NvlUtils.nvl(fromToEntity.to, max)],
      connect: true,
      step,
      range: {
        'max': max,
        'min': min,
      },
    });

    this.doSubscribeEvents();
  }

  /**
   * @stable [02.07.2021]
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: Readonly<ISliderProps>, prevState: Readonly<ISliderState>): void {
    const currentValue = this.currentValue;

    if (ObjectUtils.isCurrentValueNotEqualPreviousValue(currentValue, prevProps.value)) {
      this.doSliderUpdate(currentValue.min, currentValue.max);
    }
  }

  /**
   * @stable [02.07.2021]
   */
  public componentWillUnmount(): void {
    this.slider = null;
  }

  /**
   * @stable [02.07.2021]
   */
  protected getComponentSettingsProps(): Readonly<ISliderProps> {
    return PropsUtils.extendProps(
      super.getComponentSettingsProps(),
      this.componentsSettings?.slider
    );
  }

  /**
   * @stable [02.07.2021]
   */
  private get valuesElement(): JSX.Element {
    const fromToEntity = this.fromToEntity;
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
          value={fromToEntity.from}
          onChange={this.onFromValueChange}/>
        <NumberField
          errorMessageRendered={false}
          full={false}
          {...fieldConfiguration}
          value={fromToEntity.to}
          onChange={this.onToValueChange}/>
      </div>
    )
  }

  /**
   * @stable [03.07.2021]
   * @param fromValue
   * @param toValue
   */
  private doSliderUpdate(fromValue: StringNumberT, toValue: StringNumberT): void {
    this.silent = true;                         // To prevent the events broadcasting: change.one + update.one
                                                // Don't use a call "this.slider.off" (!!!)
    this.slider.set([fromValue, toValue]);
    this.silent = false;
  }

  /**
   * @stable [03.07.2021]
   */
  private doSubscribeEvents(): void {
    this.slider.on('change.one', (data) => this.onChangeValues(this.nc.asNumber(data[0]), this.nc.asNumber(data[1])));
    this.slider.on('update.one', (data) => this.onUpdateValues(this.nc.asNumber(data[0]), this.nc.asNumber(data[1])));
  }

  /**
   * @stable [02.07.2021]
   * @param value
   */
  private onFromValueChange(value: StringNumberT): void {
    this.onFromToValueChange(value, this.fromToEntity.to);
  }

  /**
   * @stable [02.07.2021]
   * @param value
   */
  private onToValueChange(value: StringNumberT): void {
    this.onFromToValueChange(this.fromToEntity.from, value);
  }

  /**
   * @stable [02.07.2021]
   * @param fromValue
   * @param toValue
   */
  private onFromToValueChange(fromValue: StringNumberT, toValue: StringNumberT): void {
    this.doSliderUpdate(fromValue, toValue);
    this.onChangeValues(fromValue, toValue);
  }

  /**
   * @stable [02.07.2021]
   * @param from
   * @param to
   */
  private onUpdateValues(from: number, to: number): void {
    if (this.silent) {
      return;
    }
    this.setState({from, to});
  }

  /**
   * @stable [02.07.2021]
   * @param min
   * @param max
   */
  private onChangeValues(min: StringNumberT, max: StringNumberT): void {
    if (this.silent) {
      return;
    }
    this.setState({from: UNDEF, to: UNDEF}, () => this.onChangeManually({min, max}));
  }

  /**
   * @stable [02.07.2021]
   * @param entity
   */
  private onChangeManually(entity: IPresetsMinMaxEntity): void {
    ConditionUtils.ifFnThanValue(this.originalProps.onChange, (onChange) => onChange(entity));
  }

  /**
   * @stable [02.07.2021]
   */
  private get fromToEntity(): IFromToEntity<number> {
    const {
      from,
      to,
    } = this.state;
    const currentValue = this.currentValue;

    return {
      from: NvlUtils.nvl(from, currentValue?.min),
      to: NvlUtils.nvl(to, currentValue?.max),
    };
  }

  /**
   * @stable [02.07.2021]
   */
  private get currentValue(): IPresetsMinMaxEntity {
    return this.originalProps.value;
  }
}
