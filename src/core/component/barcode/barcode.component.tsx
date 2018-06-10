import * as React from 'react';
import * as JsBarcode from 'jsbarcode';
import * as R from 'ramda';

import { BaseComponent } from '../base';
import { toBarcode, uuid, defValuesFilter } from '../../util';
import { IBarcodeProps } from './barcode.interface';

export class Barcode extends BaseComponent<Barcode, IBarcodeProps> {

  private tagId = uuid(true);

  /**
   * @stable [11.06.2018]
   * @param {Readonly<IBarcodeProps>} prevProps
   * @param {Readonly<{}>} prevState
   */
  public componentDidUpdate(prevProps: Readonly<IBarcodeProps>, prevState: Readonly<{}>): void {
    super.componentDidUpdate(prevProps, prevState);

    if (!R.equals(this.props.barcode, prevProps.barcode)) {
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
    return (
      <svg id={this.tagId}/>
    );
  }

  /**
   * @stable [11.06.2018]
   */
  private refresh(): void {
    const props = this.props;
    JsBarcode(`#${this.tagId}`)
      .EAN13(toBarcode(props.barcode), defValuesFilter({
        height: props.height,
        fontSize: props.fontSize,
      }))
      .render();
  }
}
