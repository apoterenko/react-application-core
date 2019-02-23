import * as Promise from 'bluebird';
import * as React from 'react';
import * as R from 'ramda';

import { BaseComponent } from '../../base';
import { Menu, IMenu } from '../../menu';
import { getGoogleMapsScript, DelayedTask, uuid, isString, orNull, isDef } from '../../../util';
import { IGoogleMapsMarkerConfigEntity, IGoogleMapsProps } from './google-maps.interface';
import { IMenuItemEntity } from '../../../entities-definitions.interface';
import { IGoogleMaps } from './google-maps.interface';
import { FlexLayout } from '../../layout';

export class GoogleMaps extends BaseComponent<GoogleMaps, IGoogleMapsProps>
  implements IGoogleMaps {

  private map: google.maps.Map;
  private googleMapsScriptTask: Promise<void>;
  private delayedTask: DelayedTask;
  private clickEventListener: google.maps.MapsEventListener;
  private dbClickEventListener: google.maps.MapsEventListener;

  private x: number;
  private y: number;
  private lat: number;
  private lng: number;
  private markers = new Map<string, google.maps.Marker>();
  private markersDragListeners = new Map<string, google.maps.MapsEventListener>();

  /**
   * @stable [31.07.2018]
   * @param {IGoogleMapsProps} props
   */
  constructor(props: IGoogleMapsProps) {
    super(props);

    this.onMapClick = this.onMapClick.bind(this);
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.openMenu = this.openMenu.bind(this);
    this.initGoogleMapsObjects = this.initGoogleMapsObjects.bind(this);

    if (this.hasOptions) {
      this.delayedTask = new DelayedTask(this.openMenu, 200);
    }
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
   * @stable [31.07.2018]
   */
  public componentWillUnmount(): void {
    super.componentWillUnmount();

    if (isDef(this.delayedTask)) {
      this.delayedTask.stop();
    }
    this.cancelGoogleMapsScriptTaskIfPending();

    this.markersDragListeners.forEach((dragEndEventListener) => dragEndEventListener.remove());

    if (isDef(this.clickEventListener)) {
      this.clickEventListener.remove();
    }
    if (isDef(this.dbClickEventListener)) {
      this.dbClickEventListener.remove();
    }

    this.map = null;
    this.markers = null;
    this.delayedTask = null;
    this.googleMapsScriptTask = null;
    this.markersDragListeners = null;
  }

  /**
   * @stable [31.07.2018]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <FlexLayout className='rac-google-maps'>
        <div ref={this.getSelfRef()}
             className='rac-google-maps-map rac-flex-full'/>
        {
          orNull<JSX.Element>(
            this.hasOptions,
            () => (
              <Menu ref='menu'
                    renderToX={() => this.x + this.getSelf().offsetLeft}
                    renderToY={() => this.y + this.getSelf().offsetTop}
                    options={props.options}
                    onSelect={this.onMenuSelect}/>
            )
          )
        }
      </FlexLayout>
    );
  }

  /**
   * @stable [31.07.2018]
   * @param {google.maps.MarkerOptions} cfg
   * @param {string} name
   * @returns {google.maps.Marker}
   */
  public addMarker(cfg?: google.maps.MarkerOptions, name?: string): google.maps.Marker {
    const config: google.maps.MarkerOptions = {
      anchorPoint: new google.maps.Point(0, -29),
      position: null,
      ...cfg,
      map: this.map,
    };
    const markerId = name || uuid();
    const marker = new google.maps.Marker(config);
    this.markers.set(markerId, marker);

    if (config.draggable) {
      this.markersDragListeners.set(
        markerId,
        google.maps.event.addListener(marker, 'dragend', () => this.onMarkerDragEnd(markerId, marker))
      );
    }
    return marker;
  }

  /**
   * @stable [23.02.2019]
   * @param {IGoogleMapsMarkerConfigEntity} cfg
   */
  public setMarkerState(cfg: IGoogleMapsMarkerConfigEntity): void {
    const {
      marker,
      visibility,
      refreshMap,
      lat = this.settings.googleMaps.lat,
      lng = this.settings.googleMaps.lng,
      zoom = this.settings.googleMaps.zoom,
    } = cfg;

    const markerAsObject = isString(marker) ? this.markers.get(marker as string) : marker as google.maps.Marker;
    markerAsObject.setPosition({lat, lng});
    markerAsObject.setVisible(visibility);

    if (refreshMap) {
      this.map.setCenter({lat, lng});
      this.map.setZoom(zoom);
    }
  }

  /**
   * @stable [31.07.2018]
   * @param {string} markerId
   * @param {google.maps.Marker} marker
   */
  private onMarkerDragEnd(markerId: string, marker: google.maps.Marker): void {
    const position = marker.getPosition();
    const lat = position.lat();
    const lng = position.lng();

    const props = this.props;
    if (props.onChangePlace) {
      props.onChangePlace({name: markerId, item: marker, lat, lng});
    }
  }

  /**
   * @stable [31.07.2018]
   * @param {IMenuItemEntity} item
   */
  private onMenuSelect(item: IMenuItemEntity): void {
    const props = this.props;
    if (props.onSelect) {
      props.onSelect({item, lat: this.lat, lng: this.lng});
    }
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
   * @param {{x: number; y: number; lat: number; lng: number}} nextState
   */
  private openMenu(nextState: { x: number, y: number, lat: number, lng: number }) {
    Object.assign(this, nextState);   // We need to sync the internal state with a starting task state
    this.menu.show();
  }

  /**
   * @stable [31.07.2018]
   */
  private initGoogleMapsObjects(): void {
    this.map = new google.maps.Map(this.getSelf());

    if (this.hasOptions) {
      this.clickEventListener = google.maps.event.addListener(this.map, 'click', this.onMapClick);
      this.dbClickEventListener = google.maps.event.addListener(this.map, 'dblclick', () => this.delayedTask.stop());
    }

    const props = this.props;
    if (props.onInit) {
      props.onInit(this.map);
    }
  }

  /**
   * @stable [31.07.2018]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.refs.menu as IMenu;
  }

  /**
   * @stable [26.10.2018]
   * @returns {boolean}
   */
  private get hasOptions(): boolean {
    return !R.isNil(this.props.options);
  }
}
