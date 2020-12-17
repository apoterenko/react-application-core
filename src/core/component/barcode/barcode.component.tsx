import * as React from 'react';
import * as JsBarcode from 'jsbarcode';
import * as R from 'ramda';

import { GenericComponent } from '../base/generic.component';
import {
  CalcUtils,
  FilterUtils,
  NvlUtils,
  UuidUtils,
} from '../../util';
import { getBarcodeApplicableFormats } from './barcode.support';
import { IBarcodeProps } from './barcode.interface';
import {
  BARCODE_APPLICABLE_FORMATS,
  BarcodeClassesEnum,
  BarcodeFormatsEnum,
} from '../../definition';

export class Barcode extends GenericComponent<IBarcodeProps> {

  public static readonly defaultProps: IBarcodeProps = {
    format: BARCODE_APPLICABLE_FORMATS,
    filter: () => true,
  };

  private readonly uuid = UuidUtils.uuid(true);

  /**
   * @stable [03.11.2020]
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: Readonly<IBarcodeProps>, prevState: Readonly<{}>): void {
    if (!R.equals(this.originalProps, prevProps)) {
      this.refresh();
    }
  }

  /**
   * @stable [03.11.2020]
   */
  public componentDidMount(): void {
    this.refresh();
  }

  /**
   * @stable [17.12.2020]
   */
  public render(): JSX.Element {
    const {
      footer,
    } = this.originalProps;

    return (
      <React.Fragment>
        {
          this.validFormats
            .map((format, index) => (
              <div
                key={index}
                className={BarcodeClassesEnum.BARCODE}
              >
                {this.originalChildren}
                <svg
                  id={this.toId(format)}
                  className={BarcodeClassesEnum.DATA}/>
                {NvlUtils.nvl(CalcUtils.calc(footer, format), format)}
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
    const {
      barcode,
      fontSize,
      height,
    } = this.originalProps;

    const options = FilterUtils.defValuesFilter<IBarcodeProps, IBarcodeProps>({
      height,
      fontSize,
    }) as {};

    this.validFormats.forEach((format) => {
      const barcodeInstance = JsBarcode(`#${this.toId(format)}`);
      switch (format) {
        case BarcodeFormatsEnum.CODE128:
          barcodeInstance.CODE128(barcode, options).render();
          break;
        case BarcodeFormatsEnum.CODE39:
          barcodeInstance.CODE39(barcode, options).render();
          break;
        case BarcodeFormatsEnum.EAN8:
          barcodeInstance.EAN8(barcode, options).render();
          break;
        case BarcodeFormatsEnum.EAN13:
          barcodeInstance.EAN13(barcode, options).render();
          break;
        case BarcodeFormatsEnum.UPC:
          barcodeInstance.UPC(barcode, options).render();
          break;
      }
    });
  }

  /**
   * @stable [03.11.2020]
   * @param format
   * @private
   */
  private toId(format: BarcodeFormatsEnum): string {
    return `${this.uuid}-${format}`;
  }

  /**
   * @stable [10.04.2019]
   * @returns {BarcodeFormatsEnum[]}
   */
  private get validFormats(): BarcodeFormatsEnum[] {
    const props = this.props;
    const barcodeFormats = getBarcodeApplicableFormats(props.barcode, props.format);

    return barcodeFormats.filter((format) => props.filter(format, barcodeFormats));
  }
}
