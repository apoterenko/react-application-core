import * as React from 'react';
import * as R from 'ramda';
import * as Promise from 'bluebird';

import { AnyT } from '../../../definitions.interface';
import { IMenuItemEntity } from '../../../entities-definitions.interface';
import { IFieldActionConfiguration } from '../../../configurations-definitions.interface';
import {
  getGoogleMapsScript,
  orNull,
  DelayedTask,
  toAddress,
} from '../../../util';
import { BasicTextField } from '../textfield';
import { IMenu, Menu } from '../../menu';
import { IUniversalDialog,  Dialog } from '../../dialog';
import {
  IAddressFieldState,
  IAddressFieldProps,
  AddressMapMarkerActionEnum,
} from './addressfield.interface';
import { DI_TYPES, lazyInject } from '../../../di';
import { IGeoCoder } from '../../../google';

export class AddressField extends BasicTextField<AddressField, IAddressFieldProps, IAddressFieldState> {

  public static defaultProps: IAddressFieldProps = {
    placeholder: ' ',   // Need to replace a google input placeholder
  };

  private autocomplete: google.maps.places.Autocomplete;
  private marker: google.maps.Marker;
  private map: google.maps.Map;
  private clickEventListener: google.maps.MapsEventListener;
  private dbClickEventListener: google.maps.MapsEventListener;
  private dragEndEventListener: google.maps.MapsEventListener;
  private delayedTask: DelayedTask;
  private geoCoderTask: Promise<google.maps.GeocoderResult[]>;
  private googleMapsScriptTask: Promise<void>;

  private x: number;
  private y: number;
  private lat: number;
  private lng: number;
  private placeId: string;

  @lazyInject(DI_TYPES.GeoCoder) private geoCoder: IGeoCoder;

  /**
   * @stable [29.07.2018]
   * @param {IAddressFieldProps} props
   */
  constructor(props: IAddressFieldProps) {
    super(props);

    this.addMapAction();

    this.onMapClick = this.onMapClick.bind(this);
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.onDialogAccept = this.onDialogAccept.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.initGoogleMapsObjects = this.initGoogleMapsObjects.bind(this);

    this.delayedTask = new DelayedTask(this.openMenu, 200);
  }

  /**
   * @stable [31.07.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    // We cannot cancel the original promise, because of it is shared
    this.googleMapsScriptTask = new Promise<HTMLScriptElement>((resolve, reject) => getGoogleMapsScript().then(resolve, reject))
      .then(this.initGoogleMapsObjects);
  }

  /**
   * @stable [30.07.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.delayedTask.stop();
    this.cancelGeoCoderTaskIfPending();
    this.cancelGoogleMapsScriptTaskIfPending();

    this.autocomplete = null;
    this.map = null;
    this.marker = null;
    this.geoCoderTask = null;
    this.delayedTask = null;
    this.clearInternalVariables();

    if (this.clickEventListener) {
      this.clickEventListener.remove();
    }
    if (this.dbClickEventListener) {
      this.dbClickEventListener.remove();
    }
    if (this.dragEndEventListener) {
      this.dragEndEventListener.remove();
    }
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
   * @stable [30.07.2018]
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
        {
          orNull<JSX.Element>(
            currentPlace,
            () => <div className='rac-dialog-addressfield-place'>{currentPlace}</div>
          )
        }
        <div ref='map'
             className='rac-dialog-addressfield-map'/>
        <Menu ref='menu'
              renderToX={() => this.x + this.mapElement.offsetLeft}
              renderToY={() => this.y + this.mapElement.offsetTop}
              options={[{
                label: this.settings.messages.putMarkerHereMessage,
                value: AddressMapMarkerActionEnum.PUT_MARKER_HERE,
              }]}
              onSelect={this.onMenuSelect}/>
      </Dialog>
    );
  }

  /**
   * @stable [30.07.2018]
   * @param {google.maps.GeocoderResult | google.maps.places.PlaceResult} place
   * @returns {string}
   */
  protected buildValue(place: google.maps.GeocoderResult | google.maps.places.PlaceResult): string {
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
      props.onChangePlace({lat: this.lat, lng: this.lng, placeId: this.placeId});
    }
  }

  /**
   * @stable [31.07.2018]
   */
  private initGoogleMapsObjects(): void {
    this.map = new google.maps.Map(this.mapElement);
    this.marker = new google.maps.Marker({map: this.map, draggable: true, anchorPoint: new google.maps.Point(0, -29), position: null});

    this.autocomplete = new google.maps.places.Autocomplete(this.input as HTMLInputElement);
    this.autocomplete.bindTo('bounds', this.map);
    this.autocomplete.addListener('place_changed', this.onPlaceChanged);

    this.clickEventListener = google.maps.event.addListener(this.map, 'click', this.onMapClick);
    this.dbClickEventListener = google.maps.event.addListener(this.map, 'dblclick', () => this.delayedTask.stop());
    this.dragEndEventListener = google.maps.event.addListener(this.marker, 'dragend', () => this.onMarkerDragEnd());
  }

  /**
   * @stable [31.07.2018]
   * @param {{pixel: google.maps.Point; latLng: google.maps.LatLng}} event
   */
  private onMapClick(event: { pixel: google.maps.Point, latLng: google.maps.LatLng }): void {
    if (event.pixel) {
      const x = event.pixel.x;
      const y = event.pixel.y;
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      this.delayedTask.start({x, y, lat, lng});
    }
  }

  /**
   * @stable [30.07.2018]
   */
  private onMarkerDragEnd(): void {
    const position = this.marker.getPosition();
    this.lat = position.lat();
    this.lng = position.lng();
    this.updateGeocodeInfo();
  }

  /**
   * @stable [30.07.2018]
   * @param {IMenuItemEntity} option
   */
  private onMenuSelect(option: IMenuItemEntity): void {
    switch (option.value) {
      case AddressMapMarkerActionEnum.PUT_MARKER_HERE:
        this.updateMarkerState(true, false, this.lat, this.lng);
        this.updateGeocodeInfo();
        break;
    }
  }

  /**
   * @stable [30.07.2018]
   * @param {boolean} markerVisibility
   * @param {boolean} changeMapState
   * @param {number} lat
   * @param {number} lng
   * @param {number} zoom
   */
  private updateMarkerState(markerVisibility: boolean,
                            changeMapState: boolean,
                            lat = this.settings.googleMaps.lat,
                            lng = this.settings.googleMaps.lng,
                            zoom = this.settings.googleMaps.zoom): void {
    this.marker.setPosition({lat, lng});
    this.marker.setVisible(markerVisibility);

    if (changeMapState) {
      this.map.setCenter({lat, lng});
      this.map.setZoom(zoom);
    }
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
  private cancelGoogleMapsScriptTaskIfPending(): void {
    this.cancelTaskIfPending(this.googleMapsScriptTask);
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
      return;
    }
    const place = geocoderResults[0];
    this.placeId = place.place_id;
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
    delete this.x;
    delete this.y;
    delete this.lat;
    delete this.lng;
    delete this.placeId;
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
   * @param {{x: number; y: number; lat: number; lng: number}} nextState
   */
  private openMenu(nextState: { x: number, y: number, lat: number, lng: number }) {
    Object.assign(this, nextState);   // We need to sync the internal state with a starting task state
    this.menu.show();
  }

  /**
   * @stable [30.07.2018]
   */
  private openDialog(): void {
    this.dialog.activate();

    const props = this.props;
    const isMarkerVisible = !(R.isNil(props.lat) && R.isNil(props.lng));

    if (isMarkerVisible) {
      this.updateMarkerState(true, true, props.lat, props.lng, this.settings.googleMaps.prettyZoom);
    } else {
      this.updateMarkerState(false, true);
    }
  }

  /**
   * @stable [29.07.2018]
   * @returns {HTMLElement}
   */
  private get mapElement(): HTMLElement {
    return this.refs.map as HTMLElement;
  }

  /**
   * @stable [29.07.2018]
   * @returns {IUniversalDialog}
   */
  private get dialog(): IUniversalDialog {
    return this.refs.dialog as IUniversalDialog;
  }

  /**
   * @stable [29.07.2018]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }
}
