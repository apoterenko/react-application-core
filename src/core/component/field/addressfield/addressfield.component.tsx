import * as React from 'react';
import * as R from 'ramda';

import { AnyT } from '../../../definitions.interface';
import { IMenuItemEntity } from '../../../entities-definitions.interface';
import { IFieldActionConfiguration } from '../../../configurations-definitions.interface';
import {
  createGoogleMapsScript,
  orNull,
  DelayedTask,
  isGoogleMapsNamespaceExist,
  toAddress,
  orDefault,
} from '../../../util';
import { BasicTextField } from '../textfield';
import { IMenu, Menu } from '../../menu';
import { IUniversalDialog,  Dialog } from '../../dialog';
import { IAddressFieldState, IAddressFieldProps } from './addressfield.interface';

export class AddressField extends BasicTextField<AddressField, IAddressFieldProps, IAddressFieldState> {

  private autocomplete: google.maps.places.Autocomplete;
  private geocoder: google.maps.Geocoder;
  private marker: google.maps.Marker;
  private map: google.maps.Map;
  private clickEventListener: google.maps.MapsEventListener;
  private dbClickEventListener: google.maps.MapsEventListener;
  private dragEndEventListener: google.maps.MapsEventListener;
  private delayedTask: DelayedTask;

  /**
   * @stable [29.07.2018]
   * @param {IAddressFieldProps} props
   */
  constructor(props: IAddressFieldProps) {
    super(props);

    this.addMapAction();

    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.onPlaceChanged = this.onPlaceChanged.bind(this);
    this.onDialogClose = this.onDialogClose.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.changeValueManually = this.changeValueManually.bind(this);
    this.initGoogleMapsObjects = this.initGoogleMapsObjects.bind(this);

    this.delayedTask = new DelayedTask(this.openMenu, 200);
  }

  /**
   * @stable [29.07.2018]
   */
  public componentDidMount(): void {
    super.componentDidMount();

    if (isGoogleMapsNamespaceExist()) {
      this.initGoogleMapsObjects();
    } else {
      createGoogleMapsScript({onload: this.initGoogleMapsObjects});
    }
  }

  /**
   * @stable [30.07.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    this.geocoder = null;
    this.autocomplete = null;
    this.map = null;
    this.marker = null;

    this.delayedTask.stop();

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
   * @stable [29.07.2018]
   * @param {AnyT} event
   */
  public onChange(event: AnyT): void {
    super.onChange(event);

    this.setDefaultMarkerPosition();
    this.clearState();
  }

  protected getAttachment(): JSX.Element {
    const state = this.state;
    const messages = this.settings.messages;
    const currentPlace = state.place || this.value;

    return (
      <Dialog ref='dialog'
              title={messages.addressSelectionMessage}
              closeMessage={messages.closeMessage}
              acceptMessage={messages.acceptMessage}
              onClose={this.onDialogClose}
              onAccept={this.changeValueManually}>
        {
          orNull<JSX.Element>(
            currentPlace,
            () => <div className='rac-dialog-addressfield-place'>{currentPlace}</div>
          )
        }
        <div ref='map' style={{minHeight: 200}}/>
        <Menu ref='menu'
              renderToX={() => this.state.x + this.mapElement.offsetLeft}
              renderToY={() => this.state.y + this.mapElement.offsetTop}
              options={[{label: this.settings.messages.putMarkerHere, value: 1}]}
              onSelect={this.onMenuSelect}/>
      </Dialog>
    );
  }

  /**
   * @stable [29.07.2018]
   * @param {google.maps.GeocoderResult | google.maps.places.PlaceResult} place
   * @returns {string}
   */
  protected buildDestination(place: google.maps.GeocoderResult | google.maps.places.PlaceResult): string {
    return toAddress(place);
  }

  /**
   * @stable [29.07.2018]
   */
  private onPlaceChanged(): void {
    this.marker.setVisible(false);
    const place = this.autocomplete.getPlace();

    if (!place || !place.geometry) {
      return;
    }

    const placeAsString = this.buildDestination(place);
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    this.marker.setVisible(true);
    this.marker.setPosition(place.geometry.location);

    if (place.geometry.viewport) {
      this.map.fitBounds(place.geometry.viewport);
    } else {
      this.map.setCenter(place.geometry.location);
      this.map.setZoom(17);  // Google recommendation
    }

    this.setState({place: placeAsString, placeId: place.place_id, lat, lng});
    this.changeValueManually();
  }

  /**
   * @stable [29.07.2018]
   */
  private changeValueManually(): void {
    const state = this.state;
    this.onChangeManually(state.place);

    if (this.props.onChangePlace) {
      this.props.onChangePlace({lat: state.lat, lng: state.lng, placeId: state.placeId});
    }
  }

  /**
   * @stable [29.07.2018]
   */
  private clearState(): void {
    this.setState({place: null, placeId: null, lat: null, lng: null});
  }

  /**
   * @stable [30.07.2018]
   */
  private setDefaultMarkerPosition(): void {
    const defaultPosition = {lat: this.settings.googleMaps.lat, lng: this.settings.googleMaps.lng};

    this.marker.setVisible(false);
    this.marker.setPosition(defaultPosition);
    this.map.setCenter(defaultPosition);
  }

  /**
   * @stable [30.07.2018]
   */
  private initGoogleMapsObjects(): void {
    const props = this.props;
    const googleMapsSettings = this.settings.googleMaps;
    const lat = orDefault<number, number>(!R.isNil(props.lat), props.lat, googleMapsSettings.lat);
    const lng = orDefault<number, number>(!R.isNil(props.lng), props.lng, googleMapsSettings.lng);

    this.geocoder = new google.maps.Geocoder();
    this.autocomplete = new google.maps.places.Autocomplete(this.input as HTMLInputElement);
    this.map = new google.maps.Map(this.mapElement, {center: {lat, lng}, zoom: 13});
    this.marker = new google.maps.Marker({
      map: this.map,
      draggable: true,
      visible: !(R.isNil(props.lat) && R.isNil(props.lng)),
      anchorPoint: new google.maps.Point(0, -29),
      position: new google.maps.LatLng(lat, lng),
    });

    this.autocomplete.bindTo('bounds', this.map);
    this.autocomplete.addListener('place_changed', this.onPlaceChanged);

    this.clickEventListener = google.maps.event.addListener(
      this.map,
      'click',
      (event: { pixel: google.maps.Point, latLng: google.maps.LatLng }) =>
        this.delayedTask.start({x: event.pixel.x, y: event.pixel.y, lat: event.latLng.lat(), lng: event.latLng.lng()}));
    this.dbClickEventListener = google.maps.event.addListener(this.map, 'dblclick', () => this.delayedTask.stop());
    this.dragEndEventListener = google.maps.event.addListener(this.marker, 'dragend', () => this.onMarkerDragEnd());
  }

  /**
   * @stable [30.07.2018]
   */
  private onMarkerDragEnd(): void {
    const position = this.marker.getPosition();
    this.updateGeocodeInfo(position.lat(), position.lng());
  }

  /**
   * @stable [30.07.2018]
   */
  private onDialogClose(): void {
    this.clearState();
  }

  private onMenuSelect(option: IMenuItemEntity): void {
    // TODO
    this.updateMarkerPosition();
  }

  /**
   * @stable [30.07.2018]
   */
  private updateMarkerPosition() {
    const state = this.state;
    const lat = state.lat;
    const lng = state.lng;

    this.marker.setPosition({lat, lng});
    this.marker.setVisible(true);

    this.updateGeocodeInfo(lat, lng);
  }

  /**
   * @stable [30.07.2018]
   * @param {number} lat
   * @param {number} lng
   */
  private updateGeocodeInfo(lat: number, lng: number): void {
    this.geocoder.geocode({location: {lat, lng}}, (geocoderResults: google.maps.GeocoderResult[]) => {
      if (Array.isArray(geocoderResults) && geocoderResults.length > 0) {
        // TODO unmount
        const place = geocoderResults[0];
        const placeAsString = this.buildDestination(place);
        this.setState({place: placeAsString, placeId: place.place_id});
      }
    });
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
   * @param {IAddressFieldState} nextState
   */
  private openMenu(nextState: IAddressFieldState) {
    this.setState(nextState); // Need to update state according to a cursor position
    this.menu.show();
  }

  /**
   * @stable [30.07.2018]
   */
  private openDialog(): void {
    this.dialog.activate();
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
