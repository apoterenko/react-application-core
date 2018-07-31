import * as React from 'react';
import * as R from 'ramda';
import * as Promise from 'bluebird';

import { AnyT } from '../../../definitions.interface';
import { IFieldActionConfiguration } from '../../../configurations-definitions.interface';
import { orNull, toAddress, uuid, toPlace } from '../../../util';
import { BasicTextField } from '../textfield';
import { IUniversalDialog,  Dialog } from '../../dialog';
import {
  IAddressFieldState,
  IAddressFieldProps,
  AddressMapMarkerActionEnum,
} from './addressfield.interface';
import { DI_TYPES, lazyInject } from '../../../di';
import { IGeoCoder } from '../../../google';
import {
  GoogleMaps,
  IGoogleMapsSelectEntity,
  IGoogleMaps,
  IGoogleMapsMarkerChangePlaceEntity,
} from '../../google';

export class AddressField extends BasicTextField<AddressField, IAddressFieldProps, IAddressFieldState> {

  public static defaultProps: IAddressFieldProps = {
    placeholder: ' ',   // Need to replace a google input placeholder
  };

  private static readonly ADDRESS_MARKER = uuid();

  private autocomplete: google.maps.places.Autocomplete;
  private geoCoderTask: Promise<google.maps.GeocoderResult[]>;

  private lat: number;
  private lng: number;
  private zipCode: number;
  private placeId: string;

  @lazyInject(DI_TYPES.GeoCoder) private geoCoder: IGeoCoder;

  /**
   * @stable [29.07.2018]
   * @param {IAddressFieldProps} props
   */
  constructor(props: IAddressFieldProps) {
    super(props);

    if (!props.notUsePlaceAction) {
      this.addMapAction();
    }

    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.onMarkerChangePlace = this.onMarkerChangePlace.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.onDialogAccept = this.onDialogAccept.bind(this);
    this.initGoogleMapsObjects = this.initGoogleMapsObjects.bind(this);
  }

  /**
   * @stable [30.07.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.cancelGeoCoderTaskIfPending();

    this.autocomplete = null;
    this.geoCoderTask = null;
    this.clearInternalVariables();
  }

  /**
   * @stable [30.07.2018]
   * @param {AnyT} event
   */
  public onChange(event: AnyT): void {
    this.resetAllStateOnChangeOrClearValue();
    super.onChange(event);
  }

  /**
   * @stable [30.07.2018]
   */
  public clearValue(): void {
    this.resetAllStateOnChangeOrClearValue();
    super.clearValue();
  }

  /**
   * @stable [31.07.2018]
   * @returns {JSX.Element}
   */
  protected getAttachment(): JSX.Element {
    const state = this.state;
    const messages = this.settings.messages;
    const currentPlace = R.isNil(state.place) ? this.value : state.place;

    return (
      <Dialog ref='dialog'
              title={messages.addressSelectionMessage}
              acceptDisabled={!this.isPlaceChanged}
              closeMessage={messages.closeMessage}
              acceptMessage={messages.acceptMessage}
              onClose={this.onDialogClose}
              onAccept={this.onDialogAccept}>
        {orNull<JSX.Element>(
          currentPlace, () => <div className='rac-dialog-addressfield-place'>{currentPlace}</div>)
        }
        <GoogleMaps ref='googleMaps'
                    onInit={this.initGoogleMapsObjects}
                    onSelect={this.onMenuSelect}
                    onChangePlace={this.onMarkerChangePlace}
                    options={[{
                      label: this.settings.messages.putMarkerHereMessage,
                      value: AddressMapMarkerActionEnum.PUT_MARKER_HERE,
                    }]}/>
      </Dialog>
    );
  }

  /**
   * @stable [30.07.2018]
   * @param {google.maps.GeocoderResult | google.maps.places.PlaceResult} place
   * @returns {string}
   */
  protected buildValue(place: google.maps.GeocoderResult | google.maps.places.PlaceResult): string | number {
    if (this.props.useZipCode) {
      return toPlace(place).zipCode;
    }
    return toAddress(place);
  }

  /**
   * @stable [31.07.2018]
   * @param {string} value
   * @returns {string}
   */
  protected validateValue(value: string): string {
    return R.isNil(this.placeId)
      && !R.isNil(value)
      && !R.isEmpty(value) ? this.settings.messages.invalidAddressMessage : null;
  }

  /**
   * @stable [31.07.2018]
   */
  private onPlaceChanged(): void {
    const place = this.autocomplete.getPlace();
    if (!place || !place.geometry) {
      this.clearInternalVariables();                    // Clear the internal variables if error
      return;
    }

    this.lat = place.geometry.location.lat();
    this.lng = place.geometry.location.lng();
    this.placeId = place.place_id;
    this.zipCode = toPlace(place).zipCode;

    this.onChangeManually(this.buildValue(place));      // Emit event to update a component value
    this.propsChangePlace();                            // Emit event to update a side values
  }

  /**
   * @stable [31.07.2018]
   */
  private onDialogAccept(): void {
    this.onChangeManually(this.state.place);  // Emit event to update a component value
    this.propsChangePlace();                  // Emit event to update a side values
    this.clearInternalVariables();            // Clear the internal variables
  }

  /**
   * @stable [31.07.2018]
   */
  private onDialogClose(): void {
    this.clearInternalVariables();            // Clear the internal variables
  }

  /**
   * @stable [31.07.2018]
   */
  private propsChangePlace(): void {
    const props = this.props;

    if (props.onChangePlace) {
      props.onChangePlace({lat: this.lat, lng: this.lng, placeId: this.placeId, zipCode: this.zipCode});
    }
  }

  /**
   * @stable [31.07.2018]
   */
  private initGoogleMapsObjects(): void {
    this.googleMaps.addMarker({draggable: true, position: null}, AddressField.ADDRESS_MARKER);

    this.autocomplete = new google.maps.places.Autocomplete(this.input as HTMLInputElement);
    this.autocomplete.addListener('place_changed', this.onPlaceChanged);
  }

  /**
   * @stable [31.07.2018]
   * @param {IGoogleMapsSelectEntity} payload
   */
  private onMenuSelect(payload: IGoogleMapsSelectEntity): void {
    this.lat = payload.lat;
    this.lng = payload.lng;

    switch (payload.item.value) {
      case AddressMapMarkerActionEnum.PUT_MARKER_HERE:
        this.googleMaps.setMarkerState(AddressField.ADDRESS_MARKER, true, false, this.lat, this.lng);
        this.updateGeocodeInfo();
        break;
    }
  }

  /**
   * @stable [31.07.2018]
   * @param {IGoogleMapsMarkerChangePlaceEntity} place
   */
  private onMarkerChangePlace(place: IGoogleMapsMarkerChangePlaceEntity): void {
    this.lat = place.lat;
    this.lng = place.lng;
    this.updateGeocodeInfo();
  }

  /**
   * @stable [30.07.2018]
   * @returns {boolean}
   */
  private get isPlaceChanged(): boolean {
    return !R.isNil(this.state.place);
  }

  /**
   * @stable [31.07.2018]
   */
  private updateGeocodeInfo(): void {
    this.cancelGeoCoderTaskIfPending();

    this.geoCoderTask = this.geoCoder.geocode({location: {lat: this.lat, lng: this.lng}})
      .then((geocoderResults) => this.onGeocodeInfoLoad(geocoderResults));
  }

  /**
   * @stable [31.07.2018]
   */
  private cancelGeoCoderTaskIfPending(): void {
    this.cancelTaskIfPending(this.geoCoderTask);
  }

  /**
   * @stable [31.07.2018]
   */
  private cancelTaskIfPending<TResult = void>(promise: Promise<TResult>): void {
    if (promise && promise.isPending()) {
      promise.cancel();
    }
  }

  /**
   * @stable [31.07.2018]
   * @param {google.maps.GeocoderResult[]} geocoderResults
   * @returns {google.maps.GeocoderResult[]}
   */
  private onGeocodeInfoLoad(geocoderResults: google.maps.GeocoderResult[]): google.maps.GeocoderResult[] {
    if (!Array.isArray(geocoderResults) || geocoderResults.length === 0) {
      return null;
    }
    const place = geocoderResults[0];
    this.placeId = place.place_id;
    this.zipCode = toPlace(place).zipCode;
    this.setState({place: this.buildValue(place)});
    return geocoderResults;
  }

  /**
   * @stable [31.07.2018]
   */
  private resetAllStateOnChangeOrClearValue(): void {
    this.clearInternalVariables();
    this.propsChangePlace();
  }

  /**
   * @stable [30.07.2018]
   */
  private clearInternalVariables(): void {
    delete this.lat;
    delete this.lng;
    delete this.placeId;
    delete this.zipCode;
    this.setState({place: null});
  }

  /**
   * @stable [29.07.2018]
   */
  private addMapAction(): void {
    const this0 = this;

    this.defaultActions = R.insert<IFieldActionConfiguration>(
      0,
      {
        type: 'location_on',
        onClick() {
          this0.openDialog();
        },
      },
      this.defaultActions
    );
  }

  /**
   * @stable [30.07.2018]
   */
  private openDialog(): void {
    this.dialog.activate();

    const props = this.props;
    const isMarkerVisible = !(R.isNil(props.lat) && R.isNil(props.lng));

    if (isMarkerVisible) {
      this.googleMaps.setMarkerState(
        AddressField.ADDRESS_MARKER, true, true, props.lat, props.lng, this.settings.googleMaps.prettyZoom
      );
    } else {
      this.googleMaps.setMarkerState(AddressField.ADDRESS_MARKER, false, true);
    }
  }

  /**
   * @stable [29.07.2018]
   * @returns {IUniversalDialog}
   */
  private get dialog(): IUniversalDialog {
    return this.refs.dialog as IUniversalDialog;
  }

  /**
   * @stable [31.07.2018]
   * @returns {IGoogleMaps}
   */
  private get googleMaps(): IGoogleMaps {
    return this.refs.googleMaps as IGoogleMaps;
  }
}
