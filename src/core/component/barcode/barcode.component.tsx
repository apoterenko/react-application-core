import * as React from 'react';
import * as JsBarcode from 'jsbarcode';
import * as R from 'ramda';

import { BaseComponent } from '../base';
import { defValuesFilter, uuid, calc, nvl } from '../../util';
import { getBarcodeApplicableFormats } from './barcode.support';
import { IBarcodeProps, BarcodeFormatEnum, BARCODE_APPLICABLE_FORMATS } from './barcode.interface';

export class Barcode extends BaseComponent<IBarcodeProps> {

  public static readonly defaultProps: IBarcodeProps = {
    format: BARCODE_APPLICABLE_FORMATS,
    filter: () => true,
  };

  private readonly uuid = uuid(true);

  /**
   * @stable [11.06.2018]
   * @param {Readonly<IBarcodeProps>} prevProps
   * @param {Readonly<{}>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<IBarcodeProps>, prevState: Readonly<{}>): void {
    super.componentDidUpdate(prevProps, prevState);

    if (!R.equals(this.props, prevProps)) {
      this.refresh();
    }
  }

  /**
   * @stable [11.06.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();
    this.refresh();
  }

  /**
   * @stable [11.06.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <React.Fragment>
        {
          this.validFormats.map((format, index) => (
            <div
              key={index}
              className='rac-barcode'>
              {props.children}
              <svg id={this.toId(format)}/>
              {nvl(calc(props.footer, format), format)}
            </div>
          ))
        }
      </React.Fragment>
    );
  }

  /**
   * @stable [11.06.2018]
   */
  private refresh(): void {
    const props = this.props;
    const {barcode, height, fontSize} = props;
    const options = {
      // defValuesFilter returns frozen object but JsBarcode changes its
      ...defValuesFilter({
        height,
        fontSize,
      }),
    };
    this.validFormats.forEach((format) => {
      const barcodeInstance = JsBarcode(`#${this.toId(format)}`);
      switch (format) {
        case BarcodeFormatEnum.CODE128:
          barcodeInstance.CODE128(barcode, options).render();
          break;
        case BarcodeFormatEnum.CODE39:
          barcodeInstance.CODE39(barcode, options).render();
          break;
        case BarcodeFormatEnum.EAN8:
          barcodeInstance.EAN8(barcode, options).render();
          break;
        case BarcodeFormatEnum.EAN13:
          barcodeInstance.EAN13(barcode, options).render();
          break;
        case BarcodeFormatEnum.UPC:
          barcodeInstance.UPC(barcode, options).render();
          break;
      }
    });
  }

  /**
   * @stable [10.04.2019]
   * @param {BarcodeFormatEnum} format
   * @returns {string}
   */
  private toId(format: BarcodeFormatEnum): string {
    return `${this.uuid}-${format}`;
  }

  /**
   * @stable [10.04.2019]
   * @returns {BarcodeFormatEnum[]}
   */
  private get validFormats(): BarcodeFormatEnum[] {
    const props = this.props;
    const barcodeFormats = getBarcodeApplicableFormats(props.barcode, props.format);

    return barcodeFormats.filter((format) => props.filter(format, barcodeFormats));
  }
}
