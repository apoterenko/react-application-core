import * as React from 'react';
import * as R from 'ramda';
import * as BPromise from 'bluebird';

import { Menu } from '../../menu';
import {
  CalcUtils,
  DelayedTask,
  EVENT_VALUE_PREDICATE,
  ifNotEmptyThanValue,
  ifNotNilThanValue,
  isArrayNotEmpty,
  joinClassName,
  nvl,
  ObjectUtils,
  orNull,
  TypeUtils,
  uuid,
} from '../../../util';
import {
  AsyncLibsEnum,
  EventsEnum,
  GoogleMapsMapTypesEnum,
  IGoogleMaps,
  IGoogleMapsEventEntity,
  IGoogleMapsHeatMapLayerConfigEntity,
  IGoogleMapsMarkerConfigEntity,
  IGoogleMapsMarkerPlaceEventEntity,
  IGoogleMapsMenuContextEntity,
  IGoogleMapsProps,
  IGoogleMapsSettingsEntity,
  ILatLngEntity,
  IMenu,
  IPresetsMenuItemEntity,
} from '../../../definition';
import { GenericComponent } from '../../base/generic.component';

export class GoogleMaps extends GenericComponent<IGoogleMapsProps>
  implements IGoogleMaps,
    IGoogleMapsMenuContextEntity {

  public event: Event;
  public lat: number;
  public lng: number;

  private clickEventListener: google.maps.MapsEventListener;
  private dbClickEventListener: google.maps.MapsEventListener;
  private googleMapsLibTask: BPromise<void>;
  private heatMapLayer: google.maps.visualization.HeatmapLayer;
  private map: google.maps.Map;
  private markers = new Map<string, google.maps.Marker>();
  private markersListeners = new Map<string, google.maps.MapsEventListener[]>();
  private openMenuTask: DelayedTask;
  private readonly menuRef = React.createRef<Menu>();
  private wheelListenerUnsubscriber: () => void;
  private directionsService: google.maps.DirectionsService;

  /**
   * @stable [10.01.2020]
   * @param {IGoogleMapsProps} props
   */
  constructor(props: IGoogleMapsProps) {
    super(props);

    this.addHeatMapLayer = this.addHeatMapLayer.bind(this);
    this.onGoogleMapsReady = this.onGoogleMapsReady.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
    this.onMapDbClick = this.onMapDbClick.bind(this);
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMenuSelect = this.onMenuSelect.bind(this);
    this.openMenu = this.openMenu.bind(this);

    if (this.haveMenuOptions) {
      this.openMenuTask = new DelayedTask(this.openMenu, 200); // Double click issue
    }
  }

  /**
   * @stable [22.01.2020]
   * @returns {JSX.Element}
   */
  public render(): JSX.Element {
    const props = this.props;
    return (
      <div
        style={props.style}
        className={joinClassName('rac-google-maps', CalcUtils.calc(props.className))}
      >
        <div
          ref={this.actualRef}
          className='rac-google-maps__body'/>
        {this.menuElement}
      </div>
    );
  }

  /**
   * @stable [09.01.2020]
   */
  public componentDidMount(): void {
    this.googleMapsLibTask = this.asyncLibManager
      .waitForLib<BPromise<HTMLScriptElement>>({alias: AsyncLibsEnum.GOOGLE_MAPS})
      .then(() => this.onGoogleMapsReady());

    // It seems google doesn't stop mouse wheel propagate event.
    this.wheelListenerUnsubscriber = this.domAccessor.captureEvent({
      eventName: EventsEnum.WHEEL,
      element: this.actualRef.current,
      callback: this.domAccessor.cancelEvent,
    });
  }

  /**
   * @stable [22.01.2020]
   */
  public componentWillUnmount(): void {
    if (TypeUtils.isFn(this.wheelListenerUnsubscriber)) {
      this.wheelListenerUnsubscriber();
      this.wheelListenerUnsubscriber = null;
    }
    ifNotNilThanValue(
      this.openMenuTask,
      (task) => {
        task.stop();
        this.openMenuTask = null;
      }
    );

    this.cancelGoogleMapsLibTask();
    this.unbindListeners();

    this.markers = null;
    this.markersListeners = null;
    this.event = null;
  }

  /**
   * @stable [22.01.2020]
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

    if (config.clickable) {
      this.addMakerListener('click', markerId, marker, (event) => this.onMarkerClick(event, markerId, marker));
    }
    if (config.draggable) {
      this.addMakerListener('dragend', markerId, marker, (event) => this.onMarkerDragEnd(event, markerId, marker));
    }
    return marker;
  }

  /**
   * @stable [03.03.2020]
   * @param {string} name
   */
  public removeMarker(name: string): void {
    ifNotNilThanValue(
      this.markers.get(name),
      (marker) => {
        marker.unbindAll();
        marker.setMap(null);
        this.markers.delete(name);
      }
    );
  }

  /**
   * @stable [10.01.2020]
   * @param {IGoogleMapsMarkerConfigEntity} cfg
   */
  public refreshMarker(cfg: IGoogleMapsMarkerConfigEntity): void {
    const {
      marker,
      visible = true,
      refreshMap,
      lat = this.mapsSettings.lat,
      lng = this.mapsSettings.lng,
      zoom = this.mapsSettings.zoom,
    } = cfg;

    const markerAsObject = TypeUtils.isString(marker)
      ? this.markers.get(marker as string)
      : marker as google.maps.Marker;

    markerAsObject.setPosition({lat, lng});
    markerAsObject.setVisible(visible);

    if (refreshMap) {
      this.refreshMap({lat, lng}, zoom);
    }
  }

  /**
   * @stable [23.02.2020]
   */
  public addPolyline(polylineCfg: google.maps.PolylineOptions): google.maps.Polyline {
    const polylineConfig: google.maps.PolylineOptions = {
      strokeWeight: 2,
      ...polylineCfg,
    };

    const polyline = new google.maps.Polyline(polylineConfig);
    polyline.setMap(this.map);

    return polyline;
  }

  /**
   * @stable [23.02.2020]
   */
  public addDirectionPolyline(directionCfg: google.maps.DirectionsRequest, polylineCfg: google.maps.PolylineOptions, ): void {
    const directionConfig: google.maps.DirectionsRequest = {
      travelMode: google.maps.TravelMode.DRIVING,
      ...directionCfg,
    };

    this.directionsService.route(directionConfig, (result, status) => {
      // TODO Convert to Promise (to cancel)
      if (status === google.maps.DirectionsStatus.OK) {
        this.addPolyline({
          path: result.routes[0].overview_path,
          ...polylineCfg,
        });
      } else {
        throw new Error(`google.maps.DirectionsService request error, status code: ${status}`);
      }
    });
  }

  /**
   * @stable [04.03.2019]
   * @param {IGoogleMapsHeatMapLayerConfigEntity} cfg
   */
  public addHeatMapLayer(cfg: IGoogleMapsHeatMapLayerConfigEntity): void {
    const {points} = cfg;
    const isArrayOfPointsNotEmpty = isArrayNotEmpty(points);

    if (isArrayOfPointsNotEmpty) {
      this.heatMapLayer = new google.maps.visualization.HeatmapLayer({
        map: this.map,
        data: points.map((point) => new google.maps.LatLng(point.lat, point.lng)),
      });
    }
    if (cfg.refreshMap) {
      this.refreshMap(
        isArrayOfPointsNotEmpty ? points[0] : this.mapsSettings,
        nvl(cfg.zoom, this.mapsSettings.zoom)
      );
    }
  }

  /**
   * @stable [20.02.2020]
   */
  public fitBounds(bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
                   padding?: number | google.maps.Padding) {
    this.map.fitBounds(bounds, padding);
  }

  /**
   * @stable [20.02.2020]
   */
  public getMarkers(): Map<string, google.maps.Marker> {
    return this.markers;
  }

  /**
   * @stable [29.03.2020]
   * @returns {boolean}
   */
  public get isInitialized(): boolean {
    return !R.isNil(this.map);
  }

  /**
   * @stable [22.01.2020]
   * @returns {JSX.Element}
   */
  private get menuElement(): JSX.Element {
    return orNull(
      this.haveMenuOptions,
      () => (
        <Menu
          ref={this.menuRef}
          inline={true}
          positionConfiguration={{event: () => this.event}}
          anchorElement={() => this.actualRef.current}
          options={this.props.menuOptions}
          onSelect={this.onMenuSelect}/>
      )
    );
  }

  /**
   * @stable [03.02.2020]
   * @param {IGoogleMapsEventEntity} event
   * @param {string} markerId
   * @param {google.maps.Marker} marker
   */
  private onMarkerDragEnd(event: IGoogleMapsEventEntity, markerId: string, marker: google.maps.Marker): void {
    const props = this.props;
    if (TypeUtils.isFn(props.onChangePlace)) {
      props.onChangePlace(this.asPlaceEventPayload(event, markerId, marker));
    }
  }

  /**
   * @stable [03.02.2020]
   * @param {IGoogleMapsEventEntity} event
   * @param {string} markerId
   * @param {google.maps.Marker} marker
   */
  private onMarkerClick(event: IGoogleMapsEventEntity, markerId: string, marker: google.maps.Marker): void {
    const props = this.props;
    if (TypeUtils.isFn(props.onClickPlace)) {
      props.onClickPlace(this.asPlaceEventPayload(event, markerId, marker));
    }
  }

  /**
   * @stable [03.02.2020]
   * @param {IGoogleMapsEventEntity} event
   * @param {string} markerId
   * @param {google.maps.Marker} marker
   * @returns {IGoogleMapsMarkerPlaceEventEntity}
   */
  private asPlaceEventPayload(event: IGoogleMapsEventEntity,
                              markerId: string,
                              marker: google.maps.Marker): IGoogleMapsMarkerPlaceEventEntity {
    const position = marker.getPosition();
    const lat = position.lat();
    const lng = position.lng();
    return {name: markerId, item: marker, lat, lng, event};
  }

  /**
   * @stable [10.01.2020]
   * @param {IPresetsMenuItemEntity} item
   */
  private onMenuSelect(item: IPresetsMenuItemEntity): void {
    const props = this.props;
    if (TypeUtils.isFn(props.onSelect)) {
      props.onSelect({item, lat: this.lat, lng: this.lng});
    }
  }

  /**
   * @stable [22.01.2020]
   * @param {IGoogleMapsEventEntity} payload
   */
  private onMapClick(payload: IGoogleMapsEventEntity): void {
    const props = this.props;

    ifNotNilThanValue(
      payload.pixel,
      () => {
        const event = R.find(EVENT_VALUE_PREDICATE, R.values(payload)) as MouseEvent;
        const lat = payload.latLng.lat();
        const lng = payload.latLng.lng();

        ifNotNilThanValue(
          this.openMenuTask,
          (openMenuTask) => openMenuTask.start<IGoogleMapsMenuContextEntity>({event, lat, lng})
        );
      }
    );

    if (TypeUtils.isFn(props.onClick)) {
      props.onClick(payload);
    }
  }

  /**
   * @stable [23.01.2020]
   * @param {IGoogleMapsEventEntity} event
   */
  private onMapDbClick(event: IGoogleMapsEventEntity): void {
    ifNotNilThanValue(this.openMenuTask, (openMenuTask) => openMenuTask.stop());
  }

  /**
   * @stable [10.01.2020]
   * @param {IGoogleMapsMenuContextEntity} context
   */
  private openMenu(context: IGoogleMapsMenuContextEntity) {
    this.event = context.event;
    this.lat = context.lat;
    this.lng = context.lng;

    this.menu.show();
  }

  /**
   * @stable [22.01.2020]
   */
  private onGoogleMapsReady(): void {
    const props = this.props;
    const {
      initialMarkers,
      options = {},
    } = props;

    // google.maps.MapTypeId enum is loaded as a lazy resource (within a lazy loaded script)
    const mapTypes = new Map();
    mapTypes.set(GoogleMapsMapTypesEnum.SATELLITE, google.maps.MapTypeId.SATELLITE);
    mapTypes.set(GoogleMapsMapTypesEnum.HYBRID, google.maps.MapTypeId.HYBRID);
    mapTypes.set(GoogleMapsMapTypesEnum.TERRAIN, google.maps.MapTypeId.TERRAIN);

    this.unbindListeners();

    this.map = new google.maps.Map(this.actualRef.current, {
      ...options,
      mapTypeId: mapTypes.get(options.mapTypeId) || google.maps.MapTypeId.ROADMAP,
    });

    this.directionsService = new google.maps.DirectionsService();
    this.clickEventListener = google.maps.event.addListener(this.map, 'click', this.onMapClick);
    this.dbClickEventListener = google.maps.event.addListener(this.map, 'dblclick', this.onMapDbClick);

    ifNotEmptyThanValue(
      initialMarkers,
      () => {
        initialMarkers.forEach((cfg, index) => {
          const marker = this.addMarker(cfg);
          const markerPosition = marker.getPosition();

          this.refreshMarker({
            marker,
            lat: markerPosition.lat(),
            lng: markerPosition.lng(),
            visible: true,
            refreshMap: initialMarkers.length - 1 === index,
          });
        });
      }
    );

    ifNotNilThanValue(props.onInit, (onInit) => onInit(this.map));
  }

  /**
   * @stable [04.03.2019]
   * @param {ILatLngEntity} latLng
   * @param {number} zoom
   */
  private refreshMap(latLng: ILatLngEntity, zoom: number): void {
    this.map.setCenter({lat: latLng.lat, lng: latLng.lng});
    this.map.setZoom(zoom);
  }

  /**
   * @stable [09.01.2020]
   */
  private cancelGoogleMapsLibTask(): void {
    this.asyncLibManager.cancelWaiting<BPromise<void>>(this.googleMapsLibTask);
    this.googleMapsLibTask = null;
  }

  /**
   * @stable [03.02.2020]
   * @param {string} eventName
   * @param {string} markerId
   * @param {google.maps.Marker} marker
   * @param {() => void} callback
   */
  private addMakerListener(eventName: string,
                           markerId: string,
                           marker: google.maps.Marker,
                           callback: (event: IGoogleMapsEventEntity) => void): void {
    let listeners = this.markersListeners.get(markerId);
    if (!Array.isArray(listeners)) {
      this.markersListeners.set(markerId, listeners = []);
    }
    listeners.push(google.maps.event.addListener(marker, eventName, callback));
  }

  /**
   * @stable [22.01.2020]
   */
  private unbindListeners(): void {
    this.markersListeners.forEach((listeners) => listeners.forEach((listener) => listener.remove()));
    this.markersListeners.clear();

    this.markers.forEach((marker) => marker.unbindAll());
    this.markers.clear();

    ifNotNilThanValue(
      this.clickEventListener,
      (listener) => {
        listener.remove();
        this.clickEventListener = null;
      }
    );
    ifNotNilThanValue(
      this.dbClickEventListener,
      (listener) => {
        listener.remove();
        this.dbClickEventListener = null;
      }
    );
    ifNotNilThanValue(
      this.heatMapLayer,
      (heatMapLayer) => {
        heatMapLayer.unbindAll();
        this.heatMapLayer = null;
      }
    );
    ifNotNilThanValue(
      this.map,
      (map) => {
        map.unbindAll();
        this.map = null;
      }
    );
  }

  /**
   * @stable [23.01.2020]
   * @returns {boolean}
   */
  private get haveMenuOptions(): boolean {
    return ObjectUtils.isObjectNotEmpty(this.props.menuOptions);
  }

  /**
   * @stable [04.03.2019]
   * @returns {IGoogleMapsSettingsEntity}
   */
  private get mapsSettings(): IGoogleMapsSettingsEntity {
    return this.settings.googleMaps;
  }

  /**
   * @stable [10.01.2020]
   * @returns {IMenu}
   */
  private get menu(): IMenu {
    return this.menuRef.current;
  }
}
