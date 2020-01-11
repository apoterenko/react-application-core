import * as React from 'react';
import * as R from 'ramda';
import * as Promise from 'bluebird';

import { AnyT } from '../../../definitions.interface';
import {
  IDialog,
  IGoogleMapsMenuItemEntity,
  IPlaceEntity,
} from '../../../definition';
import { orNull, asPlaceEntityFormattedName, uuid, asPlaceEntity, toClassName, isPlaceActionRendered } from '../../../util';
import { BaseTextField } from '../textfield';
import { Dialog } from '../../dialog';
import {
  IAddressFieldState,
  IAddressFieldProps,
} from './addressfield.interface';
import {
  GoogleMaps,
  IGoogleMapsMarkerChangePlaceEntity,
} from '../../google';

export class AddressField extends BaseTextField<IAddressFieldProps, IAddressFieldState> {

  public static defaultProps: IAddressFieldProps = {
    placeholder: ' ',   // Need to replace a google input placeholder
  };

  private static readonly ADDRESS_MARKER = uuid();

  private autocomplete: google.maps.places.Autocomplete;
  private geoCoderTask: Promise<google.maps.GeocoderResult[]>;

  // Don't need to save this values to React State, because UI doesn't use these bindings !!
  private lat: number;
  private lng: number;
  private placeId: string;
  private placeEntity: IPlaceEntity;
  private readonly dialogRef = React.createRef<Dialog<AnyT>>();

  /**
   * @stable [29.07.2018]
   * @param {IAddressFieldProps} props
   */
  constructor(props: IAddressFieldProps) {
    super(props);

    if (isPlaceActionRendered(props)) {
      this.defaultActions = [
        ...this.defaultActions,
        {type: 'location_on', onClick: () => this.dialog.activate()}
      ];
    }

    this.initGoogleMapsObjects = this.initGoogleMapsObjects.bind(this);
    this.onDialogAccept = this.onDialogAccept.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.onMarkerChangePlace = this.onMarkerChangePlace.bind(this);
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);

    // Don't need to save this values to React State, because UI doesn't use these bindings !!
    // => Need to initialize the internal "state" manually
    this.lat = props.lat;
    this.lng = props.lng;
  }

  /**
   * @stable [30.07.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.cancelGeoCoderTaskIfPending();

    if (!R.isNil(this.autocomplete)) {
      this.autocomplete.set('place', null);
      this.autocomplete.unbindAll();
      this.autocomplete = null;
    }

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
  protected getAttachmentElement(): JSX.Element {
    const state = this.state;
    const messages = this.settings.messages;
    const currentPlace = R.isNil(state.place) ? this.value : state.place;

    return (
      <Dialog ref={this.dialogRef}
              acceptDisabled={!this.isPlaceChanged}
              closeMessage={messages.closeMessage}
              acceptMessage={messages.acceptMessage}
              onClose={this.onDialogClose}
              onAccept={this.onDialogAccept}>
        {orNull<JSX.Element>(
          currentPlace, () => <div className='rac-address-field-dialog-place'>{currentPlace}</div>)
        }
        <GoogleMaps
          ref='googleMaps'
          className='rac-dialog-google-maps'
          onInit={this.initGoogleMapsObjects}
          onSelect={this.onMenuSelect}
          onChangePlace={this.onMarkerChangePlace}
          menuOptions={[{
          //  label: this.settings.messages.putMarkerHereMessage,
          //  value: GoogleMapsMarkerActionsEnum.PUT_MARKER_HERE,
          }]}/>
      </Dialog>
    );
  }

  /**
   * @stable [01.08.2018]
   * @returns {string | number}
   */
  protected buildValue(): string | number {
    if (this.props.useZipCode) {
      return this.placeEntity.zipCode;
    }
    return asPlaceEntityFormattedName(this.placeEntity);
  }

  /**
   * @stable [01.08.2018]
   * @param {string} value
   * @returns {string}
   */
  protected validateValue(value: string): string {
    if (this.props.notUseCustomValidator) {
      return null;
    }
    if (R.isNil(this.lat) && R.isNil(this.lng) && !R.isNil(value) && !R.isEmpty(value)) {
      return this.settings.messages.invalidAddressMessage;
    }
    return null;
  }

  /**
   * @stable [02.05.2019]
   * @returns {string}
   */
  protected getFieldClassName(): string {
    return toClassName(super.getFieldClassName(), 'rac-address-field');
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
    this.placeEntity = asPlaceEntity(place);

    this.onChangeManually(this.buildValue());           // Emit event to update a component value
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

   /* if (props.onChangePlace) {
      props.onChangePlace({
        lat: this.lat,
        lng: this.lng,
        placeId: this.placeId,
        placeEntity: this.placeEntity,
      });
    }*/
  }

  /**
   * @stable [31.07.2018]
   */
  private initGoogleMapsObjects(): void {
    this.googleMaps.addMarker({draggable: true, position: null}, AddressField.ADDRESS_MARKER);

    if (this.autocomplete) {
      this.autocomplete.unbindAll();
    }

    this.autocomplete = null;
    this.autocomplete.addListener('place_changed', this.onPlaceChanged);

    const props = this.props;
    const isMarkerVisible = !(R.isNil(props.lat) && R.isNil(props.lng));

    if (isMarkerVisible) {
      this.googleMaps.setMarkerState({
        marker: AddressField.ADDRESS_MARKER,
        visible: true,
        refreshMap: true,
        lat: props.lat,
        lng: props.lng,
        zoom: this.settings.googleMaps.prettyZoom,
      });
    } else {
      this.googleMaps.setMarkerState({
        marker: AddressField.ADDRESS_MARKER,
        visible: false,
        refreshMap: true,
      });
    }
  }

  /**
   * @stable [31.07.2018]
   * @param {IGoogleMapsMenuItemEntity} payload
   */
  private onMenuSelect(payload: IGoogleMapsMenuItemEntity): void {
    //
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

    // this.geoCoderTask = this.geoCoder.geocode({location: {lat: this.lat, lng: this.lng}})
   //   .then((geocoderResults) => this.onGeocodeInfoLoad(geocoderResults));
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
    this.placeEntity = asPlaceEntity(place);
    this.setState({place: this.buildValue()});
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
    delete this.placeEntity;
    this.setState({place: null});
  }

  /**
   * @stable [06.01.2020]
   * @returns {IDialog}
   */
  private get dialog(): IDialog {
    return this.dialogRef.current;
  }

  /**
   * @stable [31.07.2018]
   */
  private get googleMaps(): any {
    return this.refs.googleMaps;
  }
}
